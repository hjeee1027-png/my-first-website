import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'

const LOOKS = [
  {
    title: '에센셜 수트',
    desc: '시그니처 투 버튼 울 수트. 균형 잡힌 어깨선과 흠잡을 데 없는 드레이프.',
    image:
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '위켄드 리파인드',
    desc: '정장과 동일한 정밀함을 담은 스마트 캐주얼. 일상에도 품격을.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
]

const LookCard = ({ look }) => (
  <Box
    sx={{
      flex: 1,
      cursor: 'pointer',
      '&:hover .look-img': { transform: 'scale(1.04)' },
      '&:hover .look-overlay': { opacity: 1 },
    }}
  >
    <Box
      sx={{
        overflow: 'hidden',
        mb: 3,
        position: 'relative',
      }}
    >
      <Box
        className="look-img"
        sx={{
          height: { xs: 340, md: 520 },
          backgroundImage: `url(${look.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          transition: 'transform 0.6s ease',
        }}
      />
      <Box
        className="look-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(27,42,74,0.52)',
          opacity: 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            border: '1px solid #E8DCC8',
            px: 3.5,
            py: 1.3,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              color: '#E8DCC8',
            }}
          >
            이 룩 쇼핑하기
          </Typography>
        </Box>
      </Box>
    </Box>

    <Typography
      sx={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: '1.15rem',
        color: '#1B2A4A',
        mb: 1,
        letterSpacing: '0.02em',
      }}
    >
      {look.title}
    </Typography>
    <Typography
      sx={{
        fontSize: '0.85rem',
        color: '#7A8A9E',
        lineHeight: 1.8,
      }}
    >
      {look.desc}
    </Typography>
  </Box>
)

const BestPicksSection = () => (
  <Box sx={{ backgroundColor: '#F0EBE1', py: 11 }}>
    <Container maxWidth="lg">
      {/* 헤더 */}
      <Box sx={{ textAlign: 'center', mb: 7.5 }}>
        <Typography
          sx={{
            fontSize: '0.62rem',
            letterSpacing: '0.3em',
            color: '#8A96A8',
            mb: 1.5,
            textTransform: 'uppercase',
          }}
        >
          — 큐레이티드 룩
        </Typography>
        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '2.1rem',
            fontWeight: 400,
            color: '#1B2A4A',
            letterSpacing: '0.02em',
          }}
        >
          스타일 에디트
        </Typography>
      </Box>

      {/* 룩 카드 */}
      <Box sx={{ display: 'flex', gap: { xs: 3, md: 5 }, flexDirection: { xs: 'column', md: 'row' } }}>
        {LOOKS.map((look) => (
          <LookCard key={look.title} look={look} />
        ))}
      </Box>

      {/* CTA */}
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Button
          disableElevation
          disableRipple
          sx={{
            backgroundColor: '#1B2A4A',
            color: '#E8DCC8',
            borderRadius: 0,
            px: 6.5,
            py: 1.9,
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            fontWeight: 600,
            '&:hover': { backgroundColor: '#243355' },
            transition: 'background-color 0.2s',
          }}
        >
          전체 컬렉션 보기
        </Button>
      </Box>
    </Container>
  </Box>
)

export default BestPicksSection
