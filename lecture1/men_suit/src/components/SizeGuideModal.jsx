import React, { useState } from 'react'
import styles from './SizeGuideModal.module.css'

const BASE = '/my-first-website/men_suit/images'

const sizeTable = [
  { size: 'M(95)',    shoulder: '45cm',   chest: '98cm',  waist: '82cm', hip: '96cm',  sleeve: '62cm' },
  { size: 'L(100)',   shoulder: '46.5cm', chest: '102cm', waist: '86cm', hip: '100cm', sleeve: '63cm' },
  { size: 'XL(105)',  shoulder: '48cm',   chest: '106cm', waist: '90cm', hip: '104cm', sleeve: '64cm' },
  { size: 'XXL(110)', shoulder: '50cm',   chest: '110cm', waist: '94cm', hip: '108cm', sleeve: '65cm' },
]

function recommend(height, weight) {
  const bmi = weight / ((height / 100) ** 2)

  if (height <= 170) {
    if (bmi < 20)   return { size: 'M',   fit: 'exact' }
    if (bmi < 22)   return { size: 'M',   fit: 'up' }
    if (bmi < 24)   return { size: 'L',   fit: 'exact' }
    return            { size: 'L',   fit: 'up' }
  } else if (height <= 175) {
    if (bmi < 20)   return { size: 'L',   fit: 'exact' }
    if (bmi < 22)   return { size: 'L',   fit: 'up' }
    if (bmi < 24)   return { size: 'XL',  fit: 'exact' }
    return            { size: 'XL',  fit: 'up' }
  } else if (height <= 180) {
    if (bmi < 20)   return { size: 'L',   fit: 'exact' }
    if (bmi < 22)   return { size: 'XL',  fit: 'exact' }
    if (bmi < 24)   return { size: 'XL',  fit: 'up' }
    return            { size: 'XXL', fit: 'exact' }
  } else {
    if (bmi < 21)   return { size: 'XL',  fit: 'exact' }
    if (bmi < 23)   return { size: 'XL',  fit: 'up' }
    return            { size: 'XXL', fit: 'exact' }
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
    setResult(recommend(h, w))
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const feedbackText = result
    ? (result.fit === 'exact' ? '100% 여유있게 맞아요' : '한 치수 up 해주세요')
    : ''

  const aiDesc = result
    ? (result.fit === 'exact'
      ? `${result.size} 사이즈가 체형 데이터에 딱 맞습니다. 슬림핏 제품도 부담 없이 선택하실 수 있어요. 실측 사이즈 표를 참고해 최종 확인 후 구매하세요.`
      : `체형 분석 결과 ${result.size} 사이즈를 권장드립니다. 체형 분포상 한 사이즈 업이 더 편안한 착용감을 드립니다. 여유로운 핏을 선호하신다면 ${result.size === 'M' ? 'L' : result.size === 'L' ? 'XL' : 'XXL'} 사이즈도 고려해보세요.`)
    : ''

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className={styles.body}>
          {/* 좌측: 이미지 + 사이즈 표 */}
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
                      <td><strong>{row.size}</strong></td>
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

          {/* 우측: 입력 + 결과 */}
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
                  내 사이즈는 <span className={styles.resultHighlight}>{result.size}</span>
                </p>
                <p className={styles.resultDesc}>
                  비슷한 체형을 가진 고객님들의 구매 데이터 및 사이즈 피드백을 AI가 분석한 결과입니다.
                </p>
                <div className={styles.feedbackBtn}>
                  {feedbackText}
                </div>
                <p className={styles.aiDesc}>{aiDesc}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
