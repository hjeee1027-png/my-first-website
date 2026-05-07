const BASE = '/my-first-website/men_suit/images'

export const categories = ['SUIT', 'SHIRT', 'KNIT', 'PANTS', 'OUTER', 'ACC', 'SALE']

export const categoryIcons = [
  { id: 'SUIT', label: 'SUIT', img: `${BASE}/category/01c313d1-29a8-4cf9-9d18-b681f47bfbc3.jpeg` },
  { id: 'SHIRT', label: 'SHIRT', img: `${BASE}/category/28489da4-7387-4914-bd00-c005dec91817.jpeg` },
  { id: 'KNIT', label: 'KNIT', img: `${BASE}/category/7488ac71-b33c-4697-98ab-0a2b81c3f7ff.jpeg` },
  { id: 'PANTS', label: 'PANTS', img: `${BASE}/category/7c5f53e9-b462-460e-ba28-ce83d5bb56aa.jpeg` },
  { id: 'OUTER', label: 'OUTER', img: `${BASE}/category/81ce3cb9-ad6d-4af2-ba0e-dc152b4130e0.jpeg` },
  { id: 'ACC', label: 'ACC', img: `${BASE}/category/8d575d93-f64d-437a-8c1c-797163444c9e.jpeg` },
  { id: 'SALE', label: 'SALE', img: `${BASE}/category/a92d2a99-cefe-4a7f-b8f6-6aaf05c28e94.jpeg` },
]

export const bannerSlides = [
  {
    id: 1,
    img: `${BASE}/banner/881_2281_401_KOR_20260504160948.jpeg`,
    title: '26 S/S COLLECTION',
    sub: '절제된 실루엣, 미니멀한 품격',
  },
  {
    id: 2,
    img: `${BASE}/banner/881_2281_398_KOR_20260413130804.jpeg`,
    title: 'BUSINESS CASUAL',
    sub: 'TPO의 유연함을 입다',
  },
  {
    id: 3,
    img: `${BASE}/banner/881_2281_397_KOR_20260413101439.jpeg`,
    title: 'NEW ESSENTIALS',
    sub: '매일 입고 싶은 남자의 기본',
  },
  {
    id: 4,
    img: `${BASE}/banner/881_2281_396_KOR_20260330112925.jpeg`,
    title: 'STYLE YOUR DAY',
    sub: '당신의 하루를 완성하는 스타일',
  },
  {
    id: 5,
    img: `${BASE}/banner/881_2281_394_KOR_20260306093951.jpeg`,
    title: 'MINIMAL LOOKBOOK',
    sub: '감도 높은 라이프스타일을 제안합니다',
  },
]

