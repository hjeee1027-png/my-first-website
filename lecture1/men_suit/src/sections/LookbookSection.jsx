import React from 'react'
import { useNavigate } from 'react-router-dom'
import { lookbookImages } from '../data/products'
import styles from './LookbookSection.module.css'

export default function LookbookSection() {
  const navigate = useNavigate()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sub}>2026 S/S CAMPAIGN</p>
          <h2 className={styles.title}>The Real Men's Essentials</h2>
          <p className={styles.desc}>비주얼 중심의 캐주얼 및 정장 스타일링</p>
        </div>

        <div className={styles.grid}>
          {lookbookImages.map((img, i) => (
            <div
              key={i}
              className={`${styles.imgWrap} ${i === 0 ? styles.imgLarge : ''}`}
              onClick={() => navigate('/products')}
            >
              <img src={img} alt={`룩북 ${i + 1}`} className={styles.img} />
              <div className={styles.overlay}>
                <span className={styles.overlayText}>VIEW MORE</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <button className={styles.ctaBtn} onClick={() => navigate('/products')}>
            FULL LOOKBOOK VIEW
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}
