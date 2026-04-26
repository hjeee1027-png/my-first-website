import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress, Stepper, Step, StepLabel, Checkbox, FormControlLabel, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../utils/supabase'

const STEPS = ['기본 정보', '연락처', '약관 동의']

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    email: '', password: '', passwordConfirm: '',
    username: '', display_name: '', phone: '',
    address: '', address_detail: '', zip_code: '',
    agree_terms: false, agree_privacy: false, agree_marketing: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const setCheck = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }))

  const validateStep = () => {
    if (step === 0) {
      if (!form.email) return '이메일을 입력해주세요.'
      if (!form.email.includes('@')) return '올바른 이메일 형식을 입력해주세요.'
      if (!form.password) return '비밀번호를 입력해주세요.'
      if (form.password.length < 8) return '비밀번호는 8자 이상이어야 합니다.'
      if (form.password !== form.passwordConfirm) return '비밀번호가 일치하지 않습니다.'
      if (!form.username) return '아이디를 입력해주세요.'
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
    setLoading(true); setError('')
    try {
      await signUp({
        email: form.email,
        password: form.password,
        username: form.username,
        phone: form.phone,
        display_name: form.display_name,
      })
      navigate('/login', { state: { message: '회원가입이 완료되었습니다. 이메일 인증 후 로그인해주세요.' } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B0B0B', display: 'flex', flexDirection: 'column', pt: '72px' }}>
      <Container maxWidth="sm" sx={{ flex: 1, py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.35em', color: '#fff', fontSize: '2rem', mb: 1 }}>
            VANTAGE
          </Typography>
          <Typography sx={{ color: '#4A4A4A', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
            회원가입
          </Typography>
        </Box>

        {/* 스텝 인디케이터 */}
        <Stepper activeStep={step} sx={{ mb: 5 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    '&.Mui-active': { color: '#A68966' },
                    '&.Mui-completed': { color: '#A68966' },
                    color: '#4A4A4A',
                  }
                }}
                sx={{ '.MuiStepLabel-label': { color: '#4A4A4A', '&.Mui-active': { color: '#fff' }, '&.Mui-completed': { color: '#A68966' } } }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ bgcolor: '#0c121c', border: '1px solid rgba(74,74,74,0.3)', p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(200,50,50,0.1)', color: '#ff6b6b', border: '1px solid rgba(200,50,50,0.3)', borderRadius: 0 }}>
              {error}
            </Alert>
          )}

          {/* 스텝 0: 기본 정보 */}
          {step === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField fullWidth label="이메일 *" type="email" value={form.email} onChange={set('email')} />
              <TextField fullWidth label="아이디 *" value={form.username} onChange={set('username')} helperText="영문 소문자, 숫자 6-20자" FormHelperTextProps={{ sx: { color: '#4A4A4A' } }} />
              <TextField fullWidth label="이름(실명) *" value={form.display_name} onChange={set('display_name')} />
              <TextField fullWidth label="비밀번호 *" type="password" value={form.password} onChange={set('password')} helperText="영문+숫자+특수문자 8자 이상" FormHelperTextProps={{ sx: { color: '#4A4A4A' } }} />
              <TextField fullWidth label="비밀번호 확인 *" type="password" value={form.passwordConfirm} onChange={set('passwordConfirm')} error={form.passwordConfirm !== '' && form.password !== form.passwordConfirm} helperText={form.passwordConfirm !== '' && form.password !== form.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : ''} FormHelperTextProps={{ sx: { color: '#ff6b6b' } }} />
            </Box>
          )}

          {/* 스텝 1: 연락처 */}
          {step === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField fullWidth label="휴대폰 번호 *" value={form.phone} onChange={set('phone')} placeholder="010-0000-0000" />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField fullWidth label="우편번호" value={form.zip_code} onChange={set('zip_code')} />
                <Button
                  variant="outlined"
                  sx={{ borderColor: '#4A4A4A', color: '#4A4A4A', whiteSpace: 'nowrap', px: 2, '&:hover': { borderColor: '#A68966', color: '#A68966' } }}
                >
                  주소 검색
                </Button>
              </Box>
              <TextField fullWidth label="주소" value={form.address} onChange={set('address')} />
              <TextField fullWidth label="상세 주소" value={form.address_detail} onChange={set('address_detail')} />
            </Box>
          )}

          {/* 스텝 2: 약관 */}
          {step === 2 && (
            <Box>
              <FormControlLabel
                sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}
                control={
                  <Checkbox checked={form.agree_terms && form.agree_privacy && form.agree_marketing} onChange={(e) => setForm(f => ({ ...f, agree_terms: e.target.checked, agree_privacy: e.target.checked, agree_marketing: e.target.checked }))} sx={{ color: '#4A4A4A', '&.Mui-checked': { color: '#A68966' }, pt: 0 }} />
                }
                label={<Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>전체 동의</Typography>}
              />
              <Box sx={{ borderLeft: '2px solid rgba(74,74,74,0.3)', pl: 2, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                {[
                  { key: 'agree_terms', label: '[필수] 이용약관 동의' },
                  { key: 'agree_privacy', label: '[필수] 개인정보 수집 및 이용 동의' },
                  { key: 'agree_marketing', label: '[선택] 마케팅 정보 수신 동의' },
                ].map(item => (
                  <Box key={item.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                      control={<Checkbox checked={form[item.key]} onChange={setCheck(item.key)} size="small" sx={{ color: '#4A4A4A', '&.Mui-checked': { color: '#A68966' } }} />}
                      label={<Typography sx={{ color: '#969696', fontSize: '0.875rem' }}>{item.label}</Typography>}
                    />
                    <Link href="#" sx={{ color: '#4A4A4A', fontSize: '0.75rem', textDecoration: 'none', '&:hover': { color: '#A68966' } }}>보기</Link>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* 버튼 */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {step > 0 && (
              <Button
                variant="outlined"
                onClick={() => { setStep(s => s - 1); setError('') }}
                sx={{ borderColor: '#4A4A4A', color: '#fff', py: 1.5, flex: 1, '&:hover': { borderColor: '#A68966', color: '#A68966' } }}
              >
                이전
              </Button>
            )}
            <Button
              variant="contained"
              onClick={step === STEPS.length - 1 ? handleSubmit : handleNext}
              disabled={loading}
              sx={{ bgcolor: '#A68966', color: '#0B0B0B', border: 'none', py: 1.5, flex: 2, fontWeight: 700, '&:hover': { bgcolor: '#c4a882' } }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#0B0B0B' }} /> : step === STEPS.length - 1 ? '가입하기' : '다음'}
            </Button>
          </Box>
        </Box>

        <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem', textAlign: 'center', mt: 3 }}>
          이미 계정이 있으신가요?{' '}
          <Link component="button" onClick={() => navigate('/login')} sx={{ color: '#A68966', textDecoration: 'none', cursor: 'pointer', background: 'none', border: 'none', '&:hover': { textDecoration: 'underline' } }}>
            로그인
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}