export const newArrivalProducts = [
  { id: 1, name: '스트라이프 셋업 수트', price: 189000, originalPrice: 269000, category: 'SUIT', img: `${BASE}/new-arrival/ABG2PP1101BK_M.jpeg`, model: '173cm / 78kg / 슬림탄탄', isNew: true, discount: 30 },
  { id: 2, name: '울 블렌드 슬랙스', price: 89000, originalPrice: 119000, category: 'PANTS', img: `${BASE}/new-arrival/ABG2PP1101CGR_M.jpeg`, model: '173cm / 74kg / 보통', isNew: true, discount: 25 },
  { id: 3, name: '리넨 오버핏 셔츠', price: 69000, originalPrice: null, category: 'SHIRT', img: `${BASE}/new-arrival/ABF2ET1101DGN_M.jpeg`, model: '175cm / 72kg / 슬림', isNew: true, discount: 0 },
  { id: 4, name: '코튼 니트 가디건', price: 119000, originalPrice: 159000, category: 'KNIT', img: `${BASE}/new-arrival/AEF2TT1101DNV_M.jpeg`, model: '174cm / 76kg / 보통', isNew: true, discount: 25 },
  { id: 5, name: '테크니컬 아우터 재킷', price: 249000, originalPrice: 329000, category: 'OUTER', img: `${BASE}/new-arrival/ABF2JJ1102DNV_M.jpeg`, model: '176cm / 80kg / 탄탄', isNew: true, discount: 24 },
  { id: 6, name: '사파리 워시드 재킷', price: 219000, originalPrice: null, category: 'OUTER', img: `${BASE}/new-arrival/ABF2JJ1102LGR_M.jpeg`, model: '174cm / 74kg / 보통', isNew: true, discount: 0 },
  { id: 7, name: '투버튼 슬림 수트', price: 359000, originalPrice: 469000, category: 'SUIT', img: `${BASE}/new-arrival/ABG2PP1101DNV_M.jpeg`, model: '175cm / 76kg / 슬림탄탄', isNew: true, discount: 23 },
  { id: 8, name: '코튼 옥스포드 셔츠', price: 59000, originalPrice: 79000, category: 'SHIRT', img: `${BASE}/new-arrival/ABF2ET1104GR_M.jpeg`, model: '173cm / 72kg / 슬림', isNew: true, discount: 25 },
  { id: 9, name: '체크 울 슬랙스', price: 99000, originalPrice: 139000, category: 'PANTS', img: `${BASE}/new-arrival/ABG2PP1101LBE_M.jpeg`, model: '174cm / 76kg / 보통', isNew: false, discount: 29 },
  { id: 10, name: '메리노 울 터틀넥', price: 109000, originalPrice: null, category: 'KNIT', img: `${BASE}/new-arrival/AEF2TT1101LGR_M.jpeg`, model: '175cm / 78kg / 탄탄', isNew: false, discount: 0 },
  { id: 11, name: '와이드 핏 코튼 팬츠', price: 89000, originalPrice: 119000, category: 'PANTS', img: `${BASE}/new-arrival/AAF2KG1102BE_M.jpeg`, model: '175cm / 72kg / 보통', isNew: true, discount: 25 },
  { id: 12, name: '더블 브레스티드 블레이저', price: 289000, originalPrice: 389000, category: 'SUIT', img: `${BASE}/new-arrival/AEG2PP1101BE_M.jpeg`, model: '176cm / 80kg / 탄탄', isNew: false, discount: 26 },
]

export const lookbookImages = [
  `${BASE}/lookbook/1501_1213621_11_KOR_20260305111524.jpeg`,
  `${BASE}/lookbook/1501_1213621_12_KOR_20260305111554.jpeg`,
  `${BASE}/lookbook/1501_1213621_13_KOR_20260305111637.jpeg`,
  `${BASE}/lookbook/1501_1213621_14_KOR_20260305111658.jpeg`,
]

export const mdPickData = {
  mainImg: `${BASE}/grid/mainBN_26SS_stco_setup3_PC.jpeg`,
  title: "MD's PICK",
  sub: '이번 시즌 가장 주목받는 스타일링',
  items: [
    { id: 101, name: '비스코스 스트라이프 수트', price: 359000, img: `${BASE}/grid/NTSXB04RSI_m0.jpeg` },
    { id: 102, name: '스트레치 슬림 팬츠', price: 89000, img: `${BASE}/grid/SDSXA61OCI_m0.jpeg` },
    { id: 103, name: '울혼방 오버핏 재킷', price: 249000, img: `${BASE}/grid/DDSXB63ETI_m0.jpeg` },
  ]
}

