import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, TextField, Button, Alert,
  CircularProgress, Stepper, Step, StepLabel, Checkbox,
  FormControlLabel, Link, InputAdornment,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { useAuth } from '../hooks/useAuth'

const STEPS = ['기본 정보', '연락처', '약관 동의']

const base = import.meta.env.BASE_URL || '/'
const REDIRECT_URL = `${window.location.origin}${base}auth/callback`

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    email: '', password: '', passwordConfirm: '',
    username: '', display_name: '', phone: '',
    address: '', address_detail: '', zip_code: '',
    agree_terms: false, agree_privacy: false, agree_marketing: false,
  })
  const [loading, setLoading] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [usernameChecked, setUsernameChecked] = useState(false)
  const [usernameChecking, setUsernameChecking] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.email_confirmed_at && localStorage.getItem('vantage_reg_pending')) {
      localStorage.removeItem('vantage_reg_pending')
      setEmailVerified(true)
      setEmailSent(true)
      setForm(f => ({ ...f, email: user.email || f.email }))
    }
  }, [user])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const setCheck = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }))

  // 아이디 중복 확인
  const handleCheckUsername = async () => {
    if (!form.username || form.username.length < 4) {
      setError('아이디를 4자 이상 입력해주세요.')
      return
    }
    setUsernameChecking(true)
    setError('')
    try {
      const { data } = await supabase.from('profiles').select('username').eq('username', form.username).maybeSingle()
      if (data) {
        setError('이미 사용 중인 아이디입니다.')
        setUsernameChecked(false)
      } else {
        setUsernameChecked(true)
      }
    } catch {
      setError('중복 확인 중 오류가 발생했습니다.')
    } finally {
      setUsernameChecking(false)
    }
  }

  // 인증 메일 발송
  const handleSendVerification = async () => {
    if (!form.username || !usernameChecked || !form.password || form.password.length < 8 || !form.email || !form.email.includes('@')) {
      setError('아이디 중복확인, 비밀번호, 이메일을 먼저 입력해주세요.')
      return
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    setEmailSending(true)
    setError('')
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { emailRedirectTo: REDIRECT_URL },
      })
      if (error) throw error
      if (!data?.user) {
        setError('이미 사용 중인 이메일입니다.')
        return
      }
      localStorage.setItem('vantage_reg_pending', 'true')
      setEmailSent(true)
      if (data.user.email_confirmed_at) {
        setEmailVerified(true)
      }
    } catch (err) {
      const msg = err.message
      if (msg?.includes('already registered') || msg?.includes('already been registered')) {
        setError('이미 사용 중인 이메일입니다.')
      } else if (msg?.includes('rate limit') || msg?.includes('too many')) {
        setError('잠시 후 다시 시도해주세요. (발송 횟수 초과)')
      } else {
        setError(msg || '메일 발송 중 오류가 발생했습니다.')
      }
    } finally {
      setEmailSending(false)
    }
  }

  const handleAddressSearch = () => {
    const open = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setForm(f => ({ ...f, zip_code: data.zonecode, address: data.roadAddress || data.jibunAddress }))
        },
      }).open()
    }
    if (window.daum?.Postcode) {
      open()
    } else {
      const s = document.createElement('script')
      s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      s.onload = open
      document.head.appendChild(s)
    }
  }

  const validateStep = () => {
    if (step === 0) {
      if (!form.username) return '아이디를 입력해주세요.'
      if (!usernameChecked) return '아이디 중복확인을 완료해주세요.'
      if (!form.email || !form.email.includes('@')) return '이메일을 올바르게 입력해주세요.'
      if (!emailVerified) return '이메일 인증을 완료해주세요.'
      if (!form.display_name) return '이름을 입력해주세요.'
    }
    if (step === 1) {
      if (!form.phone) return '휴대폰 번호를 입력해주세요.'
    }
    if (step === 2) {
      if (!form.agree_terms) return '이용약관에 동의해주세요.'
      if (!form.agree_privacy) return '개인정보처리방침에 동의해주세요.'
    }
    return null
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setLoading(true)
    setError('')
    try {
      await supabase.auth.updateUser({
        data: { username: form.username, display_name: form.display_name, phone: form.phone },
      })
      if (user) {
        await supabase.from('profiles').upsert({
          user_id: user.id,
          username: form.username,
          display_name: form.display_name,
          phone: form.phone,
        })
      }
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8', display: 'flex', flexDirection: 'column', pt: '72px' }}>
      <Container maxWidth="sm" sx={{ flex: 1, py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.35em', color: '#111', fontSize: '2rem', mb: 1 }}>
            VANTAGE
          </Typography>
          <Typography sx={{ color: '#888', fontSize: '0.875rem', letterSpacing: '0.1em' }}>회원가입</Typography>
        </Box>

        <Stepper activeStep={step} sx={{ mb: 5 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{ sx: { '&.Mui-active': { color: '#A68966' }, '&.Mui-completed': { color: '#A68966' } } }}
                sx={{ '.MuiStepLabel-label': { color: '#999', '&.Mui-active': { color: '#111' }, '&.Mui-completed': { color: '#A68966' } } }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ bgcolor: '#fff', border: '1px solid #e0e0e0', p: 4 }}>
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 0 }}>{error}</Alert>}

          {/* 스텝 0: 기본 정보 */}
          {step === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

              {/* 아이디 + 중복확인 */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <TextField
                  fullWidth label="아이디 *"
                  value={form.username}
                  onChange={(e) => { set('username')(e); setUsernameChecked(false) }}
                  helperText="영문 소문자, 숫자 4-20자"
                  InputProps={usernameChecked ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: '1.2rem' }} />
                      </InputAdornment>
                    ),
                  } : undefined}
                />
                <Button
                  variant="outlined"
                  onClick={handleCheckUsername}
                  disabled={usernameChecking || usernameChecked}
                  sx={{
                    whiteSpace: 'nowrap',
                    width: 100,
                    flexShrink: 0,
                    height: 56,
                    borderColor: usernameChecked ? '#2e7d32' : '#e0e0e0',
                    color: usernameChecked ? '#2e7d32' : '#111',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    '&:hover': { borderColor: usernameChecked ? '#2e7d32' : '#111' },
                    '&.Mui-disabled': { borderColor: usernameChecked ? '#2e7d32' : undefined, color: usernameChecked ? '#2e7d32' : undefined },
                  }}
                >
                  {usernameChecking ? <CircularProgress size={18} sx={{ color: '#111' }} />
                    : usernameChecked ? '확인완료 ✓'
                    : '중복확인'}
                </Button>
              </Box>

              {/* 비밀번호 */}
              <TextField
                fullWidth label="비밀번호 *" type="password"
                value={form.password} onChange={set('password')}
                disabled={emailVerified}
                helperText="영문+숫자+특수문자 8자 이상"
              />
              <TextField
                fullWidth label="비밀번호 확인 *" type="password"
                value={form.passwordConfirm} onChange={set('passwordConfirm')}
                disabled={emailVerified}
                error={form.passwordConfirm !== '' && form.password !== form.passwordConfirm}
                helperText={form.passwordConfirm !== '' && form.password !== form.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : ''}
              />

              {/* 이메일 + 인증 버튼 */}
              <Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth label="이메일 *" type="email"
                    value={form.email} onChange={set('email')}
                    disabled={emailVerified}
                    InputProps={emailVerified ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: '1.2rem' }} />
                        </InputAdornment>
                      ),
                    } : undefined}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleSendVerification}
                    disabled={emailSending || emailVerified}
                    sx={{
                      whiteSpace: 'nowrap',
                      width: 120,
                      flexShrink: 0,
                      borderColor: emailVerified ? '#2e7d32' : '#e0e0e0',
                      color: emailVerified ? '#2e7d32' : '#111',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      '&:hover': { borderColor: emailVerified ? '#2e7d32' : '#111' },
                      '&.Mui-disabled': { borderColor: emailVerified ? '#2e7d32' : undefined, color: emailVerified ? '#2e7d32' : undefined },
                    }}
                  >
                    {emailSending ? <CircularProgress size={18} sx={{ color: '#111' }} />
                      : emailVerified ? '인증완료 ✓'
                      : '인증메일 발송'}
                  </Button>
                </Box>
                {emailSent && !emailVerified && (
                  <Alert severity="info" sx={{ mt: 1, borderRadius: 0, fontSize: '0.8rem' }}>
                    인증메일을 발송하였습니다. 받은 편지함에서 인증하기를 클릭해주세요.
                  </Alert>
                )}
                {emailVerified && (
                  <Alert severity="success" sx={{ mt: 1, borderRadius: 0, fontSize: '0.8rem' }}>
                    이메일 인증이 완료되었습니다.
                  </Alert>
                )}
              </Box>

              {/* 실명 — 이메일 인증 후 활성화 */}
              <TextField
                fullWidth label="이름(실명) *"
                value={form.display_name} onChange={set('display_name')}
                disabled={!emailVerified}
              />
            </Box>
          )}

          {/* 스텝 1: 연락처 */}
          {step === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField fullWidth label="휴대폰 번호 *" value={form.phone} onChange={set('phone')} placeholder="010-0000-0000" />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField fullWidth label="우편번호" value={form.zip_code} onChange={set('zip_code')} InputProps={{ readOnly: true }} />
                <Button variant="outlined" onClick={handleAddressSearch}
                  sx={{ borderColor: '#e0e0e0', color: '#111', whiteSpace: 'nowrap', px: 2, '&:hover': { borderColor: '#111' } }}>
                  주소 검색
                </Button>
              </Box>
              <TextField fullWidth label="주소" value={form.address} onChange={set('address')} InputProps={{ readOnly: true }} />
              <TextField fullWidth label="상세 주소" value={form.address_detail} onChange={set('address_detail')} placeholder="동, 호수 등 상세 주소 입력" />
            </Box>
          )}

          {/* 스텝 2: 약관 */}
          {step === 2 && (
            <Box>
              <FormControlLabel
                sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}
                control={
                  <Checkbox
                    checked={form.agree_terms && form.agree_privacy && form.agree_marketing}
                    onChange={(e) => setForm(f => ({ ...f, agree_terms: e.target.checked, agree_privacy: e.target.checked, agree_marketing: e.target.checked }))}
                    sx={{ color: '#ccc', '&.Mui-checked': { color: '#A68966' }, pt: 0 }}
                  />
                }
                label={<Typography sx={{ color: '#111', fontWeight: 600, fontSize: '0.95rem' }}>전체 동의</Typography>}
              />
              <Box sx={{ borderLeft: '2px solid #e0e0e0', pl: 2, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                {[
                  { key: 'agree_terms', label: '[필수] 이용약관 동의' },
                  { key: 'agree_privacy', label: '[필수] 개인정보 수집 및 이용 동의' },
                  { key: 'agree_marketing', label: '[선택] 마케팅 정보 수신 동의' },
                ].map(item => (
                  <Box key={item.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                      control={<Checkbox checked={form[item.key]} onChange={setCheck(item.key)} size="small" sx={{ color: '#ccc', '&.Mui-checked': { color: '#A68966' } }} />}
                      label={<Typography sx={{ color: '#666', fontSize: '0.875rem' }}>{item.label}</Typography>}
                    />
                    <Link href="#" sx={{ color: '#bbb', fontSize: '0.75rem', textDecoration: 'none', '&:hover': { color: '#A68966' } }}>보기</Link>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {step > 0 && (
              <Button variant="outlined" onClick={() => { setStep(s => s - 1); setError('') }}
                sx={{ borderColor: '#e0e0e0', color: '#111', py: 1.5, flex: 1, '&:hover': { borderColor: '#111' } }}>
                이전
              </Button>
            )}
            <Button
              variant="contained"
              onClick={step === STEPS.length - 1 ? handleSubmit : handleNext}
              disabled={loading}
              sx={{ bgcolor: '#111', color: '#fff', border: 'none', py: 1.5, flex: 2, fontWeight: 700, '&:hover': { bgcolor: '#333' } }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} />
                : step === STEPS.length - 1 ? '가입 완료' : '다음'}
            </Button>
          </Box>
        </Box>

        <Typography sx={{ color: '#bbb', fontSize: '0.8rem', textAlign: 'center', mt: 3 }}>
          이미 계정이 있으신가요?{' '}
          <Link component="button" onClick={() => navigate('/login')}
            sx={{ color: '#A68966', textDecoration: 'none', cursor: 'pointer', background: 'none', border: 'none', '&:hover': { textDecoration: 'underline' } }}>
            로그인
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}
