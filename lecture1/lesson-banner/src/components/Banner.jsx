import React, { useState, useEffect, useCallback } from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&auto=format&fit=crop',
    tag: '오늘의 베스트',
    title: '육즙 가득\n수제 버거',
    subtitle: '신선한 재료로 매일 직접 만드는\n우리만의 특별한 버거',
    cta: '지금 주문하기',
    color: '#ff6b35',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&auto=format&fit=crop',
    tag: '셰프 추천',
    title: '화덕에서 구운\n나폴리 피자',
    subtitle: '이탈리아 정통 방식 그대로\n얇고 바삭한 도우의 진수',
    cta: '메뉴 보기',
    color: '#e63946',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1400&auto=format&fit=crop',
    tag: '신메뉴 출시',
    title: '장인이 만드는\n프리미엄 스시',
    subtitle: '매일 아침 공수되는 신선한 생선으로\n정성껏 빚은 한 점 한 점',
    cta: '예약하기',
    color: '#2d6a4f',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=1400&auto=format&fit=crop',
    tag: '인기 메뉴',
    title: '크리미한\n트러플 파스타',
    subtitle: '이탈리아산 트러플과 생면으로 만든\n깊고 풍부한 맛의 파스타',
    cta: '자세히 보기',
    color: '#6d4c41',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1400&auto=format&fit=crop',
    tag: '디저트 특선',
    title: '달콤한 마무리\n시그니처 케이크',
    subtitle: '매일 매장에서 직접 구운\n촉촉하고 달콤한 수제 케이크',
    cta: '주문하기',
    color: '#c77dff',
  },
]

const Banner = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <Box
      sx={{ position: 'relative', width: '100%', height: { xs: '70vh', md: '90vh' }, overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 슬라이드 */}
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            opacity: index === current ? 1 : 0,
            transform: index === current ? 'scale(1)' : 'scale(1.04)',
          }}
        >
          {/* 어두운 그라디언트 오버레이 */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.05) 100%)',
            }}
          />
        </Box>
      ))}

      {/* 텍스트 콘텐츠 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 4, md: 10 },
          maxWidth: 680,
        }}
      >
        {/* 태그 */}
        <Box
          sx={{
            display: 'inline-block',
            px: 2,
            py: 0.5,
            mb: 2,
            borderRadius: 2,
            backgroundColor: slides[current].color,
            width: 'fit-content',
            transition: 'background-color 0.5s',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: 1 }}>
            {slides[current].tag}
          </Typography>
        </Box>

        {/* 제목 */}
        <Typography
          variant="h2"
          sx={{
            color: '#fff',
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            lineHeight: 1.2,
            mb: 2,
            whiteSpace: 'pre-line',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          {slides[current].title}
        </Typography>

        {/* 설명 */}
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.88)',
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            lineHeight: 1.8,
            mb: 4,
            whiteSpace: 'pre-line',
          }}
        >
          {slides[current].subtitle}
        </Typography>

        {/* CTA 버튼 */}
        <Button
          variant="contained"
          size="large"
          sx={{
            width: 'fit-content',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: '1rem',
            backgroundColor: slides[current].color,
            '&:hover': {
              backgroundColor: slides[current].color,
              filter: 'brightness(0.88)',
            },
            boxShadow: `0 4px 20px ${slides[current].color}88`,
            transition: 'all 0.3s',
          }}
        >
          {slides[current].cta}
        </Button>
      </Box>

      {/* 좌우 화살표 */}
      <IconButton
        onClick={prev}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.35)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={next}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.35)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* 하단 점 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: index === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === current ? slides[current].color : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </Box>

      {/* 슬라이드 번호 */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 28,
          right: { xs: 16, md: 32 },
          zIndex: 3,
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </Typography>
    </Box>
  )
}

export default Banner
