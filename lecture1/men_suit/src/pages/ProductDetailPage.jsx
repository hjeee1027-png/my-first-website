import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { allProducts, newArrivalProducts } from '../data/products'
import { useApp } from '../App'
import { supabase } from '../supabaseClient'
import SizeGuideModal from '../components/SizeGuideModal'
import styles from './ProductDetailPage.module.css'

const BASE = '/my-first-website/men_suit/images'

const combined = [...new Map([...newArrivalProducts, ...allProducts].map(p => [p.id, p])).values()]

const detailImages = [
  `${BASE}/detail/2M2601292025401_1.jpeg`,
  `${BASE}/detail/2M2601292025401_2.jpeg`,
  `${BASE}/detail/2M2601292025401_4.jpeg`,
  `${BASE}/detail/2M2601292025401_5.jpeg`,
  `${BASE}/detail/2M2601292025401_6.jpeg`,
]

const colorOptions = [
  { name: '블랙', hex: '#111111' },
  { name: '네이비', hex: '#1a2a4a' },
  { name: '그레이', hex: '#888888' },
  { name: '베이지', hex: '#c8b49a' },
  { name: '카멜', hex: '#c07941' },
]

const sizeOptions = [
  { label: 'M', desc: '95' },
  { label: 'L', desc: '100' },
  { label: 'XL', desc: '105' },
  { label: 'XXL', desc: '110' },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWished, addRecentViewed, logEvent, showToast, user } = useApp()

  const product = combined.find(p => p.id === Number(id))

  const [selColor, setSelColor] = useState(colorOptions[0].name)
  const [selSize, setSelSize] = useState('')
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [stockInfo, setStockInfo] = useState(null)
  const [detailExpanded, setDetailExpanded] = useState(false)

  useEffect(() => {
    if (!product) return
    addRecentViewed(product)
    logEvent('view', product.id, { product_name: product.name })
  }, [id])

  // 재고 조회
  useEffect(() => {
    if (!product || !selColor || !selSize) {
      setStockInfo(null)
      return
    }
    const checkStock = async () => {
      const { data } = await supabase
        .from('ms_inventory')
        .select('stock')
        .eq('product_id', product.id)
        .eq('color', selColor)
        .eq('size', selSize)
        .single()
      setStockInfo(data ?? null)
    }
    checkStock()
  }, [selColor, selSize, product])

  const handleColorSelect = (colorName) => {
    setSelColor(colorName)
    logEvent('click', product.id, { selected_options: { color: colorName, size: selSize } })
  }

  const handleAddToCart = () => {
    if (!selSize) { showToast('사이즈를 선택해주세요.', 'error'); return }
    if (stockInfo && stockInfo.stock === 0) { showToast('품절된 상품입니다.', 'error'); return }
    addToCart(product, { color: selColor, size: selSize, qty })
  }

  const handleBuy = async () => {
    if (!selSize) { showToast('사이즈를 선택해주세요.', 'error'); return }
    if (stockInfo && stockInfo.stock === 0) { showToast('품절된 상품입니다.', 'error'); return }

    // 결제 전 재고 재확인 및 원자적 차감
    const result = await supabase.rpc('ms_decrease_inventory', {
      p_product_id: product.id,
      p_color: selColor,
      p_size: selSize
    })

    if (result.data === 0) {
      showToast('재고가 소진되었습니다.', 'error')
      setStockInfo({ stock: 0 })
      return
    }

    addToCart(product, { color: selColor, size: selSize, qty })
    navigate('/cart')
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      showToast('링크가 복사되었습니다.')
    }).catch(() => {
      window.prompt('아래 링크를 복사하세요:', url)
    })
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>상품을 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>뒤로가기</button>
      </div>
    )
  }

  const finalPrice = product.price
  const totalPrice = finalPrice * qty
  const isSoldOut = stockInfo && stockInfo.stock === 0
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || '고객'

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* 좌측 이미지 섹션 */}
          <div className={styles.imgSection}>
            <div className={styles.thumbList}>
              {detailImages.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className={styles.mainImg}>
              <img src={detailImages[activeImg]} alt={product.name} />
              {product.discount > 0 && (
                <span className={styles.saleBadge}>-{product.discount}%</span>
              )}
            </div>
          </div>

          {/* 우측 정보 섹션 */}
          <div className={styles.infoSection}>
            <div className={styles.infoTop}>
              <div className={styles.titleRow}>
                <h1 className={styles.name}>{product.name}</h1>
                <div className={styles.actions}>
                  <button onClick={handleShare} className={styles.actionIcon} title="공유하기">
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`${styles.actionIcon} ${isWished(product.id) ? styles.wished : ''}`}
                    title="찜하기"
                  >
                    <i className={`${isWished(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                  </button>
                </div>
              </div>

              <div className={styles.priceWrap}>
                {product.discount > 0 && (
                  <span className={styles.discountBadge}>{product.discount}%</span>
                )}
                <span className={styles.price}>{product.price.toLocaleString()}원</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>{product.originalPrice.toLocaleString()}원</span>
                )}
                {isSoldOut && <span className={styles.soldOut}>품절</span>}
              </div>

              <div className={styles.modelInfo}>
                <i className="fa-solid fa-circle-info"></i>
                모델 착용: {product.model || '173cm / 76kg / 보통'}
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* 컬러 선택 - 원형 버튼 */}
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>COLOR — <span className={styles.selectedVal}>{selColor}</span></p>
              <div className={styles.colorList}>
                {colorOptions.map(c => (
                  <button
                    key={c.name}
                    className={`${styles.colorCircle} ${selColor === c.name ? styles.colorCircleSelected : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleColorSelect(c.name)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* 사이즈 선택 */}
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>SIZE {selSize && <span className={styles.selectedVal}>— {selSize}</span>}</p>
              <div className={styles.sizeList}>
                {sizeOptions.map(s => (
                  <button
                    key={s.label}
                    className={`${styles.sizeBtn} ${selSize === s.label ? styles.sizeSelected : ''}`}
                    onClick={() => setSelSize(s.label)}
                  >
                    {s.label}({s.desc})
                  </button>
                ))}
              </div>
            </div>

            {/* 수량 */}
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>수량</p>
              <div className={styles.qtyWrap}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className={styles.qtyBtn}>−</button>
                <span className={styles.qtyNum}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className={styles.qtyBtn}>+</button>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span>총 상품 금액</span>
              <span className={styles.totalPrice}>{totalPrice.toLocaleString()}원</span>
            </div>

            {/* 사이즈 가이드 버튼 */}
            <button className={styles.fitGuideBtn} onClick={() => setShowSizeGuide(true)}>
              <i className="fa-solid fa-ruler"></i>
              {userName}님의 사이즈를 찾아보세요
            </button>

            <div className={styles.btnRow}>
              <button onClick={handleAddToCart} className={styles.cartBtn} disabled={isSoldOut}>
                <i className="fa-solid fa-bag-shopping"></i>
                장바구니
              </button>
              <button onClick={handleBuy} className={styles.buyBtn} disabled={isSoldOut}>
                {isSoldOut ? '품절' : '구매하기'}
              </button>
            </div>

            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryItem}>
                <i className="fa-solid fa-truck-fast"></i>
                <span>오늘 주문 시 <strong>내일 도착</strong> (오후 2시 이전 주문)</span>
              </div>
              <div className={styles.deliveryItem}>
                <i className="fa-solid fa-rotate-left"></i>
                <span>무료 반품/교환 (수령 후 7일 이내)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 상세정보 더보기 - 이미지 섹션 아래 */}
        <div className={styles.detailSection}>
          <div
            className={`${styles.detailImgWrap} ${detailExpanded ? styles.detailExpanded : ''}`}
          >
            <img
              src={`${BASE}/detail/상세페이지 상품정보 더보기.jpeg`}
              alt="상품 상세정보"
              className={styles.detailImg}
            />
            {!detailExpanded && <div className={styles.detailFade}></div>}
          </div>
          {!detailExpanded && (
            <button className={styles.detailMoreBtn} onClick={() => setDetailExpanded(true)}>
              상품정보 더보기
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          )}
        </div>
      </div>

      {showSizeGuide && (
        <SizeGuideModal onClose={() => setShowSizeGuide(false)} user={user} />
      )}
    </div>
  )
}
