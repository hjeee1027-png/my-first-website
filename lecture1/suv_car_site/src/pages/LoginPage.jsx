import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Divider, Link, Alert, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../utils/supabase'
import GoogleIcon from '@mui/icons-material/Google'
import AppleIcon from '@mui/icons-material/Apple'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return }
    setLoading(true); setError('')
    try {
      await signIn({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0B0B0B',
        display: 'flex',
        flexDirection: 'column',
        pt: '72px',
      }}
    >
      <Container maxWidth="xs" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 6 }}>
        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            sx={{ fontWeight: 900, letterSpacing: '0.35em', color: '#fff', fontSize: '2rem', mb: 1, fontFamily: '"Roboto", sans-serif' }}
          >
            VANTAGE
          </Typography>
          <Typography sx={{ color: '#4A4A4A', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
            로그인
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            bgcolor: '#0c121c',
            border: '1px solid rgba(74,74,74,0.3)',
            p: 4,
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(200,50,50,0.1)', color: '#ff6b6b', border: '1px solid rgba(200,50,50,0.3)', borderRadius: 0 }}>
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
              sx={{ color: '#4A4A4A', fontSize: '0.8rem', '&:hover': { color: '#A68966' }, textDecoration: 'none', cursor: 'pointer' }}
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
              bgcolor: '#A68966', color: '#0B0B0B',
              border: 'none',
              py: 1.8,
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              mb: 2,
              '&:hover': { bgcolor: '#c4a882' },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#0B0B0B' }} /> : '로그인'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/register')}
            sx={{ borderColor: 'rgba(74,74,74,0.5)', color: '#fff', py: 1.8, fontWeight: 500, letterSpacing: '0.1em', '&:hover': { borderColor: '#A68966', color: '#A68966' } }}
          >
            회원가입
          </Button>

          <Divider sx={{ my: 3, borderColor: 'rgba(74,74,74,0.3)' }}>
            <Typography sx={{ color: '#4A4A4A', fontSize: '0.75rem', px: 1 }}>또는 소셜 로그인</Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon sx={{ fontSize: '1.1rem !important' }} />}
              sx={{ borderColor: 'rgba(74,74,74,0.3)', color: '#969696', py: 1.3, '&:hover': { borderColor: '#A68966', color: '#A68966' }, fontSize: '0.8rem' }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AppleIcon sx={{ fontSize: '1.1rem !important' }} />}
              sx={{ borderColor: 'rgba(74,74,74,0.3)', color: '#969696', py: 1.3, '&:hover': { borderColor: '#A68966', color: '#A68966' }, fontSize: '0.8rem' }}
            >
              Apple
            </Button>
          </Box>
        </Box>

        <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem', textAlign: 'center', mt: 3 }}>
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
