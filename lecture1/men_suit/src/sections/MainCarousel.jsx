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

// pre-clone(마지막3) + real(9) + post-clone(처음3) = 총 15개
const extendedSlides = [
  slidesData[6], slidesData[7], slidesData[8], // 인덱스 0,1,2 (pre-clone)
  ...slidesData,                                // 인덱스 3-11 (real)
  slidesData[0], slidesData[1], slidesData[2], // 인덱스 12,13,14 (post-clone)
]

const REAL_COUNT = slidesData.length // 9
const TOTAL = extendedSlides.length  // 15
const START = 5  // pre(3) + realIdx(2) = 5 → 3번째 real 슬라이드

const CARD_WIDTH = 430
const CARD_GAP = 16

export default function MainCarousel() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(START)
  const [isTransition, setIsTransition] = useState(true)
  const isJumping = useRef(false)
  const autoRef = useRef(null)
  const pausedRef = useRef(false)

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      if (!pausedRef.current && !isJumping.current) {
        setIsTransition(true)
        setCurrent(c => c + 1)
      }
    }, 3000)
  }, [])

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [startAuto])

  // 점프 로직: post-clone 또는 pre-clone 영역 진입 시 transition:none으로 실제 위치로 이동
  useEffect(() => {
    if (isJumping.current) return

    if (current >= TOTAL - 3) { // >= 12: post-clone 진입
      isJumping.current = true
      const t = setTimeout(() => {
        setIsTransition(false)
        setCurrent(c => c - REAL_COUNT)
      }, 500)
      return () => clearTimeout(t)
    }

    if (current < 3) { // pre-clone 진입
      isJumping.current = true
      const t = setTimeout(() => {
        setIsTransition(false)
        setCurrent(c => c + REAL_COUNT)
      }, 500)
      return () => clearTimeout(t)
    }
  }, [current])

  // transition:none 완료 후 다시 transition 활성화 + jumping 해제
  useEffect(() => {
    if (!isTransition) {
      const t = setTimeout(() => {
        isJumping.current = false
        setIsTransition(true)
      }, 50)
      return () => clearTimeout(t)
    }
  }, [isTransition])

  const handlePrev = () => {
    if (isJumping.current) return
    setIsTransition(true)
    setCurrent(c => c - 1)
    pausedRef.current = true
    clearInterval(autoRef.current)
    setTimeout(() => { pausedRef.current = false; startAuto() }, 5000)
  }

  const handleNext = () => {
    if (isJumping.current) return
    setIsTransition(true)
    setCurrent(c => c + 1)
    pausedRef.current = true
    clearInterval(autoRef.current)
    setTimeout(() => { pausedRef.current = false; startAuto() }, 5000)
  }

  const getOffset = (i) => i - current

  // 진행률: current=START(5)일 때 0%, 슬라이드 넘길수록 채워짐
  const realIdx = ((current - 3) % REAL_COUNT + REAL_COUNT) % REAL_COUNT
  const progressPercent = ((realIdx - 2 + REAL_COUNT) % REAL_COUNT) / REAL_COUNT * 100

  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {extendedSlides.map((slide, i) => {
          const offset = getOffset(i)
          const isCenter = offset === 0
          const isVisible = Math.abs(offset) <= 2
          const translateX = offset * (CARD_WIDTH + CARD_GAP)

          const isBright = Math.abs(offset) <= 1 // 중앙 + 양쪽 1개 밝게 + 텍스트

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
                {!isBright && <div className={styles.dimOverlay} />}
              </div>
              {isBright && (
                <div className={`${styles.caption} ${!isCenter ? styles.captionSide : ''}`}>
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
