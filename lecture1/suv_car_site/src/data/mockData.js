const B = import.meta.env.BASE_URL

export const BRAND_COLORS = {
  primary: '#0c121c',
  background: '#0B0B0B',
  white: '#FFFFFF',
  gold: '#A68966',
  textSecondary: '#4A4A4A',
  hover: '#E1E1E1',
  footer: '#222222',
  cardBg: '#1a1f2e',
}

export const CAR_COLORS = [
  { id: 'abyss_black', name: 'Abyss Black', hex: '#0c121c', nameKo: '어비스 블랙' },
  { id: 'serenity_white', name: 'Serenity White', hex: '#F5F5F5', nameKo: '세레니티 화이트' },
  { id: 'desert_gold', name: 'Desert Gold', hex: '#A68966', nameKo: '데저트 골드' },
  { id: 'titanium_silver', name: 'Titanium Silver', hex: '#8A8A8A', nameKo: '티타늄 실버' },
  { id: 'pacific_blue', name: 'Pacific Blue', hex: '#1a3a5c', nameKo: '퍼시픽 블루' },
  { id: 'graphite_grey', name: 'Graphite Grey', hex: '#3D3D3D', nameKo: '그래파이트 그레이' },
]

export const WHEEL_OPTIONS = [
  { id: 'w23_lux', name: '23" Lux Diamond', desc: '23인치 럭스 다이아몬드', price: 4500000 },
  { id: 'w22_sport', name: '22" Sport Edge', desc: '22인치 스포츠 엣지', price: 3000000 },
  { id: 'w21_classic', name: '21" Classic Alloy', desc: '21인치 클래식 알로이', price: 1800000 },
  { id: 'w21_aero', name: '21" Aero Fin', desc: '21인치 에어로 핀', price: 2200000 },
]

export const CARS = [
  {
    id: 1,
    car_id: 'VTG-2025-001',
    model_name: 'VANTAGE Pinnacle VII',
    model_name_ko: '반티지 피나클 VII',
    brand: 'VANTAGE',
    year: 2025,
    fuel_type: '하이브리드',
    base_price: 235000000,
    discount_rate: 0.03,
    is_promotion: false,
    efficiency: 12.5,
    max_power: '320kW',
    thumbnail_url: `${B}img/car1_thumb.jpeg`,
    images: [
      `${B}img/car1_1.jpeg`,
      `${B}img/car1_2.jpeg`,
      `${B}img/car1_3.jpeg`,
      `${B}img/car1_4.jpeg`,
    ],
    color_options: ['abyss_black', 'serenity_white', 'desert_gold', 'titanium_silver'],
    description: '궁극의 럭셔리. 피나클 VII은 경계를 허무는 존재입니다. 3.0L V6 하이브리드 파워트레인과 에어 서스펜션의 조화로 어떤 지형에서도 완벽한 주행을 실현합니다.',
    highlights: ['최첨단 AI 자율주행 Level 3', '23인치 다이아몬드 컷 알로이 휠', '파노라믹 선루프', '7인승 풀 가죽 시트', '에어 서스펜션'],
    badge: '베스트셀러',
  },
  {
    id: 2,
    car_id: 'VTG-2025-002',
    model_name: 'VANTAGE Summit V',
    model_name_ko: '반티지 서밋 V',
    brand: 'VANTAGE',
    year: 2025,
    fuel_type: '디젤',
    base_price: 178000000,
    discount_rate: 0.05,
    is_promotion: true,
    efficiency: 14.2,
    max_power: '250kW',
    thumbnail_url: `${B}img/car2_thumb.webp`,
    images: [
      `${B}img/car2_1.webp`,
      `${B}img/car2_2.webp`,
      `${B}img/car2_3.webp`,
      `${B}img/car2_4.webp`,
    ],
    color_options: ['abyss_black', 'serenity_white', 'pacific_blue', 'titanium_silver'],
    description: '힘과 우아함의 정점. 서밋 V는 3.0L 트윈터보 디젤로 압도적인 토크와 경제적인 연비를 동시에 제공합니다. 성공한 드라이버를 위한 선택.',
    highlights: ['3.0L 트윈터보 디젤', 'AI 어댑티브 크루즈 컨트롤', '22인치 스포츠 휠', '3존 독립 공조', '헤드업 디스플레이'],
    badge: '이달의 특가',
  },
  {
    id: 3,
    car_id: 'VTG-2025-003',
    model_name: 'VANTAGE Apex S',
    model_name_ko: '반티지 에이펙스 S',
    brand: 'VANTAGE',
    year: 2024,
    fuel_type: '가솔린',
    base_price: 135000000,
    discount_rate: 0.07,
    is_promotion: true,
    efficiency: 9.8,
    max_power: '200kW',
    thumbnail_url: `${B}img/car3_thumb.jpeg`,
    images: [
      `${B}img/car3_1.webp`,
      `${B}img/car3_2.webp`,
      `${B}img/car3_3.webp`,
      `${B}img/car3_4.jpeg`,
    ],
    color_options: ['serenity_white', 'graphite_grey', 'abyss_black', 'desert_gold'],
    description: '세련된 입문의 시작. 에이펙스 S는 2.0L 터보 가솔린으로 도심 주행의 경쾌함과 주말 여행의 여유를 모두 담았습니다.',
    highlights: ['2.0L 터보 가솔린', '스마트 주차 어시스트', '21인치 알로이 휠', 'BOSE 사운드 시스템', '원터치 폴딩 3열'],
    badge: '신규 출시',
  },
  {
    id: 4,
    car_id: 'VTG-2025-004',
    model_name: 'VANTAGE Crest EV',
    model_name_ko: '반티지 크레스트 EV',
    brand: 'VANTAGE',
    year: 2025,
    fuel_type: '전기',
    base_price: 98000000,
    discount_rate: 0.10,
    is_promotion: false,
    efficiency: 6.2,
    max_power: '239kW',
    thumbnail_url: `${B}img/car4_thumb.webp`,
    images: [
      `${B}img/car4_1.webp`,
      `${B}img/car4_2.webp`,
      `${B}img/car4_3.jpeg`,
      `${B}img/car4_4.jpeg`,
    ],
    color_options: ['abyss_black', 'serenity_white', 'pacific_blue', 'graphite_grey'],
    description: '미래를 향한 첫 걸음. 크레스트 EV는 500km 이상의 주행거리와 초고속 충전으로 전기차의 불안을 완전히 해소합니다.',
    highlights: ['1회 충전 530km', '초고속 충전 (80% 22분)', 'OTA 무선 업데이트', '21인치 에어로 휠', 'V2L 외부 충전'],
    badge: null,
  },
]

