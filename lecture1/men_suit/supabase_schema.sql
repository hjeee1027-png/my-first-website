-- =====================================================
-- ZIOZIA men_suit 프로젝트 Supabase 스키마
-- pc_project 폴더 구별용 prefix: ms_ (men_suit)
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. users 테이블 (Supabase Auth 연동)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dormant')),
  last_login_at TIMESTAMPTZ DEFAULT NOW(),
  pwd_updated_at TIMESTAMPTZ DEFAULT NOW(),
  sns_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. products 테이블
CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  discount INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 100,
  wish_count INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  is_new BOOLEAN DEFAULT FALSE,
  model_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. wishlist 테이블
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 4. carts 테이블
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  selected_options JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. orders 테이블
-- delivery_status: 0=결제완료, 1=상품준비중, 2=배송준비중, 3=배송중, 4=배송완료
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  total_price INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  delivery_status INTEGER DEFAULT 0 CHECK (delivery_status BETWEEN 0 AND 4),
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. user_logs 테이블 (알고리즘/통계용)
CREATE TABLE IF NOT EXISTS public.user_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('click', 'view', 'search', 'add_cart', 'purchase')),
  target_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- RLS (Row Level Security) 설정
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- users: 본인만 읽기/쓰기
CREATE POLICY "users_self_access" ON public.users
  FOR ALL USING (auth.uid() = id);

-- products: 모든 인증 사용자 읽기 가능
CREATE POLICY "products_public_read" ON public.products
  FOR SELECT USING (true);

-- wishlist: 본인만 접근
CREATE POLICY "wishlist_user_access" ON public.wishlist
  FOR ALL USING (auth.uid() = user_id);

-- carts: 본인만 접근
CREATE POLICY "carts_user_access" ON public.carts
  FOR ALL USING (auth.uid() = user_id);

-- orders: 본인만 접근
CREATE POLICY "orders_user_access" ON public.orders
  FOR ALL USING (auth.uid() = user_id);

-- user_logs: 본인만 접근, insert는 authenticated
CREATE POLICY "logs_user_access" ON public.user_logs
  FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- 트리거: 찜하기 시 wish_count 자동 업데이트
-- =====================================================

CREATE OR REPLACE FUNCTION update_wish_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.products SET wish_count = wish_count + 1 WHERE id = NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.products SET wish_count = GREATEST(0, wish_count - 1) WHERE id = OLD.product_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_wish_count ON public.wishlist;
CREATE TRIGGER trg_wish_count
  AFTER INSERT OR DELETE ON public.wishlist
  FOR EACH ROW EXECUTE FUNCTION update_wish_count();

-- =====================================================
-- 트리거: 로그인 시 last_login_at 업데이트
-- =====================================================

CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users SET last_login_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 샘플 데이터 (products)
-- =====================================================

INSERT INTO public.products (name, price, original_price, category, discount, is_new, thumbnail_url, model_info)
VALUES
  ('스트라이프 셋업 수트', 189000, 269000, 'SUIT', 30, true, '/images/new-arrival/ABG2PP1101BK_M.jpeg', '173cm / 78kg / 슬림탄탄'),
  ('울 블렌드 슬랙스', 89000, 119000, 'PANTS', 25, true, '/images/new-arrival/ABG2PP1101CGR_M.jpeg', '173cm / 74kg / 보통'),
  ('리넨 오버핏 셔츠', 69000, NULL, 'SHIRT', 0, true, '/images/new-arrival/ABF2ET1101DGN_M.jpeg', '175cm / 72kg / 슬림'),
  ('코튼 니트 가디건', 119000, 159000, 'KNIT', 25, true, '/images/new-arrival/AEF2TT1101DNV_M.jpeg', '174cm / 76kg / 보통'),
  ('테크니컬 아우터 재킷', 249000, 329000, 'OUTER', 24, true, '/images/new-arrival/ABF2JJ1102DNV_M.jpeg', '176cm / 80kg / 탄탄'),
  ('투버튼 슬림 수트', 359000, 469000, 'SUIT', 23, true, '/images/new-arrival/ABG2PP1101DNV_M.jpeg', '175cm / 76kg / 슬림탄탄'),
  ('코튼 옥스포드 셔츠', 59000, 79000, 'SHIRT', 25, true, '/images/new-arrival/ABF2ET1104GR_M.jpeg', '173cm / 72kg / 슬림'),
  ('더블 브레스티드 블레이저', 289000, 389000, 'SUIT', 26, false, '/images/new-arrival/AEG2PP1101BE_M.jpeg', '176cm / 80kg / 탄탄')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 완료! GitHub Secrets에 아래 값을 등록하세요:
-- VITE_MS_SUPABASE_URL = [Project URL]
-- VITE_MS_SUPABASE_ANON_KEY = [anon public key]
-- =====================================================
