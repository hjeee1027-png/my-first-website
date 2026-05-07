import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useApp } from '../App'
import styles from './LoginPage.module.css'

const BASE = '/my-first-website/men_suit/images'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { showToast } = useApp()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError('이메일 또는 비밀번호가 올바르지 않습니다.'); return }
    showToast('로그인 되었습니다.')
    navigate('/')
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/my-first-website/men_suit/' }
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={`${BASE}/icons/site-brand.png`} alt="ZIOZIA" width="160" />
        </Link>

        <h1 className={styles.title}>로그인</h1>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>이메일</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className={styles.input}
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className={styles.links}>
          <Link to="#" className={styles.link}>아이디 찾기</Link>
          <span className={styles.sep}>|</span>
          <Link to="#" className={styles.link}>비밀번호 찾기</Link>
          <span className={styles.sep}>|</span>
          <Link to="/signup" className={styles.link}>회원가입</Link>
        </div>

        <div className={styles.divider}>
          <span>또는 SNS 로그인</span>
        </div>

        <div className={styles.snsWrap}>
          <button className={`${styles.snsBtn} ${styles.google}`} onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google"></i>
            <span>Google로 로그인</span>
          </button>
        </div>

        <p className={styles.signupPrompt}>
          아직 회원이 아니신가요?{' '}
          <Link to="/signup" className={styles.signupLink}>회원가입</Link>
        </p>
      </div>
    </div>
  )
}
