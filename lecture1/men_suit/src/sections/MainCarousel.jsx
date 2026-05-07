import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { bannerSlides } from '../data/products'
import styles from './MainCarousel.module.css'

export default function MainCarousel() {
  const [current, setCurrent] = useState(2)
  const navigate = useNavigate()
  const total = bannerSlides.length

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % total)
  }, [total])

  const getRelIdx = (i) => {
    let rel = i - current
    if (rel > Math.floor(total / 2)) rel -= total
    if (rel < -Math.floor(total / 2)) rel += total
    return rel
  }

  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {bannerSlides.map((slide, i) => {
          const rel = getRelIdx(i)
          const isCenter = rel === 0
          const isVisible = Math.abs(rel) <= 2

          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${isCenter ? styles.slideCenter : ''} ${!isVisible ? styles.slideHidden : ''}`}
              style={{
                transform: `translateX(calc(${rel * 102}%))`,
                zIndex: isCenter ? 10 : 10 - Math.abs(rel),
              }}
              onClick={() => {
                if (!isCenter) {
                  rel < 0 ? prev() : next()
                } else {
                  navigate('/products')
                }
              }}
            >
              <div className={styles.imgWrap}>
                <img src={slide.img} alt={slide.title} className={styles.img} />
                {!isCenter && <div className={styles.dimOverlay}></div>}
              </div>
              {isCenter && (
                <div className={styles.caption}>
                  <h2 className={styles.captionTitle}>{slide.title}</h2>
                  <p className={styles.captionSub}>{slide.sub}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button onClick={prev} className={`${styles.arrow} ${styles.arrowPrev}`}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button onClick={next} className={`${styles.arrow} ${styles.arrowNext}`}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      <div className={styles.indicator}>
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  )
}
