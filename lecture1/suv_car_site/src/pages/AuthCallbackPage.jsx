import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { supabase } from '../utils/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [showClose, setShowClose] = useState(false)

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          setError('인증에 실패했습니다. 다시 시도해주세요.')
          setTimeout(() => navigate('/login'), 3000)
          return
        }
      }

      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        await new Promise(r => setTimeout(r, 500))
      }

      if (localStorage.getItem('vantage_reg_pending')) {
        // 새 탭 닫기 시도 (이메일 클라이언트가 새 탭으로 열었을 때)
        window.close()
        // window.close()가 안 될 경우 안내 표시 후 /register로 이동
        setTimeout(() => {
          setShowClose(true)
          setTimeout(() => navigate('/register', { replace: true }), 2000)
        }, 300)
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

  if (showClose) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8f8f8', gap: 3 }}>
        <Typography sx={{ color: '#2e7d32', fontWeight: 700, fontSize: '1.1rem' }}>✓ 이메일 인증이 완료되었습니다</Typography>
        <Typography sx={{ color: '#888', fontSize: '0.875rem', textAlign: 'center' }}>
          이 창을 닫고 원래 회원가입 창으로 돌아가주세요.<br />잠시 후 자동으로 이동합니다.
        </Typography>
        <Button onClick={() => navigate('/register', { replace: true })}
          sx={{ bgcolor: '#111', color: '#fff', px: 4, py: 1.2, '&:hover': { bgcolor: '#333' } }}>
          회원가입 계속하기
        </Button>
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
