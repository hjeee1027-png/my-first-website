import { Box, Typography, Button, Paper, Divider, Checkbox, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function PopupConsent({ onClose }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <Box
      sx={{
        position: 'fixed', inset: 0, zIndex: 9999,
        bgcolor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(false) }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#0c121c',
          border: '1px solid rgba(166,137,102,0.4)',
          width: { xs: '90%', sm: 480 },
          maxHeight: '85vh',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => onClose(false)}
          sx={{ position: 'absolute', top: 12, right: 12, color: '#4A4A4A', '&:hover': { color: '#A68966' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* 상단 이미지 영역 */}
        <Box
          sx={{
            height: 180,
            background: 'linear-gradient(135deg, #0c121c 0%, #1a2744 50%, #0c121c 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            borderBottom: '1px solid rgba(166,137,102,0.2)',
          }}
        >
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.35em', color: '#fff', fontSize: '1.5rem', mb: 1 }}>
            VANTAGE
          </Typography>
          <Typography sx={{ color: '#A68966', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
            지평선 위에서, 기준 그 너머로
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1, fontWeight: 500 }}>
            마케팅 정보 수신 동의
          </Typography>
          <Typography variant="body2" sx={{ color: '#969696', lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
            VANTAGE는 회원님께 최신 차량 출시 소식, 특별 프로모션, 이벤트 및 시승 초대 등
            유익한 정보를 이메일·SMS·앱 푸시 알림을 통해 발송합니다.
            <br /><br />
            수신 동의는 언제든지 마이페이지에서 변경하실 수 있습니다.
          </Typography>

          <Divider sx={{ borderColor: 'rgba(74,74,74,0.3)', mb: 3 }} />

          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                sx={{ color: '#4A4A4A', '&.Mui-checked': { color: '#A68966' } }}
              />
            }
            label={
              <Typography sx={{ color: '#E1E1E1', fontSize: '0.875rem' }}>
                마케팅 정보 수신에 동의합니다 (선택)
              </Typography>
            }
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                if (agreed) {
                  localStorage.setItem('vantage_marketing_agreed', 'true')
                }
                onClose(false)
              }}
              sx={{
                bgcolor: '#A68966', color: '#0B0B0B',
                border: 'none',
                '&:hover': { bgcolor: '#c4a882' },
                py: 1.5, fontWeight: 600,
              }}
            >
              동의하기
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => onClose(true)}
              sx={{
                borderColor: '#4A4A4A', color: '#4A4A4A',
                '&:hover': { borderColor: '#E1E1E1', color: '#E1E1E1', bgcolor: 'transparent' },
                py: 1.5,
              }}
            >
              더 이상 보지 않기
            </Button>
          </Box>

          <Button
            fullWidth
            onClick={() => onClose(false)}
            sx={{ mt: 1, color: '#4A4A4A', fontSize: '0.8rem', '&:hover': { color: '#969696' } }}
          >
            닫기
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
