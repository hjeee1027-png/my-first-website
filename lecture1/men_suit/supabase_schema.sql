-- =====================================================
-- ZIOZIA men_suit 프로젝트 Supabase 스키마
-- 기존 Supabase 프로젝트와 공유 가능 (ms_ 접두어로 구별)
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. ms_users 테이블 (Supabase Auth 연동)
CREATE TABLE IF NOT EXISTS public.ms_users (
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

-- 2. ms_products 테이블
CREATE TABLE IF NOT EXISTS public.ms_products (
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

-- 3. ms_wishlist 테이블
CREATE TABLE IF NOT EXISTS public.ms_wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.ms_users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.ms_products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 4. ms_carts 테이블
CREATE TABLE IF NOT EXISTS public.ms_carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.ms_users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.ms_products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  selected_options JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ms_orders 테이블
-- delivery_status: 0=결제완료, 1=상품준비중, 2=배송준비중, 3=배송중, 4=배송완료
CREATE TABLE IF NOT EXISTS public.ms_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.ms_users(id) ON DELETE SET NULL,
  total_price INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  delivery_status INTEGER DEFAULT 0 CHECK (delivery_status BETWEEN 0 AND 4),
  tracking_number TEXT,
  items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ms_user_logs 테이블 (알고리즘/통계용)
CREATE TABLE IF NOT EXISTS public.ms_user_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.ms_users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('click', 'view', 'search', 'add_cart', 'purchase')),
  target_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- RLS (Row Level Security) 설정
-- =====================================================

ALTER TABLE public.ms_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ms_wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ms_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ms_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ms_user_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ms_products ENABLE ROW LEVEL SECURITY;

-- ms_users: 본인만 읽기/쓰기
CREATE POLICY "ms_users_self_access" ON public.ms_users
  FOR ALL USING (auth.uid() = id);

-- ms_products: 누구나 읽기 가능
CREATE POLICY "ms_products_public_read" ON public.ms_products
  FOR SELECT USING (true);

-- ms_wishlist: 본인만 접근
CREATE POLICY "ms_wishlist_user_access" ON public.ms_wishlist
  FOR ALL USING (auth.uid() = user_id);

-- ms_carts: 본인만 접근
CREATE POLICY "ms_carts_user_access" ON public.ms_carts
  FOR ALL USING (auth.uid() = user_id);

-- ms_orders: 본인만 접근
CREATE POLICY "ms_orders_user_access" ON public.ms_orders
  FOR ALL USING (auth.uid() = user_id);

-- ms_user_logs: 본인만 접근
CREATE POLICY "ms_logs_user_access" ON public.ms_user_logs
  FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- 트리거: 찜하기 시 wish_count 자동 업데이트
-- =====================================================

CREATE OR REPLACE FUNCTION ms_update_wish_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.ms_products SET wish_count = wish_count + 1 WHERE id = NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.ms_products SET wish_count = GREATEST(0, wish_count - 1) WHERE id = OLD.product_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ms_trg_wish_count ON public.ms_wishlist;
CREATE TRIGGER ms_trg_wish_count
  AFTER INSERT OR DELETE ON public.ms_wishlist
  FOR EACH ROW EXECUTE FUNCTION ms_update_wish_count();

-- =====================================================
-- 샘플 데이터 (ms_products)
-- =====================================================

INSERT INTO public.ms_products (name, price, original_price, category, discount, is_new, thumbnail_url, model_info)
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
-- ms_inventory 테이블 (재고 관리)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.ms_inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER REFERENCES public.ms_products(id) ON DELETE CASCADE,
  color TEXT NOT NULL,
  size TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, color, size)
);

ALTER TABLE public.ms_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ms_inventory_public_read" ON public.ms_inventory
  FOR SELECT USING (true);

-- 원자적 재고 차감 함수
CREATE OR REPLACE FUNCTION ms_decrease_inventory(
  p_product_id INTEGER,
  p_color TEXT,
  p_size TEXT
) RETURNS INTEGER AS $$
DECLARE
  affected INTEGER;
BEGIN
  UPDATE public.ms_inventory
  SET stock = stock - 1, updated_at = NOW()
  WHERE product_id = p_product_id
    AND color = p_color
    AND size = p_size
    AND stock > 0;

  GET DIAGNOSTICS affected = ROW_COUNT;
  RETURN affected; -- 0이면 재고 없음, 1이면 성공
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 샘플 재고 데이터 (상품 ID 1~8 기준)
INSERT INTO public.ms_inventory (product_id, color, size, stock)
SELECT
  p.id,
  c.color,
  s.size,
  floor(random() * 15 + 1)::INTEGER
FROM ms_products p
CROSS JOIN (VALUES ('블랙'),('네이비'),('그레이'),('베이지'),('카멜')) AS c(color)
CROSS JOIN (VALUES ('M'),('L'),('XL'),('XXL')) AS s(size)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 완료! GitHub Secrets에 아래 값을 등록하세요:
-- 기존 VITE_SUPABASE_URL 시크릿 재활용 가능 (동일 프로젝트 공유)
-- deploy.yml의 men_suit 빌드 스텝:
--   VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
--   VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
-- =====================================================
