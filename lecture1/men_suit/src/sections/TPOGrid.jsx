import React from 'react'
import { Link } from 'react-router-dom'
import { tpoGridData } from '../data/products'
import { useApp } from '../App'
import styles from './TPOGrid.module.css'

export default function TPOGrid() {
  const { addToCart } = useApp()

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sub}>TPO STYLING GUIDE</p>
          <h2 className={styles.title}>상황별 스타일링 추천</h2>
          <p className={styles.desc}>당신의 순간에 맞는 완벽한 코디를 제안합니다</p>
        </div>

        <div className={styles.grid}>
          {tpoGridData.map(col => (
            <div key={col.id} className={styles.col}>
              <div className={styles.mainImg}>
                <img src={col.img} alt={col.title} />
                <div className={styles.imgLabel}>
                  <p className={styles.persona}>{col.persona}</p>
                  <h3 className={styles.colTitle}>{col.title}</h3>
                </div>
              </div>
              <ul className={styles.products}>
                {col.products.map(p => (
                  <li key={p.id} className={styles.product}>
                    <Link to={`/products/${p.id}`} className={styles.productImg}>
                      <img src={p.img} alt={p.name} />
                    </Link>
                    <div className={styles.productInfo}>
                      <p className={styles.productName}>{p.name}</p>
                      <p className={styles.productPrice}>{p.price.toLocaleString()}원</p>
                    </div>
                    <button onClick={() => addToCart(p)} className={styles.cartBtn}>
                      <i className="fa-solid fa-bag-shopping"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
