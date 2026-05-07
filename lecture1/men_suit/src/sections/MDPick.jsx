import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../App'
import styles from './MDPick.module.css'

const mdPickSlides = [
  {
    mainImg: '/my-first-website/men_suit/images/mdpick/mainBN_26SS_stco_setup3_PC.jpeg',
    headText1: '부드럽게 닿는 감촉',
    headText1Size: '24px',
    headText2: '체형 맞춤형 정장 30% 쿠폰',
    headText2Size: '18px',
    items: [
      { id: 101, name: '비스코스 스트라이프 수트', price: 359000, originalPrice: 469000, discount: 23, desc: '슬림핏 / 울 혼방', img: '/my-first-website/men_suit/images/mdpick/NTSXB04RSI_m0.jpeg', wish_count: 142 },
      { id: 102, name: '스트레치 슬림 팬츠', price: 89000, originalPrice: 119000, discount: 25, desc: '4방향 스트레치', img: '/my-first-website/men_suit/images/mdpick/SDSXA61OCI_m0.jpeg', wish_count: 87 },
      { id: 103, name: '울혼방 오버핏 재킷', price: 249000, originalPrice: 329000, discount: 24, desc: '오버핏 / 싱글 버튼', img: '/my-first-website/men_suit/images/mdpick/DDSXB63ETI_m0.jpeg', wish_count: 203 },
    ]
  },
  {
    mainImg: '/my-first-website/men_suit/images/mdpick/260203_main_big_shirts_w.jpeg',
    headText1: '셔츠로 완성하는 품격',
    headText1Size: '24px',
    headText2: '신상 셔츠 전품목 15% 할인',
    headText2Size: '18px',
    items: [
      { id: 104, name: '옥스포드 드레스 셔츠', price: 69000, originalPrice: 89000, discount: 22, desc: '레귤러핏 / 코튼 100%', img: '/my-first-website/men_suit/images/mdpick/26SS_main_BN_PC_16.jpeg', wish_count: 56 },
      { id: 105, name: '리넨 체크 셔츠', price: 79000, originalPrice: null, discount: 0, desc: '오버핏 / 린넨 혼방', img: '/my-first-website/men_suit/images/mdpick/SEJVB31NSN_m0.jpeg', wish_count: 34 },
      { id: 106, name: '니트 터틀넥 셔츠', price: 109000, originalPrice: 149000, discount: 27, desc: '슬림핏 / 울 혼방', img: '/my-first-website/men_suit/images/mdpick/SEJWB05NSN_m0.jpeg', wish_count: 91 },
    ]
  },
  {
    mainImg: '/my-first-website/men_suit/images/mdpick/260420_main_big_w.jpeg',
    headText1: '여유로운 일상의 한 벌',
    headText1Size: '24px',
    headText2: '캐주얼 컬렉션 무료 배송',
    headText2Size: '18px',
    items: [
      { id: 107, name: '워시드 치노 팬츠', price: 89000, originalPrice: 119000, discount: 25, desc: '레귤러핏 / 면 100%', img: '/my-first-website/men_suit/images/mdpick/STCO_26SS_MINT_568750.jpeg', wish_count: 178 },
      { id: 108, name: '코튼 오버핏 재킷', price: 189000, originalPrice: null, discount: 0, desc: '오버핏 / 코튼 혼방', img: '/my-first-website/men_suit/images/mdpick/260427_main_big_dm_w.jpeg', wish_count: 95 },
      { id: 109, name: '민트 셋업 팬츠', price: 79000, originalPrice: 99000, discount: 20, desc: '슬림핏 / 린넨 혼방', img: '/my-first-website/men_suit/images/mdpick/260424_main_big_knit_w.jpeg', wish_count: 62 },
    ]
  },
]

function MDPickItem({ item }) {
  const { toggleWishlist, isWished, addToCart } = useApp()
  const [wishCount, setWishCount] = useState(item.wish_count || 0)
  const wished = isWished(item.id)

  const handleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (wished) {
      setWishCount(prev => prev - 1)
    } else {
      setWishCount(prev => prev + 1)
    }
    toggleWishlist(item)
  }

  const handleCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(item, { color: '블랙', size: 'M' })
  }

  return (
    <div className={styles.itemCard}>
      <Link to={`/products/${item.id}`} className={styles.itemImgWrap}>
        <img src={item.img} alt={item.name} className={styles.itemImg} />
      </Link>
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{item.name}</p>
        <p className={styles.itemDesc}>{item.desc}</p>
        <div className={styles.itemPriceRow}>
          {item.discount > 0 && (
            <span className={styles.itemDiscount}>{item.discount}%</span>
          )}
          <span className={styles.itemPrice}>{item.price.toLocaleString()}원</span>
          {item.originalPrice && (
            <span className={styles.itemOriginal}>{item.originalPrice.toLocaleString()}원</span>
          )}
        </div>
        <div className={styles.itemActions}>
          <button
            onClick={handleWish}
            className={`${styles.actionBtn} ${wished ? styles.wished : ''}`}
          >
            <i className={`${wished ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
          </button>
          <span className={styles.wishCountText}>{wishCount}</span>
          <button onClick={handleCart} className={styles.cartBtn}>
            <i className="fa-solid fa-bag-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MDPick() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const total = mdPickSlides.length

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + total) % total)
  }

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % total)
  }

  const slide = mdPickSlides[currentSlide]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* 좌측 큰 이미지 */}
          <div className={styles.mainImgWrap}>
            <img src={slide.mainImg} alt="MD PICK 메인" className={styles.mainImg} />
          </div>

          {/* 우측 헤드텍스트 + 상품 3개 */}
          <div className={styles.right}>
            <div className={styles.headTextBlock}>
              <p className={styles.headText1} style={{ fontSize: slide.headText1Size }}>{slide.headText1}</p>
              <p className={styles.headText2} style={{ fontSize: slide.headText2Size }}>{slide.headText2}</p>
            </div>

            <div className={styles.itemList}>
              {slide.items.map(item => (
                <MDPickItem key={`${currentSlide}-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* 하단 슬라이드 컨트롤 */}
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={handlePrev}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className={styles.pageNum}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button className={styles.arrowBtn} onClick={handleNext}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}
