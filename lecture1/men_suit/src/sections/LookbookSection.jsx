import React from 'react'
import { useNavigate } from 'react-router-dom'
import { lookbookImages } from '../data/products'
import styles from './LookbookSection.module.css'

const hoverTexts = [
  '20대 직장인 출근룩',
  '30대 캐주얼 정장 추천',
  '비즈니스 캐주얼 완성법',
  '미니멀 셋업 스타일링',
]

export default function LookbookSection() {
  const navigate = useNavigate()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Real Men's Essentials</h2>
          <p className={styles.desc}>비주얼 중심의 캐주얼 및 정장 스타일링</p>
        </div>

        <div className={styles.grid}>
          {lookbookImages.map((img, i) => (
            <div
              key={i}
              className={styles.imgWrap}
              onClick={() => navigate('/products')}
            >
              <img src={img} alt={`룩북 ${i + 1}`} className={styles.img} />
              <div className={styles.overlay}>
                <span className={styles.overlayText}>{hoverTexts[i]}</span>
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