export const SHOWROOMS = [
  { id: 1, name: '서울 강남 전시장', city: '서울', address: '서울특별시 강남구 테헤란로 123', phone: '02-1234-5678', hours: '평일 10:00-19:00 / 주말 10:00-18:00', parking: true, lat: 37.5013, lng: 127.0396 },
  { id: 2, name: '서울 청담 전시장', city: '서울', address: '서울특별시 강남구 도산대로 45', phone: '02-2345-6789', hours: '평일 10:00-19:00 / 주말 10:00-18:00', parking: true, lat: 37.5245, lng: 127.0433 },
  { id: 3, name: '부산 해운대 전시장', city: '부산', address: '부산광역시 해운대구 센텀서로 30', phone: '051-3456-7890', hours: '평일 10:00-19:00 / 주말 10:00-18:00', parking: true, lat: 35.1796, lng: 129.0756 },
  { id: 4, name: '대구 수성 전시장', city: '대구', address: '대구광역시 수성구 달구벌대로 2477', phone: '053-4567-8901', hours: '평일 10:00-19:00 / 주말 10:00-18:00', parking: true, lat: 35.8374, lng: 128.6338 },
  { id: 5, name: '인천 송도 전시장', city: '인천', address: '인천광역시 연수구 컨벤시아대로 165', phone: '032-5678-9012', hours: '평일 10:00-19:00 / 주말 10:00-18:00', parking: true, lat: 37.3890, lng: 126.6403 },
  { id: 6, name: '광주 상무 전시장', city: '광주', address: '광주광역시 서구 상무대로 887', phone: '062-6789-0123', hours: '평일 10:00-19:00 / 주말 10:00-18:00', parking: false, lat: 35.1536, lng: 126.8526 },
]

export const EVENTS = [
  { id: 1, title: '2025 상반기 특별 프로모션', subtitle: '최대 10% 할인 + 무이자 할부 36개월', description: '반티지 전 모델 대상 특별 프로모션. 시승 예약 후 계약 시 추가 혜택 제공.', image: `${B}img/car4_4.jpeg`, start_date: '2025-01-01', end_date: '2025-06-30', badge: '진행중' },
  { id: 2, title: 'VANTAGE 크레스트 EV 출시 기념', subtitle: '전기차 보조금 지원 + 충전기 무상 설치', description: '크레스트 EV 출시를 기념하여 국고 보조금 전액 지원 및 홈 충전기 무상 설치 서비스를 제공합니다.', image: `${B}img/story_road.webp`, start_date: '2025-03-01', end_date: '2025-12-31', badge: '신규' },
]

export const BRANCHES = [
  '서울 강남 지점', '서울 청담 지점', '부산 해운대 지점', '대구 수성 지점', '인천 송도 지점', '광주 상무 지점'
]

export const formatPrice = (price) => {
  if (price >= 100000000) {
    const eok = Math.floor(price / 100000000)
    const man = Math.floor((price % 100000000) / 10000)
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`
  }
  return `${(price / 10000).toLocaleString()}만원`
}

export const getDiscountedPrice = (price, rate) => Math.floor(price * (1 - rate))
