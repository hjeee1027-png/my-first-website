import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from '@mui/material'

const spicyLevel = (level) => {
  if (level === 0) return <Typography variant="caption" sx={{ color: '#9e9e9e' }}>순한맛</Typography>
  return (
    <Box sx={{ display: 'flex', gap: 0.3 }}>
      {Array.from({ length: level }, (_, i) => (
        <span key={i} style={{ fontSize: '0.9rem' }}>🌶️</span>
      ))}
    </Box>
  )
}

const MenuCard = ({ menu }) => {
  const { name, description, price, spicy, tag, emoji } = menu

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 32px rgba(229,57,53,0.18)',
        },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: 140,
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffccbc 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4.5rem',
        }}
      >
        {emoji}
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#212121' }}>
            {name}
          </Typography>
          {tag && (
            <Chip
              label={tag}
              size="small"
              sx={{
                backgroundColor: tag === '인기' ? '#e53935' : tag === '신메뉴' ? '#43a047' : '#ff6f00',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.7rem',
              }}
            />
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{ color: '#757575', mb: 1.5, lineHeight: 1.6, minHeight: 42 }}
        >
          {description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {spicyLevel(spicy)}
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#e53935', fontSize: '1.1rem' }}
          >
            {price.toLocaleString()}원
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MenuCard
