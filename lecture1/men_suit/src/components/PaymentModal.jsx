import React, { useState } from 'react'
import { useApp } from '../App'
import styles from './PaymentModal.module.css'

const PAYMENT_METHODS = [
  { id: 'card', label: '신용/체크카드', icon: 'fa-credit-card', type: 'card' },
  { id: 'simple', label: '간편결제 (PAYCO·TOSS)', icon: 'fa-mobile-screen', type: 'simple' },
  { id: 'kakao', label: '카카오페이', icon: 'fa-comment', type: 'simple' },
  { id: 'npay', label: '네이버페이', icon: 'fa-n', type: 'simple' },
  { id: 'bank', label: '실시간 계좌이체', icon: 'fa-building-columns', type: 'simple' },
]

export default function PaymentModal({ totalAmount, itemCount, onClose, onSuccess }) {
  const { showToast } = useApp()
  const [step, setStep] = useState('select')
  const [selectedMethod, setSelectedMethod] = useState(null)

  // 카드 폼 상태
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [agreed, setAgreed] = useState(false)

  // 간편결제 폼 상태
  const [simpleConfirmed, setSimpleConfirmed] = useState(false)

  const [orderNumber] = useState('ZZ' + Date.now())

  const handleMethodSelect = (method) => {
    setSelectedMethod(method)
    if (method.type === 'card') {
      setStep('card')
    } else {
      setStep('simple')
    }
  }

  const handleCardNumber = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.match(/.{1,4}/g)?.join('-') || raw
    setCardNumber(formatted)
  }

  const handleExpiryMonth = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2)
    setExpiryMonth(raw)
  }

  const handleExpiryYear = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2)
    setExpiryYear(raw)
  }

  const handleCvv = (e) => {
    setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
  }

  const handlePay = () => {
    setStep('done')
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const methodLabel = selectedMethod?.label || ''

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {step === 'select' && '결제 수단 선택'}
            {step === 'card' && '카드 정보 입력'}
            {step === 'simple' && `${methodLabel}`}
            {step === 'done' && '결제 완료'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

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
                    className={styles.methodBtn}
                    onClick={() => handleMethodSelect(method)}
                  >
                    <span className={styles.methodIcon}>
                      <i className={`fa-solid ${method.icon}`}></i>
                    </span>
                    <span className={styles.methodLabel}>{method.label}</span>
                    <span className={styles.methodArrow}>
                      <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 2단계-A: 카드 정보 입력 */}
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

              <div className={styles.expiryRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>유효기간 — 월 (MM)</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="MM"
                    value={expiryMonth}
                    onChange={handleExpiryMonth}
                    inputMode="numeric"
                    maxLength={2}
                  />
                </div>
                <div className={styles.expirySep}>/</div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>연도 (YY)</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="YY"
                    value={expiryYear}
                    onChange={handleExpiryYear}
                    inputMode="numeric"
                    maxLength={2}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>보안번호 (CVV)</label>
                <input
                  className={styles.formInput}
                  type="password"
                  placeholder="카드 뒷면 3자리"
                  value={cvv}
                  onChange={handleCvv}
                  inputMode="numeric"
                  maxLength={3}
                />
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

          {/* 2단계-B: 간편결제 확인 */}
          {step === 'simple' && (
            <div className={styles.simpleForm}>
              <div className={styles.simpleIcon}>
                <i className={`fa-solid ${selectedMethod?.icon}`}></i>
              </div>
              <p className={styles.simpleDesc}>
                <strong>{methodLabel}</strong>로<br />
                <span className={styles.simpleAmount}>{totalAmount.toLocaleString()}원</span>을 결제합니다.
              </p>
              <label className={styles.agreeLabel}>
                <input
                  type="checkbox"
                  checked={simpleConfirmed}
                  onChange={(e) => setSimpleConfirmed(e.target.checked)}
                  className={styles.agreeCheck}
                />
                <span>결제 내용을 확인하고 동의합니다.</span>
              </label>
              <div className={styles.cardActions}>
                <button className={styles.backBtn} onClick={() => setStep('select')}>
                  이전
                </button>
                <button className={styles.payBtn} onClick={handlePay}>
                  결제하기
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
              <p className={styles.doneMethod}>
                결제 수단: {methodLabel}
              </p>

              <div className={styles.doneActions}>
                <button className={styles.doneBtn} onClick={onSuccess}>
                  <i className="fa-solid fa-truck-fast"></i>
                  주문내역 / 배송 조회
                </button>
              </div>

              <p className={styles.doneCancelNote}>
                주문 취소 및 반품·교환은 주문내역 페이지에서 가능합니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
