import React from 'react'
import { Box, Typography, Container, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const HeroSection = () => (
  <Box
    sx={{
      backgroundColor: '#1B2A4A',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
      <Typography
        variant="caption"
        sx={{
          color: '#E8DCC8',
          letterSpacing: '0.2em',
          display: 'block',
          mb: 3,
        }}
      >
        Welcome
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: '#FAF7F2',
          fontSize: { xs: '2.2rem', md: '3.5rem' },
          fontWeight: 300,
          lineHeight: 1.2,
          mb: 3,
        }}
      >
        여기는 Hero 섹션입니다.
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: '#A8B4C4', mb: 5, fontSize: '1.05rem' }}
      >
        메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
      </Typography>
      <Button
        component={Link}
        to="/about"
        sx={{
          borderColor: '#E8DCC8',
          color: '#E8DCC8',
          px: 5,
          py: 1.5,
          '&:hover': { backgroundColor: '#E8DCC8', color: '#1B2A4A' },
        }}
      >
        About Me
      </Button>
    </Container>
  </Box>
)

export default HeroSection
