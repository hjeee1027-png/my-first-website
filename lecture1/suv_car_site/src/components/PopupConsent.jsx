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
        bgcolor: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(false) }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#fff',
          border: '1px solid #e0e0e0',
          width: { xs: '90%', sm: 480 },
          maxHeight: '85vh',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => onClose(false)}
          sx={{ position: 'absolute', top: 12, right: 12, color: '#999', '&:hover': { color: '#A68966' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* 상단 헤더 */}
        <Box
          sx={{
            height: 180,
            background: 'linear-gradient(135deg, #f9f6f2 0%, #ede8e0 50%, #f9f6f2 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            borderBottom: '1px solid #e8e0d6',
          }}
        >
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.35em', color: '#111', fontSize: '1.5rem', mb: 1 }}>
            VANTAGE
          </Typography>
          <Typography sx={{ color: '#A68966', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
            지평선 위에서, 기준 그 너머로
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ color: '#111', mb: 1, fontWeight: 600, fontSize: '1rem' }}>
            마케팅 정보 수신 동의
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
            VANTAGE는 회원님께 최신 차량 출시 소식, 특별 프로모션, 이벤트 및 시승 초대 등
            유익한 정보를 이메일·SMS·앱 푸시 알림을 통해 발송합니다.
            <br /><br />
            수신 동의는 언제든지 마이페이지에서 변경하실 수 있습니다.
          </Typography>

          <Divider sx={{ borderColor: '#e0e0e0', mb: 3 }} />

          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                sx={{ color: '#ccc', '&.Mui-checked': { color: '#A68966' } }}
              />
            }
            label={
              <Typography sx={{ color: '#333', fontSize: '0.875rem' }}>
                마케팅 정보 수신에 동의합니다 (선택)
              </Typography>
            }
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                if (agreed) localStorage.setItem('vantage_marketing_agreed', 'true')
                onClose(false)
              }}
              sx={{
                bgcolor: '#A68966', color: '#fff',
                border: 'none',
                '&:hover': { bgcolor: '#96795a' },
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
                borderColor: '#e0e0e0', color: '#666',
                '&:hover': { borderColor: '#111', color: '#111', bgcolor: 'transparent' },
                py: 1.5,
              }}
            >
              더 이상 보지 않기
            </Button>
          </Box>

          <Button
            fullWidth
            onClick={() => onClose(false)}
            sx={{ mt: 1, color: '#bbb', fontSize: '0.8rem', '&:hover': { color: '#666', bgcolor: 'transparent' } }}
          >
            닫기
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
