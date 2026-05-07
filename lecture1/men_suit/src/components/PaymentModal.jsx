import React, { useState } from 'react'
import { useApp } from '../App'
import styles from './PaymentModal.module.css'

const PAYMENT_METHODS = [
  { id: 'simple', label: '간편결제', ready: false },
  { id: 'card', label: '카드등록 후 결제', ready: true },
  { id: 'general', label: '일반결제', ready: false },
  { id: 'kakao', label: '카카오페이 결제', ready: false },
  { id: 'npay', label: 'N페이 결제', ready: false },
]

export default function PaymentModal({ totalAmount, itemCount, onClose, onSuccess }) {
  const { showToast } = useApp()
  const [step, setStep] = useState('select')
  const [selectedMethod, setSelectedMethod] = useState(null)

  // 카드 폼 상태
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [agreed, setAgreed] = useState(false)

  // 주문번호 (done 단계에서 표시)
  const [orderNumber] = useState('ORD-' + Date.now())

  const handleMethodSelect = (method) => {
    if (!method.ready) {
      showToast('준비 중인 서비스입니다.')
      return
    }
    setSelectedMethod(method.id)
    setStep('card')
  }

  // 카드번호 입력: 16자리, 4자리씩 하이픈 자동 입력
  const handleCardNumber = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.match(/.{1,4}/g)?.join('-') || raw
    setCardNumber(formatted)
  }

  // 유효기간 MM/YY 형식
  const handleExpiry = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (raw.length >= 3) {
      setExpiry(raw.slice(0, 2) + '/' + raw.slice(2))
    } else {
      setExpiry(raw)
    }
  }

  // 보안번호 3자리
  const handleCvv = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 3)
    setCvv(raw)
  }

  const handlePay = () => {
    // 어떤 값이든 done으로 이동
    setStep('done')
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {step === 'select' && '결제 수단 선택'}
            {step === 'card' && '카드 정보 입력'}
            {step === 'done' && '결제 완료'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* 결제 금액 표시 */}
        {step !== 'done' && (
          <div className={styles.amountBar}>
            <span className={styles.amountLabel}>결제 금액</span>
            <span className={styles.amountValue}>{totalAmount.toLocaleString()}원</span>
            <span className={styles.itemCount}>({itemCount}개 상품)</span>
          </div>
        )}

        <div className={styles.modalBody}>
          {/* 1단계: 결제 수단 선택 */}
          {step === 'select' && (
            <ul className={styles.methodList}>
              {PAYMENT_METHODS.map((method) => (
                <li key={method.id}>
                  <button
                    className={`${styles.methodBtn} ${!method.ready ? styles.methodDisabled : ''}`}
                    onClick={() => handleMethodSelect(method)}
                  >
                    <span className={styles.methodLabel}>{method.label}</span>
                    {method.ready && (
                      <span className={styles.methodCheck}>
                        <i className="fa-solid fa-check"></i>
                      </span>
                    )}
                    {!method.ready && (
                      <span className={styles.methodSoon}>준비중</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 2단계: 카드 정보 입력 */}
          {step === 'card' && (
            <div className={styles.cardForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>카드번호</label>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="0000-0000-0000-0000"
                  value={cardNumber}
                  onChange={handleCardNumber}
                  inputMode="numeric"
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>유효기간</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiry}
                    inputMode="numeric"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>보안번호(CVV)</label>
                  <input
                    className={styles.formInput}
                    type="password"
                    placeholder="000"
                    value={cvv}
                    onChange={handleCvv}
                    inputMode="numeric"
                    maxLength={3}
                  />
                </div>
              </div>

              <label className={styles.agreeLabel}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className={styles.agreeCheck}
                />
                <span>개인정보 수집 및 이용에 동의합니다.</span>
              </label>

              <div className={styles.cardActions}>
                <button className={styles.backBtn} onClick={() => setStep('select')}>
                  이전
                </button>
                <button className={styles.payBtn} onClick={handlePay}>
                  결제하기 ({totalAmount.toLocaleString()}원)
                </button>
              </div>
            </div>
          )}

          {/* 3단계: 결제 완료 */}
          {step === 'done' && (
            <div className={styles.doneWrap}>
              <div className={styles.doneIcon}>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className={styles.doneTitle}>결제가 완료되었습니다!</h3>
              <p className={styles.doneOrderNum}>
                주문번호: <strong>{orderNumber}</strong>
              </p>
              <p className={styles.doneAmount}>
                결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
              </p>
              <button className={styles.doneBtn} onClick={onSuccess}>
                주문내역 확인
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
