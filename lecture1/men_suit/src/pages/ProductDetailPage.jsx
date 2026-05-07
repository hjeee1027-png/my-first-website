import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { allProducts, newArrivalProducts, productDetailImages } from '../data/products'
import { useApp } from '../App'
import styles from './ProductDetailPage.module.css'

const combined = [...new Map([...newArrivalProducts, ...allProducts].map(p => [p.id, p])).values()]

const colors = ['블랙', '네이비', '그레이', '베이지', '화이트']
const sizes = ['44', '46', '48', '50', '52', '54']

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWished, addRecentViewed, logEvent, showToast } = useApp()

  const product = combined.find(p => p.id === Number(id))
  const [selColor, setSelColor] = useState(colors[0])
  const [selSize, setSelSize] = useState('')
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)

  const images = [product?.img, ...(productDetailImages.default || [])].filter(Boolean)

  useEffect(() => {
    if (!product) return
    addRecentViewed(product)
    logEvent('view', product.id, { product_name: product.name })
  }, [id])

  const handleColorSelect = (color) => {
    setSelColor(color)
    logEvent('click', product.id, { selected_options: { color, size: selSize } })
  }

  const handleAddToCart = () => {
    if (!selSize) { showToast('사이즈를 선택해주세요.', 'error'); return }
    addToCart(product, { color: selColor, size: selSize, qty })
  }

  const handleBuy = () => {
    if (!selSize) { showToast('사이즈를 선택해주세요.', 'error'); return }
    addToCart(product, { color: selColor, size: selSize, qty })
    navigate('/cart')
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      showToast('링크가 복사되었습니다.')
    }).catch(() => {
      prompt('아래 링크를 복사하세요:', url)
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

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* 좌측 이미지 */}
          <div className={styles.imgSection}>
            <div className={styles.thumbList}>
              {images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} ${i+1}`} />
                </button>
              ))}
            </div>
            <div className={styles.mainImg}>
              <img src={images[activeImg]} alt={product.name} />
              {product.discount > 0 && (
                <span className={styles.saleBadge}>-{product.discount}%</span>
              )}
            </div>
          </div>

          {/* 우측 정보 */}
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
              </div>

              <div className={styles.modelInfo}>
                <i className="fa-solid fa-circle-info"></i>
                모델 착용: {product.model || '173cm / 76kg / 보통'}
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* 컬러 선택 */}
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>COLOR — <span className={styles.selectedVal}>{selColor}</span></p>
              <div className={styles.colorList}>
                {colors.map(c => (
                  <button
                    key={c}
                    className={`${styles.colorBtn} ${selColor === c ? styles.colorSelected : ''}`}
                    onClick={() => handleColorSelect(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 사이즈 선택 */}
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>SIZE {selSize && <span className={styles.selectedVal}>— {selSize}</span>}</p>
              <div className={styles.sizeList}>
                {sizes.map(s => (
                  <button
                    key={s}
                    className={`${styles.sizeBtn} ${selSize === s ? styles.sizeSelected : ''}`}
                    onClick={() => setSelSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 수량 */}
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>수량</p>
              <div className={styles.qtyWrap}>
                <button onClick={() => setQty(q => Math.max(1, q-1))} className={styles.qtyBtn}>−</button>
                <span className={styles.qtyNum}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} className={styles.qtyBtn}>+</button>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span>총 상품 금액</span>
              <span className={styles.totalPrice}>{totalPrice.toLocaleString()}원</span>
            </div>

            {/* 핏 가이드 버튼 */}
            <button className={styles.fitGuideBtn}>
              <i className="fa-solid fa-ruler"></i>
              나의 사이즈를 찾아보세요
            </button>

            <div className={styles.btnRow}>
              <button onClick={handleAddToCart} className={styles.cartBtn}>
                <i className="fa-solid fa-bag-shopping"></i>
                장바구니
              </button>
              <button onClick={handleBuy} className={styles.buyBtn}>구매하기</button>
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
      </div>
    </div>
  )
}
