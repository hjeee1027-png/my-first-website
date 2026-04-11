import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Paper, Alert, Grid
} from '@mui/material'
import { supabase } from '../supabase.js'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', nickname: '', email: '', password: '', phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = await supabase
      .from('users')
      .insert([{
        name: form.name,
        nickname: form.nickname,
        email: form.email,
        password: form.password,
        phone: form.phone,
      }])

    setLoading(false)

    if (err) {
      if (err.message.includes('unique')) {
        setError('이미 사용 중인 이메일 또는 닉네임이에요.')
      } else {
        setError('회원가입에 실패했어요. 다시 시도해주세요.')
      }
      return
    }

    navigate('/login')
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6BCB77 0%, #FFD93D 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}>
      <Paper elevation={0} sx={{
        borderRadius: 4,
        p: { xs: 3, sm: 5 },
        maxWidth: 480,
        width: '100%',
        boxShadow: '0 8px 40px rgba(92,61,0,0.12)',
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 800, color: '#5C3D00', mb: 0.5, textAlign: 'center'
        }}>
          회원가입
        </Typography>
        <Typography variant="body2" sx={{
          color: '#8B6914', mb: 4, textAlign: 'center'
        }}>
          마이냥멍 가족이 되어요!
        </Typography>

        <Box component="form" onSubmit={handleRegister}>
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="이름" name="name"
                value={form.name} onChange={handleChange} required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="닉네임" name="nickname"
                value={form.nickname} onChange={handleChange} required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="이메일" name="email" type="email"
                value={form.email} onChange={handleChange} required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="비밀번호" name="password" type="password"
                value={form.password} onChange={handleChange} required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="전화번호" name="phone"
                value={form.phone} onChange={handleChange}
                placeholder="010-0000-0000"
              />
            </Grid>
          </Grid>

          <Button
            type="submit" fullWidth variant="contained"
            disabled={loading}
            sx={{
              mt: 3, py: 1.5, fontSize: '1.05rem',
              background: 'linear-gradient(90deg, #FFD93D, #6BCB77)',
              color: '#5C3D00',
              '&:hover': { background: 'linear-gradient(90deg, #ffc800, #5ab868)' },
            }}
          >
            {loading ? '가입 중...' : '가입하기'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#8B6914' }}>
              이미 계정이 있으신가요?{' '}
              <Link to="/login" style={{ color: '#5C3D00', fontWeight: 700 }}>
                로그인
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default RegisterPage
