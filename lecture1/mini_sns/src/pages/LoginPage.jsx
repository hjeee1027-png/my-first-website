import React, { useState } from 'react'
import {
  Box, Typography, TextField, Button, Tab, Tabs, Alert,
  InputAdornment, IconButton, CircularProgress,
} from '@mui/material'
import { Visibility, VisibilityOff, SportsEsports } from '@mui/icons-material'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [tab, setTab] = useState(0)
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [regForm, setRegForm] = useState({
    email: '', phone: '', nickname: '', username: '', password: '', confirmPassword: '',
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    })
    if (error) setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    else navigate('/')
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!regForm.email || !regForm.username || !regForm.nickname || !regForm.password) {
      setError('모든 필수 항목을 입력해주세요.')
      setLoading(false)
      return
    }
    if (regForm.password !== regForm.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }
    if (regForm.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      setLoading(false)
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: regForm.email,
      password: regForm.password,
      options: {
        data: {
          username: regForm.username,
          display_name: regForm.nickname,
          phone: regForm.phone,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: insertError } = await supabase.from('sns_users').insert({
        id: data.user.id,
        email: regForm.email,
        username: regForm.username,
        display_name: regForm.nickname,
        phone: regForm.phone || '',
        avatar_url: '',
        bio: '',
      })

      if (insertError && insertError.code !== '23505') {
        setError('프로필 생성 중 오류가 발생했습니다.')
        setLoading(false)
        return
      }
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1a3a5c 0%, #427AB5 50%, #a8c8f0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}>
      {/* 로고 */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          <SportsEsports sx={{ fontSize: 40, color: '#FFEF91' }} />
          <Typography variant="h3" sx={{
            fontWeight: 900, color: '#FFEF91',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            letterSpacing: 3,
          }}>
            겜뷰
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', letterSpacing: 1 }}>
          게임 리뷰 커뮤니티
        </Typography>
      </Box>

      <Box sx={{
        width: '100%', maxWidth: 400,
        bgcolor: 'white', borderRadius: 4, p: 3,
        boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
      }}>
        <Tabs value={tab} onChange={(_, v) => { setTab(v); setError(''); setSuccess('') }} centered
          sx={{ mb: 2, '& .MuiTab-root': { fontWeight: 700 } }}>
          <Tab label="로그인" />
          <Tab label="회원가입" />
        </Tabs>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {tab === 0 ? (
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth label="이메일" type="email" margin="normal" required
              value={loginForm.email}
              onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
            />
            <TextField
              fullWidth label="비밀번호" margin="normal" required
              type={showPw ? 'text' : 'password'}
              value={loginForm.password}
              onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw(!showPw)} edge="end">
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit" fullWidth variant="contained" size="large" disabled={loading}
              sx={{ mt: 2, py: 1.5, fontSize: 16, background: 'linear-gradient(90deg, #427AB5, #5B93D3)' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleRegister}>
            <TextField fullWidth label="이메일 *" type="email" margin="dense"
              value={regForm.email} onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))} />
            <TextField fullWidth label="전화번호" margin="dense"
              value={regForm.phone} onChange={e => setRegForm(p => ({ ...p, phone: e.target.value }))} />
            <TextField fullWidth label="닉네임 (표시 이름) *" margin="dense"
              value={regForm.nickname} onChange={e => setRegForm(p => ({ ...p, nickname: e.target.value }))} />
            <TextField fullWidth label="아이디 (@고유 아이디) *" margin="dense"
              value={regForm.username} onChange={e => setRegForm(p => ({ ...p, username: e.target.value }))} />
            <TextField fullWidth label="비밀번호 * (6자 이상)" type="password" margin="dense"
              value={regForm.password} onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))} />
            <TextField fullWidth label="비밀번호 확인 *" type="password" margin="dense"
              value={regForm.confirmPassword} onChange={e => setRegForm(p => ({ ...p, confirmPassword: e.target.value }))} />
            <Button
              type="submit" fullWidth variant="contained" size="large" disabled={loading}
              sx={{ mt: 2, py: 1.5, fontSize: 16, background: 'linear-gradient(90deg, #427AB5, #5B93D3)' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : '가입하기'}
            </Button>
          </Box>
        )}
      </Box>

      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', mt: 3 }}>
        © 2026 겜뷰 · 게임 리뷰 커뮤니티
      </Typography>
    </Box>
  )
}

export default LoginPage
