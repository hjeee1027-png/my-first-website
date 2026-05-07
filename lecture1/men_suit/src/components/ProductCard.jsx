import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../App'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, showFitGuide = true }) {
  const { toggleWishlist, isWished, addToCart } = useApp()
  const [hovered, setHovered] = useState(false)
  const wished = isWished(product.id)

  const handleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleCartQuick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, { color: '블랙', size: 'M' })
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/products/${product.id}`} className={styles.imgWrap}>
        <img src={product.img} alt={product.name} className={styles.img} loading="lazy" />

        {hovered && showFitGuide && (
          <div className={styles.overlay}>
            <div className={styles.fitGuide}>
              <p className={styles.fitModel}>{product.model || '173cm / 76kg / 보통'}</p>
              <Link
                to={`/products/${product.id}`}
                className={styles.detailBtn}
                onClick={e => e.stopPropagation()}
              >
                자세히보기
              </Link>
            </div>
          </div>
        )}

        {product.isNew && <span className={styles.badgeNew}>NEW</span>}
        {product.discount > 0 && (
          <span className={styles.badgeSale}>-{product.discount}%</span>
        )}

        <button onClick={handleWish} className={`${styles.wishBtn} ${wished ? styles.wished : ''}`}>
          <i className={`${wished ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
        </button>
      </Link>

      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.priceRow}>
          {product.discount > 0 && (
            <span className={styles.discount}>{product.discount}%</span>
          )}
          <span className={styles.price}>{product.price.toLocaleString()}원</span>
          {product.originalPrice && (
            <span className={styles.original}>{product.originalPrice.toLocaleString()}원</span>
          )}
        </div>
        {product.wish_count > 0 && (
          <p className={styles.wishCount}>
            <i className="fa-solid fa-heart"></i> {product.wish_count}
          </p>
        )}
      </div>
    </div>
  )
}
