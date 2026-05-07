import React, { useState } from 'react'
import styles from './SizeGuideModal.module.css'

const BASE = '/my-first-website/men_suit/images'

const sizeTable = [
  { size: 'M(95)',   shoulder: '45cm',  chest: '98cm',  waist: '82cm',  hip: '96cm',  sleeve: '62cm' },
  { size: 'L(100)',  shoulder: '46.5cm', chest: '102cm', waist: '86cm',  hip: '100cm', sleeve: '63cm' },
  { size: 'XL(105)', shoulder: '48cm',  chest: '106cm', waist: '90cm',  hip: '104cm', sleeve: '64cm' },
  { size: 'XXL(110)',shoulder: '50cm',  chest: '110cm', waist: '94cm',  hip: '108cm', sleeve: '65cm' },
]

const feedbackMap = {
  M:   '100% 딱 맞아요',
  L:   '85% 딱 맞아요, 15% 약간 여유있어요',
  XL:  '90% 딱 맞아요',
  XXL: '한 치수 Up 해주세요 / 100% 여유있게 맞아요',
}

function recommend(height, weight) {
  const bmi = weight / ((height / 100) ** 2)
  if (height <= 170) {
    if (bmi < 21) return 'M'
    if (bmi < 24) return 'L'
    return 'XL'
  } else if (height <= 175) {
    if (bmi < 21) return 'L'
    if (bmi < 24) return 'XL'
    return 'XXL'
  } else {
    if (bmi < 21) return 'L'
    if (bmi < 23) return 'XL'
    return 'XXL'
  }
}

export default function SizeGuideModal({ onClose, user }) {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || '고객'

  const handleRecommend = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w || h < 100 || h > 250 || w < 30 || w > 200) {
      alert('올바른 키와 몸무게를 입력해주세요.')
      return
    }
    const size = recommend(h, w)
    setResult(size)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* 닫기 버튼 */}
        <button className={styles.closeBtn} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className={styles.body}>
          {/* 좌측 */}
          <div className={styles.left}>
            <div className={styles.leftImgWrap}>
              <img
                src={`${BASE}/mysize/long-sweater.jpeg`}
                alt="사이즈 가이드 이미지"
                className={styles.leftImg}
              />
            </div>
            <div className={styles.tableWrap}>
              <h3 className={styles.tableTitle}>사이즈 실측 데이터</h3>
              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    <th>사이즈</th>
                    <th>어깨너비</th>
                    <th>가슴둘레</th>
                    <th>허리둘레</th>
                    <th>힙둘레</th>
                    <th>소매길이</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeTable.map(row => (
                    <tr key={row.size}>
                      <td>{row.size}</td>
                      <td>{row.shoulder}</td>
                      <td>{row.chest}</td>
                      <td>{row.waist}</td>
                      <td>{row.hip}</td>
                      <td>{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 우측 */}
          <div className={styles.right}>
            <h2 className={styles.rightTitle}>나에게 맞는 사이즈 찾기</h2>
            <p className={styles.rightSub}>{userName}님의 체형에 딱 맞는 사이즈를 추천해드립니다</p>

            <div className={styles.inputGroup}>
              <input
                type="number"
                className={styles.input}
                placeholder="키 (cm)"
                value={height}
                onChange={e => setHeight(e.target.value)}
                min="100"
                max="250"
              />
              <input
                type="number"
                className={styles.input}
                placeholder="몸무게 (kg)"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                min="30"
                max="200"
              />
            </div>

            <button className={styles.recommendBtn} onClick={handleRecommend}>
              사이즈 추천받기
            </button>

            {result && (
              <div className={styles.resultWrap}>
                <p className={styles.resultSize}>
                  내 사이즈는 <span className={styles.resultHighlight}>{result}</span>
                </p>
                <p className={styles.resultDesc}>
                  비슷한 체형을 가진 사람들이 구매한 사이즈와 사이즈 피드백 데이터를 분석한 결과입니다
                </p>
                <button className={styles.feedbackBtn}>
                  {feedbackMap[result]}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
