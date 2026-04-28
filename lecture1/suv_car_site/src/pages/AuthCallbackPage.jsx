import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { supabase } from '../utils/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      if (code) {
        // PKCE flow: code를 세션으로 교환
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          setError('인증에 실패했습니다. 다시 시도해주세요.')
          setTimeout(() => navigate('/login'), 3000)
          return
        }
      }

      // 해시 기반 토큰 처리 (implicit flow fallback)
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        // onAuthStateChange가 자동으로 처리함
        await new Promise(r => setTimeout(r, 500))
      }

      // ?next=register이면 회원가입 페이지로 복귀 (이메일 인증 완료 감지용)
      const next = params.get('next')
      if (next === 'register') {
        navigate('/register', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }

    handleCallback()
  }, [navigate])

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8f8f8', gap: 2 }}>
        <Typography sx={{ color: '#c00', fontSize: '1rem' }}>{error}</Typography>
        <Typography sx={{ color: '#888', fontSize: '0.875rem' }}>로그인 페이지로 이동합니다...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8f8f8', gap: 2 }}>
      <CircularProgress sx={{ color: '#A68966' }} />
      <Typography sx={{ color: '#888', fontSize: '0.875rem' }}>이메일 인증 처리 중...</Typography>
    </Box>
  )
}
