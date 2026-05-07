import React from 'react'
import { Link } from 'react-router-dom'
import { tpoGridData } from '../data/products'
import { useApp } from '../App'
import styles from './TPOGrid.module.css'

const interviewLabels = [
  '패션 마케터의 출근룩 스타일링 인터뷰',
  '20대 크리에이터의 미니멀 캐주얼 룩',
  '30대 직장인의 비즈니스 캐주얼 가이드',
]

export default function TPOGrid() {
  const { addToCart } = useApp()

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {tpoGridData.map((col, colIdx) => (
            <div key={col.id} className={styles.col}>
              <div className={styles.mainImg}>
                <img src={col.img} alt={col.title} />
                <div className={styles.imgLabel}>
                  <p className={styles.persona}>{interviewLabels[colIdx]}</p>
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
