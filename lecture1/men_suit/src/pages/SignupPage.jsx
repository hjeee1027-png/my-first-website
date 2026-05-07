import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useApp } from '../App'
import styles from './SignupPage.module.css'

const steps = ['계정 정보', '개인 정보', '완료']

export default function SignupPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    username: '', usernameOk: false,
    password: '', passwordConfirm: '', passwordOk: false,
    email: '', emailOk: false,
    name: '', phone: '',
    address: '', addressDetail: '',
    agree: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { showToast } = useApp()
  const navigate = useNavigate()

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const checkUsername = () => {
    if (!form.username) { setErrors(e => ({...e, username: '아이디를 입력하세요.'})); return }
    if (form.username.length < 4) { setErrors(e => ({...e, username: '4자 이상 입력하세요.'})); return }
    set('usernameOk', true)
    setErrors(e => ({...e, username: ''}))
    showToast('사용 가능한 아이디입니다.')
  }

  const validateStep0 = () => {
    const errs = {}
    if (!form.username) errs.username = '아이디를 입력하세요.'
    if (!form.usernameOk) errs.username = '아이디 중복확인을 해주세요.'
    if (!form.password || form.password.length < 8) errs.password = '비밀번호는 8자 이상이어야 합니다.'
    if (form.password !== form.passwordConfirm) errs.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    if (!form.email) errs.email = '이메일을 입력하세요.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep1 = () => {
    const errs = {}
    if (!form.name) errs.name = '이름을 입력하세요.'
    if (!form.phone) errs.phone = '휴대전화를 입력하세요.'
    if (!form.address) errs.address = '주소를 검색하세요.'
    if (!form.agree) errs.agree = '개인정보 처리방침에 동의해주세요.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return
    if (step === 1 && !validateStep1()) return
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
          name: form.name,
          phone: form.phone,
          address: form.address + ' ' + form.addressDetail,
        }
      }
    })

    if (!error && data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: form.email,
        name: form.name,
        phone: form.phone,
        address: form.address + ' ' + form.addressDetail,
        status: 'active',
      }).then(() => {})
    }

    setLoading(false)
    if (error) { showToast(error.message, 'error'); return }
    setStep(2)
  }

  const searchAddress = () => {
    if (window.daum?.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data) => {
          set('address', data.address)
        }
      }).open()
    } else {
      const addr = prompt('주소를 직접 입력하세요 (카카오 API 미연동):')
      if (addr) set('address', addr)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/my-first-website/men_suit/images/icons/site-brand.png" alt="ZIOZIA" width="160" />
        </Link>
        <h1 className={styles.title}>회원가입</h1>

        <div className={styles.stepBar}>
          {steps.map((s, i) => (
            <div key={s} className={`${styles.stepItem} ${i <= step ? styles.stepActive : ''}`}>
              <div className={styles.stepCircle}>{i + 1}</div>
              <span className={styles.stepLabel}>{s}</span>
              {i < steps.length - 1 && <div className={styles.stepLine}></div>}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>아이디 *</label>
              <div className={styles.withBtn}>
                <input type="text" placeholder="영문, 숫자 4~16자" value={form.username}
                  onChange={e => { set('username', e.target.value); set('usernameOk', false) }}
                  className={styles.input} />
                <button onClick={checkUsername} className={styles.checkBtn}>중복확인</button>
              </div>
              {form.usernameOk && <p className={styles.ok}>사용 가능한 아이디입니다.</p>}
              {errors.username && <p className={styles.err}>{errors.username}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>비밀번호 *</label>
              <input type="password" placeholder="8자 이상" value={form.password}
                onChange={e => set('password', e.target.value)} className={styles.input} />
              {errors.password && <p className={styles.err}>{errors.password}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>비밀번호 확인 *</label>
              <input type="password" placeholder="비밀번호 재입력" value={form.passwordConfirm}
                onChange={e => set('passwordConfirm', e.target.value)} className={styles.input} />
              {form.passwordConfirm && form.password === form.passwordConfirm &&
                <p className={styles.ok}>비밀번호가 일치합니다.</p>}
              {errors.passwordConfirm && <p className={styles.err}>{errors.passwordConfirm}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>이메일 *</label>
              <input type="email" placeholder="이메일 주소" value={form.email}
                onChange={e => set('email', e.target.value)} className={styles.input} />
              {errors.email && <p className={styles.err}>{errors.email}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>이름 *</label>
              <input type="text" placeholder="실명" value={form.name}
                onChange={e => set('name', e.target.value)} className={styles.input} />
              {errors.name && <p className={styles.err}>{errors.name}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>휴대전화 *</label>
              <input type="tel" placeholder="010-0000-0000" value={form.phone}
                onChange={e => set('phone', e.target.value)} className={styles.input} />
              {errors.phone && <p className={styles.err}>{errors.phone}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>주소 *</label>
              <div className={styles.withBtn}>
                <input type="text" placeholder="주소 검색" value={form.address}
                  readOnly className={styles.input} />
                <button onClick={searchAddress} className={styles.checkBtn}>주소 검색</button>
              </div>
              {form.address && (
                <input type="text" placeholder="상세 주소" value={form.addressDetail}
                  onChange={e => set('addressDetail', e.target.value)} className={`${styles.input} ${styles.mt8}`} />
              )}
              {errors.address && <p className={styles.err}>{errors.address}</p>}
            </div>

            <div className={styles.agreeWrap}>
              <label className={styles.agreeLabel}>
                <input type="checkbox" checked={form.agree}
                  onChange={e => set('agree', e.target.checked)} />
                <span>개인정보 수집·이용 동의 (필수)</span>
              </label>
              {errors.agree && <p className={styles.err}>{errors.agree}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.successWrap}>
            <div className={styles.successIcon}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 className={styles.successTitle}>회원가입이 완료되었습니다!</h2>
            <p className={styles.successDesc}>
              가입하신 이메일({form.email})로<br />
              인증 메일이 발송되었습니다.<br />
              이메일 인증 후 로그인하실 수 있습니다.
            </p>
            <Link to="/login" className={styles.loginBtn}>로그인 하기</Link>
          </div>
        )}

        {step < 2 && (
          <div className={styles.btnRow}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className={styles.prevBtn}>이전</button>
            )}
            {step < 1 ? (
              <button onClick={handleNext} className={styles.nextBtn}>다음</button>
            ) : (
              <button onClick={handleSubmit} className={styles.nextBtn} disabled={loading}>
                {loading ? '처리 중...' : '가입하기'}
              </button>
            )}
          </div>
        )}

        {step === 0 && (
          <p className={styles.loginPrompt}>
            이미 회원이신가요?{' '}
            <Link to="/login" className={styles.loginLink}>로그인</Link>
          </p>
        )}
      </div>
    </div>
  )
}
