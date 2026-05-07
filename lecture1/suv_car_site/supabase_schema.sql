-- VANTAGE SUV 사이트 DB 스키마
-- Supabase SQL 에디터에서 실행하세요

-- 1. 사용자 프로필 테이블 (auth.users 연동)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  phone TEXT,
  address TEXT,
  address_detail TEXT,
  zip_code TEXT,
  billing_token TEXT,
  fav_cars TEXT[] DEFAULT '{}',
  marketing_agg BOOLEAN DEFAULT false,
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'inactive', 'banned')),
  last_login_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 차량 데이터 테이블
CREATE TABLE IF NOT EXISTS public.cars_data (
  id SERIAL PRIMARY KEY,
  car_id TEXT UNIQUE NOT NULL,
  model_name TEXT NOT NULL,
  model_name_ko TEXT,
  brand TEXT NOT NULL DEFAULT 'VANTAGE',
  year INT NOT NULL,
  fuel_type TEXT CHECK (fuel_type IN ('전기', '가솔린', '디젤', '하이브리드')),
  base_price BIGINT NOT NULL,
  discount_rate DECIMAL(4,3) DEFAULT 0,
  specs JSONB DEFAULT '{}',
  description TEXT,
  highlights TEXT[],
  badge TEXT,
  is_promotion BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  images TEXT[],
  color_options TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 차량 검색 뷰 테이블
CREATE TABLE IF NOT EXISTS public.cars_search (
  id SERIAL PRIMARY KEY,
  car_id TEXT REFERENCES cars_data(car_id),
  model_name TEXT NOT NULL,
  model_name_ko TEXT,
  model_year INT,
  fuel_type TEXT,
  base_price BIGINT,
  discount_rate DECIMAL(4,3) DEFAULT 0,
  is_promotion BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  color_options TEXT[],
  efficiency DECIMAL(5,2),
  badge TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 시승 예약 테이블
CREATE TABLE IF NOT EXISTS public.reservations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  car_id TEXT REFERENCES cars_data(car_id),
  branch_name TEXT NOT NULL,
  res_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT '상담신청' CHECK (status IN ('상담신청', '계약완료', '인도대기', '완료')),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  color_option TEXT,
  wheel_option TEXT,
  message TEXT,
  type TEXT DEFAULT 'reservation' CHECK (type IN ('reservation', 'quote')),
  down_payment BOOLEAN DEFAULT false,
  delivery_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 전시장 테이블
CREATE TABLE IF NOT EXISTS public.showrooms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  hours TEXT,
  parking BOOLEAN DEFAULT true,
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  available_models TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 이벤트 테이블
CREATE TABLE IF NOT EXISTS public.events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  badge TEXT,
  participants INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 사용자 행동 통계 테이블
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  car_id TEXT,
  action TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. 비밀번호 변경 이력
CREATE TABLE IF NOT EXISTS public.password_history (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars_search ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 프로필 정책: 본인만 조회/수정 가능
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 예약 정책: 본인 예약만 조회 가능, 누구나 생성 가능
DROP POLICY IF EXISTS "Users can view own reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anyone can create reservation" ON public.reservations;
CREATE POLICY "Users can view own reservations" ON public.reservations FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can create reservation" ON public.reservations FOR INSERT WITH CHECK (true);

-- 차량 정책: 누구나 조회 가능
DROP POLICY IF EXISTS "Anyone can view cars" ON public.cars_data;
DROP POLICY IF EXISTS "Anyone can view cars_search" ON public.cars_search;
DROP POLICY IF EXISTS "Anyone can view showrooms" ON public.showrooms;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;
CREATE POLICY "Anyone can view cars" ON public.cars_data FOR SELECT USING (true);
CREATE POLICY "Anyone can view cars_search" ON public.cars_search FOR SELECT USING (true);
CREATE POLICY "Anyone can view showrooms" ON public.showrooms FOR SELECT USING (true);
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);

-- 트리거: 회원가입 시 프로필 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 트리거: 로그인 시 last_login_at 업데이트
CREATE OR REPLACE FUNCTION public.handle_user_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles SET last_login_at = NOW() WHERE user_id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 샘플 데이터 삽입
INSERT INTO public.cars_data (car_id, model_name, model_name_ko, brand, year, fuel_type, base_price, discount_rate, specs, description, badge, is_promotion, thumbnail_url, color_options) VALUES
('VTG-2025-001', 'VANTAGE Pinnacle VII', '반티지 피나클 VII', 'VANTAGE', 2025, '하이브리드', 235000000, 0.03, '{"efficiency": "12.5km/L", "max_power": "320kW", "seats": 7}', '궁극의 럭셔리. 3.0L V6 하이브리드', '베스트셀러', false, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', ARRAY['abyss_black', 'serenity_white', 'desert_gold', 'titanium_silver']),
('VTG-2025-002', 'VANTAGE Summit V', '반티지 서밋 V', 'VANTAGE', 2025, '디젤', 178000000, 0.05, '{"efficiency": "14.2km/L", "max_power": "250kW", "seats": 7}', '힘과 우아함의 정점. 3.0L 트윈터보 디젤', '이달의 특가', true, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800', ARRAY['abyss_black', 'serenity_white', 'pacific_blue', 'titanium_silver']),
('VTG-2025-003', 'VANTAGE Apex S', '반티지 에이펙스 S', 'VANTAGE', 2024, '가솔린', 135000000, 0.07, '{"efficiency": "9.8km/L", "max_power": "200kW", "seats": 5}', '세련된 입문의 시작. 2.0L 터보', '신규 출시', true, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['serenity_white', 'graphite_grey', 'abyss_black', 'desert_gold']),
('VTG-2025-004', 'VANTAGE Crest EV', '반티지 크레스트 EV', 'VANTAGE', 2025, '전기', 98000000, 0.10, '{"efficiency": "6.2km/kWh", "max_power": "239kW", "range": 530}', '미래를 향한 첫 걸음. 530km 주행거리', null, false, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800', ARRAY['abyss_black', 'serenity_white', 'pacific_blue', 'graphite_grey'])
ON CONFLICT (car_id) DO NOTHING;

INSERT INTO public.cars_search (car_id, model_name, model_name_ko, model_year, fuel_type, base_price, discount_rate, is_promotion, thumbnail_url, color_options, efficiency, badge) VALUES
('VTG-2025-001', 'VANTAGE Pinnacle VII', '반티지 피나클 VII', 2025, '하이브리드', 235000000, 0.03, false, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', ARRAY['abyss_black', 'serenity_white', 'desert_gold', 'titanium_silver'], 12.5, '베스트셀러'),
('VTG-2025-002', 'VANTAGE Summit V', '반티지 서밋 V', 2025, '디젤', 178000000, 0.05, true, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800', ARRAY['abyss_black', 'serenity_white', 'pacific_blue', 'titanium_silver'], 14.2, '이달의 특가'),
('VTG-2025-003', 'VANTAGE Apex S', '반티지 에이펙스 S', 2024, '가솔린', 135000000, 0.07, true, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['serenity_white', 'graphite_grey', 'abyss_black', 'desert_gold'], 9.8, '신규 출시'),
('VTG-2025-004', 'VANTAGE Crest EV', '반티지 크레스트 EV', 2025, '전기', 98000000, 0.10, false, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800', ARRAY['abyss_black', 'serenity_white', 'pacific_blue', 'graphite_grey'], 6.2, null)
ON CONFLICT DO NOTHING;

INSERT INTO public.showrooms (name, city, address, phone, hours, parking, lat, lng) VALUES
('서울 강남 전시장', '서울', '서울특별시 강남구 테헤란로 123', '02-1234-5678', '평일 10:00-19:00 / 주말 10:00-18:00', true, 37.501300, 127.039600),
('서울 청담 전시장', '서울', '서울특별시 강남구 도산대로 45', '02-2345-6789', '평일 10:00-19:00 / 주말 10:00-18:00', true, 37.524500, 127.043300),
('부산 해운대 전시장', '부산', '부산광역시 해운대구 센텀서로 30', '051-3456-7890', '평일 10:00-19:00 / 주말 10:00-18:00', true, 35.179600, 129.075600),
('대구 수성 전시장', '대구', '대구광역시 수성구 달구벌대로 2477', '053-4567-8901', '평일 10:00-19:00 / 주말 10:00-18:00', true, 35.837400, 128.633800),
('인천 송도 전시장', '인천', '인천광역시 연수구 컨벤시아대로 165', '032-5678-9012', '평일 10:00-19:00 / 주말 10:00-18:00', true, 37.389000, 126.640300),
('광주 상무 전시장', '광주', '광주광역시 서구 상무대로 887', '062-6789-0123', '평일 10:00-19:00 / 주말 10:00-18:00', false, 35.153600, 126.852600)
ON CONFLICT DO NOTHING;

INSERT INTO public.events (title, subtitle, description, image, start_date, end_date, is_active, badge) VALUES
('2025 상반기 특별 프로모션', '최대 10% 할인 + 무이자 할부 36개월', '반티지 전 모델 대상 특별 프로모션. 시승 예약 후 계약 시 추가 혜택 제공.', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', '2025-01-01', '2025-06-30', true, '진행중'),
('VANTAGE 크레스트 EV 출시 기념', '전기차 보조금 지원 + 충전기 무상 설치', '크레스트 EV 출시 기념 전국고 보조금 전액 지원 및 홈 충전기 무상 설치 서비스.', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800', '2025-03-01', '2025-12-31', true, '신규')
ON CONFLICT DO NOTHING;
