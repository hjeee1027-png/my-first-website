import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function BannerSection() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        bgcolor: '#0a0e18',
      }}
    >
      {/* 배경 비디오 */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      >
        <source src={`${import.meta.env.BASE_URL}img/banner_video.mp4`} type="video/mp4" />
      </Box>

      {/* 어두운 오버레이 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* 텍스트 오버레이 */}
      <Container
        maxWidth={false}
        sx={{
          position: 'absolute',
          inset: 0,
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
          zIndex: 2,
        }}
      >
        <Box sx={{ maxWidth: 620 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.3em',
              fontSize: '0.7rem',
              display: 'block',
              mb: 2,
            }}
          >
            VANTAGE AUTOMOTIVE
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: { xs: '1.9rem', sm: '2.375rem', md: '2.375rem' },
              lineHeight: 1.2,
              letterSpacing: '0.02em',
              mb: 2.5,
            }}
          >
            세상의 기준을<br />
            <Box component="span" sx={{ color: '#A68966' }}>뛰어넘다</Box>
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.8,
              mb: 5,
              maxWidth: 440,
            }}
          >
            디자인부터 제작까지, 새로운 시야에서<br />기준 그 너머로
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/search')}
              sx={{
                bgcolor: '#A68966',
                color: '#fff',
                border: 'none',
                px: 5,
                py: 1.8,
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                '&:hover': { bgcolor: '#96795a' },
              }}
            >
              자세히 보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/reservation')}
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                px: 5,
                py: 1.8,
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                '&:hover': { borderColor: '#fff', bgcolor: 'transparent' },
              }}
            >
              시승 예약
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
