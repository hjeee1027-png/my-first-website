import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

const ProcessStep = ({ step, index, isLast }) => {
  const { emoji, title, description, detail, color } = step

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
        alignItems: 'center',
        gap: { xs: 3, md: 6 },
        mb: isLast ? 0 : { xs: 6, md: 10 },
        position: 'relative',
      }}
    >
      {/* 이모지 + 번호 원형 */}
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: 120, md: 160 },
          height: { xs: 120, md: 160 },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}33 0%, ${color}88 100%)`,
          border: `4px solid ${color}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 8px 32px ${color}44`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, lineHeight: 1 }}>
          {emoji}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: -12,
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem' }}>
            {String(index + 1).padStart(2, '0')}
          </Typography>
        </Box>
      </Box>

      {/* 설명 카드 */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: `1.5px solid ${color}33`,
          backgroundColor: '#fff',
          boxShadow: `0 4px 24px ${color}18`,
          transition: 'transform 0.25s, box-shadow 0.25s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 40px ${color}30`,
          },
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: color, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem' }}
        >
          STEP {String(index + 1).padStart(2, '0')}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: '#212121', mt: 0.5, mb: 1.5, fontSize: { xs: '1.4rem', md: '1.8rem' } }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#616161', lineHeight: 1.8, mb: 2 }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: `${color}0d`,
            borderLeft: `3px solid ${color}`,
          }}
        >
          <Typography variant="body2" sx={{ color: '#424242', fontStyle: 'italic', lineHeight: 1.7 }}>
            💡 {detail}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default ProcessStep
