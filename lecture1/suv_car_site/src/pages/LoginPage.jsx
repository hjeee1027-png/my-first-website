import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Divider, Link, Alert, CircularProgress } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { signIn, supabase } from '../utils/supabase'
import GoogleIcon from '@mui/icons-material/Google'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.message || ''

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return }
    setLoading(true); setError('')
    try {
      await signIn({ email, password })
      navigate('/')
    } catch (err) {
      const msg = err.message
      if (msg === 'Invalid login credentials') {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else if (msg === 'Email not confirmed') {
        setError('이메일 인증이 완료되지 않았습니다. 받은 편지함에서 인증 메일을 확인해주세요.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const base = import.meta.env.BASE_URL || '/'
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}${base}auth/callback` },
      })
      if (error) throw error
    } catch {
      setError('Google 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8f8f8',
        display: 'flex',
        flexDirection: 'column',
        pt: '72px',
      }}
    >
      <Container maxWidth="xs" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 6 }}>
        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            sx={{ fontWeight: 900, letterSpacing: '0.35em', color: '#111', fontSize: '2rem', mb: 1, fontFamily: '"Roboto", sans-serif' }}
          >
            VANTAGE
          </Typography>
          <Typography sx={{ color: '#888', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
            로그인
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            bgcolor: '#fff',
            border: '1px solid #e0e0e0',
            p: 4,
          }}
        >
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 0 }}>
              {successMessage}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 0 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2.5 }}
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1.5 }}
            autoComplete="current-password"
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Link
              component="button"
              type="button"
              onClick={() => {}}
              sx={{ color: '#888', fontSize: '0.8rem', '&:hover': { color: '#A68966' }, textDecoration: 'none', cursor: 'pointer' }}
            >
              아이디/비밀번호 찾기
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: '#111', color: '#fff',
              border: 'none',
              py: 1.8,
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              mb: 2,
              '&:hover': { bgcolor: '#333' },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : '로그인'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/register')}
            sx={{ borderColor: '#e0e0e0', color: '#111', py: 1.8, fontWeight: 500, letterSpacing: '0.1em', '&:hover': { borderColor: '#111' } }}
          >
            회원가입
          </Button>

          <Divider sx={{ my: 3, borderColor: '#e0e0e0' }}>
            <Typography sx={{ color: '#bbb', fontSize: '0.75rem', px: 1 }}>또는 소셜 로그인</Typography>
          </Divider>

          {/* 구글 로그인 */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon sx={{ fontSize: '1.1rem !important' }} />}
            onClick={handleGoogleLogin}
            sx={{
              borderColor: '#e0e0e0', color: '#444',
              py: 1.3,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              '&:hover': { borderColor: '#aaa', bgcolor: '#fafafa' },
            }}
          >
            Google로 로그인
          </Button>
        </Box>

        <Typography sx={{ color: '#bbb', fontSize: '0.8rem', textAlign: 'center', mt: 3 }}>
          로그인 시{' '}
          <Link href="#" sx={{ color: '#A68966', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>이용약관</Link>
          {' '}및{' '}
          <Link href="#" sx={{ color: '#A68966', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>개인정보처리방침</Link>
          에 동의합니다.
        </Typography>
      </Container>
    </Box>
  )
}
