import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'

const HeroSection = () => (
  <Box
    sx={{
      position: 'relative',
      height: { xs: 520, md: 680 },
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {/* 배경 이미지 */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        filter: 'brightness(0.38)',
      }}
    />
    {/* 좌→우 그라디언트 오버레이 */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(to right, rgba(27,42,74,0.72) 0%, rgba(27,42,74,0.08) 100%)',
      }}
    />

    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
      <Typography
        sx={{
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontSize: '0.68rem',
          letterSpacing: '0.35em',
          color: '#E8DCC8',
          mb: 2.5,
          textTransform: 'uppercase',
        }}
      >
        — 2026 SS 컬렉션
      </Typography>

      <Typography
        sx={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: { xs: '2.6rem', md: '4rem' },
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 1.18,
          mb: 3.5,
          maxWidth: 580,
          letterSpacing: '0.01em',
        }}
      >
        현대 신사를 위한<br />품격과 정제
      </Typography>

      <Typography
        sx={{
          fontSize: '0.88rem',
          color: '#B8C4D0',
          mb: 5.5,
          maxWidth: 400,
          lineHeight: 2,
          letterSpacing: '0.03em',
        }}
      >
        정밀한 테일러링과 현대적 디자인의 만남.<br />
        당신을 정의하는 수트를 만나보세요.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2.5 }}>
        <Button
          disableElevation
          disableRipple
          sx={{
            backgroundColor: '#E8DCC8',
            color: '#1B2A4A',
            borderRadius: 0,
            px: 4.5,
            py: 1.6,
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            fontWeight: 700,
            '&:hover': { backgroundColor: '#FFFFFF' },
            transition: 'background-color 0.2s',
          }}
        >
          컬렉션 보기
        </Button>
        <Button
          disableRipple
          sx={{
            borderColor: '#8A96A8',
            border: '1px solid',
            color: '#C8D0D8',
            borderRadius: 0,
            px: 4,
            py: 1.6,
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            '&:hover': {
              borderColor: '#E8DCC8',
              color: '#E8DCC8',
              backgroundColor: 'transparent',
            },
            transition: 'all 0.2s',
          }}
        >
          룩북
        </Button>
      </Box>
    </Container>

    {/* 하단 스크롤 힌트 */}
    <Box
      sx={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        opacity: 0.5,
      }}
    >
      <Typography sx={{ fontSize: '0.58rem', letterSpacing: '0.25em', color: '#E8DCC8' }}>
        스크롤
      </Typography>
      <Box sx={{ width: 1, height: 40, backgroundColor: '#E8DCC8', opacity: 0.6 }} />
    </Box>
  </Box>
)

export default HeroSection
