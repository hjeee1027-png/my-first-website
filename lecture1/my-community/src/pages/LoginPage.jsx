import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Paper, Alert
} from '@mui/material'
import { supabase } from '../supabase.js'
import { useAuth } from '../contexts/AuthContext.jsx'

// 노란+연두 하트 로고 SVG
const HeartLogo = () => (
  <svg width="90" height="80" viewBox="0 0 90 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 70 C45 70 5 45 5 22 C5 10 15 2 27 5 C35 7 42 13 45 18 C48 13 55 7 63 5 C75 2 85 10 85 22 C85 45 45 70 45 70Z"
      fill="#FFD93D" />
    <path d="M45 70 C45 70 5 45 5 22 C5 10 15 2 27 5 C35 7 42 13 45 18 L45 70Z"
      fill="#6BCB77" opacity="0.85" />
    <text x="30" y="42" fontSize="22" fontWeight="bold" fill="#5C3D00">냥멍</text>
  </svg>
)

// 강아지 캐릭터 SVG
const DogCharacter = () => (
  <Box sx={{ position: 'relative', display: 'inline-block', mt: 1 }}>
    {/* 말풍선 */}
    <Box sx={{
      background: '#fff',
      border: '2px solid #FFD93D',
      borderRadius: '16px',
      px: 2, py: 1,
      mb: 1,
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '12px 8px 0',
        borderStyle: 'solid',
        borderColor: '#FFD93D transparent transparent',
      }
    }}>
      <Typography variant="body2" sx={{ color: '#5C3D00', fontWeight: 600, fontSize: '0.8rem' }}>
        아이디가 없다면 회원가입 진행할까요?
      </Typography>
    </Box>
    {/* 강아지 얼굴 */}
    <svg width="90" height="80" viewBox="0 0 90 80" xmlns="http://www.w3.org/2000/svg">
      {/* 귀 */}
      <ellipse cx="22" cy="28" rx="14" ry="18" fill="#C8A882" transform="rotate(-15 22 28)" />
      <ellipse cx="68" cy="28" rx="14" ry="18" fill="#C8A882" transform="rotate(15 68 28)" />
      {/* 얼굴 */}
      <ellipse cx="45" cy="45" rx="30" ry="28" fill="#E8C99A" />
      {/* 눈 */}
      <ellipse cx="34" cy="40" rx="5" ry="6" fill="#5C3D00" />
      <ellipse cx="56" cy="40" rx="5" ry="6" fill="#5C3D00" />
      <circle cx="35.5" cy="38.5" r="1.5" fill="white" />
      <circle cx="57.5" cy="38.5" r="1.5" fill="white" />
      {/* 코 */}
      <ellipse cx="45" cy="52" rx="7" ry="5" fill="#C8A882" />
      <ellipse cx="45" cy="51" rx="4" ry="3" fill="#5C3D00" />
      {/* 입 - 웃음 */}
      <path d="M38 57 Q45 64 52 57" stroke="#5C3D00" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="25" cy="52" rx="7" ry="4" fill="#FFB6C1" opacity="0.6" />
      <ellipse cx="65" cy="52" rx="7" ry="4" fill="#FFB6C1" opacity="0.6" />
    </svg>
  </Box>
)

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: err } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    setLoading(false)

    if (err || !data) {
      setError('이메일 또는 비밀번호가 올바르지 않아요.')
      return
    }

    login(data)
    navigate('/')
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFD93D 0%, #FFD93D 50%, #6BCB77 50%, #6BCB77 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}>
      <Paper elevation={0} sx={{
        borderRadius: 4,
        p: { xs: 3, sm: 5 },
        maxWidth: 420,
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 40px rgba(92,61,0,0.12)',
      }}>
        {/* 로고 */}
        <Box sx={{ mb: 1 }}>
          <HeartLogo />
        </Box>
        <Typography variant="h4" sx={{
          fontWeight: 800, color: '#5C3D00', mb: 0.5, letterSpacing: '-0.5px'
        }}>
          마이냥멍
        </Typography>
        <Typography variant="body2" sx={{ color: '#8B6914', mb: 3 }}>
          펫용품 & 정보 공유 커뮤니티
        </Typography>

        {/* 강아지 캐릭터 */}
        <DogCharacter />

        {/* 로그인 폼 */}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <TextField
            fullWidth label="이메일" type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            required sx={{ mb: 2 }}
            placeholder="example@naver.com"
          />
          <TextField
            fullWidth label="비밀번호" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            required sx={{ mb: 3 }}
          />

          <Button
            type="submit" fullWidth variant="contained"
            disabled={loading}
            sx={{
              py: 1.5, mb: 2, fontSize: '1.05rem',
              background: 'linear-gradient(90deg, #FFD93D, #6BCB77)',
              color: '#5C3D00',
              '&:hover': { background: 'linear-gradient(90deg, #ffc800, #5ab868)' },
            }}
          >
            {loading ? '로그인 중...' : '로그인하기'}
          </Button>

          <Button
            fullWidth variant="outlined"
            component={Link} to="/register"
            sx={{
              py: 1.5, borderColor: '#FFD93D', color: '#5C3D00',
              '&:hover': { borderColor: '#6BCB77', background: '#f9ffe8' },
            }}
          >
            회원가입
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