export const tpoGridData = [
  {
    id: 'tpo1',
    persona: '페르소나 A — 사회초년생 준호',
    title: '면접을 위한 퍼펙트 수트',
    img: `${BASE}/grid/260403_main_big_0_w1.jpeg`,
    products: [
      { id: 201, name: '슬림핏 투버튼 수트', price: 359000, img: `${BASE}/new-arrival/ABG2PP1101DNV_M.jpeg` },
      { id: 202, name: '화이트 드레스 셔츠', price: 59000, img: `${BASE}/new-arrival/ABF2ET1104NV_M.jpeg` },
      { id: 203, name: '울 슬랙스', price: 89000, img: `${BASE}/new-arrival/ABG2PP1101BK_M.jpeg` },
    ]
  },
  {
    id: 'tpo2',
    persona: '페르소나 C — 패션 고관여 수호',
    title: '주말 데이트 미니멀 룩',
    img: `${BASE}/grid/260326_main_big_ss_w_2.jpeg`,
    products: [
      { id: 204, name: '오버핏 린넨 셋업', price: 219000, img: `${BASE}/new-arrival/ABF2JJ1102LGR_M.jpeg` },
      { id: 205, name: '코튼 니트 카라', price: 89000, img: `${BASE}/new-arrival/AEF2TT1101LGR_M.jpeg` },
      { id: 206, name: '와이드 치노 팬츠', price: 99000, img: `${BASE}/new-arrival/AAF2KG1102BE_M.jpeg` },
    ]
  },
  {
    id: 'tpo3',
    persona: '페르소나 B — 30대 직장인 민석',
    title: '30대 대리급 비즈니스 캐주얼',
    img: `${BASE}/grid/260420_main_big_w.jpeg`,
    products: [
      { id: 207, name: '스마트 캐주얼 재킷', price: 249000, img: `${BASE}/new-arrival/ABF2JJ1102DNV_M.jpeg` },
      { id: 208, name: '스트레치 드레스팬츠', price: 89000, img: `${BASE}/new-arrival/ABG2PP1101CGR_M.jpeg` },
      { id: 209, name: '뉴 베이직 니트', price: 109000, img: `${BASE}/new-arrival/AEF2TT1101DNV_M.jpeg` },
    ]
  }
]

export const allProducts = [
  ...newArrivalProducts,
  { id: 301, name: '클래식 싱글 수트', price: 399000, originalPrice: 499000, category: 'SUIT', img: `${BASE}/products/ABG2PP1101BE_M.jpeg`, model: '175cm / 78kg / 슬림탄탄', isNew: false, discount: 20 },
  { id: 302, name: '체크 수트 블레이저', price: 259000, originalPrice: null, category: 'SUIT', img: `${BASE}/products/ABG2PP1101BK_M.jpeg`, model: '174cm / 76kg / 보통', isNew: false, discount: 0 },
  { id: 303, name: '스트라이프 드레스 셔츠', price: 69000, originalPrice: 89000, category: 'SHIRT', img: `${BASE}/products/AAG2ET1101DGN_M.jpeg`, model: '173cm / 72kg / 슬림', isNew: false, discount: 22 },
  { id: 304, name: '코튼 터틀넥 니트', price: 99000, originalPrice: null, category: 'KNIT', img: `${BASE}/products/AAG2ET1101GR_M.jpeg`, model: '174cm / 74kg / 보통', isNew: false, discount: 0 },
  { id: 305, name: '워시드 치노 팬츠', price: 79000, originalPrice: 109000, category: 'PANTS', img: `${BASE}/products/AAG2TR1101BK_M.jpeg`, model: '175cm / 76kg / 보통', isNew: false, discount: 27 },
  { id: 306, name: '테크 블루종 재킷', price: 299000, originalPrice: 399000, category: 'OUTER', img: `${BASE}/products/AAG2TR1101GR_M.jpeg`, model: '176cm / 80kg / 탄탄', isNew: false, discount: 25 },
  { id: 307, name: '울 캐시미어 가디건', price: 159000, originalPrice: 209000, category: 'KNIT', img: `${BASE}/products/AAG2WC1201CGR_M.jpeg`, model: '174cm / 76kg / 보통', isNew: false, discount: 24 },
  { id: 308, name: '캐주얼 치노 쇼츠', price: 59000, originalPrice: null, category: 'PANTS', img: `${BASE}/products/AAG2WC1202BK_M.jpeg`, model: '173cm / 74kg / 보통', isNew: false, discount: 0 },
]

export const productDetailImages = {
  default: [
    `${BASE}/products/MOJAM25202GRY_LS1.jpeg`,
    `${BASE}/products/MOJAM25202GRY_LS2.jpeg`,
    `${BASE}/products/MOJAM25202GRY_LS3.jpeg`,
    `${BASE}/products/MOJAM25202GRY_LS4.jpeg`,
    `${BASE}/products/MOJAM25202GRY_LS5.jpeg`,
  ]
}

export const popularKeywords = ['수트', '슬랙스', '니트', '셔츠', '재킷', '코트', '캐주얼', '블레이저']
