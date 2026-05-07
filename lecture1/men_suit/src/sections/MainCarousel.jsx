import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MainCarousel.module.css'

const BASE = '/my-first-website/men_suit/images/banner/'

const slidesData = [
  { img: `${BASE}881_2281_314_KOR_20260210175220.jpeg`, title: '26 S/S COLLECTION', sub: '절제된 실루엣, 미니멀한 품격' },
  { img: `${BASE}881_2281_388_KOR_20260223120806.jpeg`, title: 'BUSINESS CASUAL', sub: 'TPO의 유연함을 입다' },
  { img: `${BASE}881_2281_390_KOR_20260227004341.jpeg`, title: 'NEW ESSENTIALS', sub: '매일 입고 싶은 남자의 기본' },
  { img: `${BASE}881_2281_392_KOR_20260303173054.jpeg`, title: 'STYLE YOUR DAY', sub: '당신의 하루를 완성하는 스타일' },
  { img: `${BASE}881_2281_394_KOR_20260306093951.jpeg`, title: 'MINIMAL LOOKBOOK', sub: '감도 높은 라이프스타일을 제안합니다' },
  { img: `${BASE}881_2281_396_KOR_20260330112925.jpeg`, title: 'THE REAL MEN', sub: '진짜 남자의 옷장을 완성하다' },
  { img: `${BASE}881_2281_397_KOR_20260413101439.jpeg`, title: 'SMART FORMAL', sub: '비즈니스와 캐주얼의 완벽한 균형' },
  { img: `${BASE}881_2281_398_KOR_20260413130804.jpeg`, title: 'PREMIUM SUIT', sub: '당신의 가치를 높이는 한 벌' },
  { img: `${BASE}881_2281_401_KOR_20260504160948.jpeg`, title: 'SEASON BEST', sub: '이번 시즌, 당신의 선택' },
]

// 앞 3장을 뒤에 추가해서 총 12개 (무한 슬라이드용)
const extendedSlides = [
  ...slidesData,
  slidesData[0],
  slidesData[1],
  slidesData[2],
]

const TOTAL = extendedSlides.length // 12
const CARD_WIDTH = 430
const CARD_GAP = 16
const VISIBLE = 5

export default function MainCarousel() {
  const navigate = useNavigate()
  // 초기 인덱스: 2 (중앙 카드가 index 2가 되도록)
  const [current, setCurrent] = useState(2)
  const [isTransition, setIsTransition] = useState(true)
  const autoRef = useRef(null)
  const pausedRef = useRef(false)

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent(c => c + 1)
        setIsTransition(true)
      }
    }, 3000)
  }, [])

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [startAuto])

  // 인덱스가 끝에 도달하면 transition 없이 처음으로 점프
  useEffect(() => {
    if (current >= TOTAL - 3) {
      // 원본 마지막(index 8)에 해당하는 클론 영역을 넘어가면 리셋
      const timer = setTimeout(() => {
        setIsTransition(false)
        setCurrent(c => c - (TOTAL - 3))
      }, 500)
      return () => clearTimeout(timer)
    }
    if (current < 0) {
      const timer = setTimeout(() => {
        setIsTransition(false)
        setCurrent(TOTAL - 3 - 1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [current])

  const handlePrev = () => {
    setIsTransition(true)
    setCurrent(c => c - 1)
    pausedRef.current = true
    clearInterval(autoRef.current)
    setTimeout(() => {
      pausedRef.current = false
      startAuto()
    }, 5000)
  }

  const handleNext = () => {
    setIsTransition(true)
    setCurrent(c => c + 1)
    pausedRef.current = true
    clearInterval(autoRef.current)
    setTimeout(() => {
      pausedRef.current = false
      startAuto()
    }, 5000)
  }

  // 가운데 기준으로 상대적 위치 계산
  const getOffset = (i) => {
    return i - current
  }

  const progressPercent = ((current % slidesData.length) / slidesData.length) * 100

  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {extendedSlides.map((slide, i) => {
          const offset = getOffset(i)
          const isCenter = offset === 0
          const isVisible = Math.abs(offset) <= 2

          const translateX = offset * (CARD_WIDTH + CARD_GAP)

          return (
            <div
              key={i}
              className={styles.slide}
              style={{
                transform: `translateX(calc(-50% + ${translateX}px))`,
                transition: isTransition ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                zIndex: isCenter ? 10 : 10 - Math.abs(offset),
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              onClick={() => {
                if (!isCenter) {
                  offset < 0 ? handlePrev() : handleNext()
                } else {
                  navigate('/products')
                }
              }}
            >
              <div className={styles.imgWrap}>
                <img src={slide.img} alt={slide.title} className={styles.img} />
                {!isCenter && <div className={styles.dimOverlay} />}
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

      <button onClick={handlePrev} className={`${styles.arrow} ${styles.arrowPrev}`}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button onClick={handleNext} className={`${styles.arrow} ${styles.arrowNext}`}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      <div className={styles.indicatorWrap}>
        <div className={styles.indicatorBg}>
          <div
            className={styles.indicatorFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </section>
  )
}
