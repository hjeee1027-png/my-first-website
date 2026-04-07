import React from 'react'
import { Box, Typography, Divider, Grid, Paper } from '@mui/material'

const hoverCards = [
  {
    label: '색상 변화',
    desc: '배경색이 전환됩니다',
    sx: {
      backgroundColor: '#e3f2fd',
      transition: 'background-color 0.3s',
      '&:hover': { backgroundColor: '#1976d2', color: '#fff' },
    },
  },
  {
    label: '크기 확대',
    desc: '카드가 커집니다',
    sx: {
      transition: 'transform 0.25s',
      '&:hover': { transform: 'scale(1.08)' },
    },
  },
  {
    label: '그림자 강조',
    desc: '그림자가 깊어집니다',
    sx: {
      boxShadow: 2,
      transition: 'box-shadow 0.25s',
      '&:hover': { boxShadow: 12 },
    },
  },
  {
    label: '위로 이동',
    desc: '카드가 떠오릅니다',
    sx: {
      transition: 'transform 0.25s, box-shadow 0.25s',
      '&:hover': { transform: 'translateY(-10px)', boxShadow: 8 },
    },
  },
  {
    label: '테두리 효과',
    desc: '테두리가 나타납니다',
    sx: {
      border: '2px solid transparent',
      transition: 'border-color 0.25s, color 0.25s',
      '&:hover': { borderColor: '#1976d2', color: '#1976d2' },
    },
  },
  {
    label: '기울기',
    desc: '카드가 기울어집니다',
    sx: {
      transition: 'transform 0.25s',
      '&:hover': { transform: 'rotate(-3deg) scale(1.04)' },
    },
  },
  {
    label: '밝기 변화',
    desc: '배경이 밝아집니다',
    sx: {
      backgroundColor: '#424242',
      color: '#fff',
      transition: 'filter 0.25s',
      '&:hover': { filter: 'brightness(1.5)' },
    },
  },
  {
    label: '글자 확대',
    desc: '텍스트가 커집니다',
    sx: {
      '& .hover-label': { transition: 'font-size 0.25s, color 0.25s' },
      '&:hover .hover-label': { fontSize: '1.3rem', color: '#1976d2' },
    },
  },
]

const Section15 = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 15 — Hover
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        {hoverCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                ...card.sx,
              }}
            >
              <Typography className="hover-label" variant="subtitle1" sx={{ fontWeight: 700 }}>
                {card.label}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {card.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'text.secondary' }}>
        * 각 카드에 마우스를 올려 효과를 확인하세요.
      </Typography>
    </Box>
  )
}

export default Section15
