import React from 'react'
import { Box, Typography, Button, Container, Grid } from '@mui/material'

const PRODUCTS = [
  {
    name: '밀라노 울 수트',
    category: '투피스 수트',
    price: '₩ 890,000',
    tag: '신상',
    image:
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: '미드나잇 캐시미어 코트',
    category: '아우터',
    price: '₩ 1,240,000',
    tag: '베스트',
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: '메리노 슬림 트라우저',
    category: '하의',
    price: '₩ 380,000',
    tag: '신상',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4a8a?auto=format&fit=crop&w=600&q=80',
  },
]

const ProductCard = ({ product }) => (
  <Box
    sx={{
      cursor: 'pointer',
      '&:hover .img-inner': { transform: 'scale(1.05)' },
      '&:hover .quick-shop': { opacity: 1 },
    }}
  >
    {/* 이미지 영역 */}
    <Box sx={{ overflow: 'hidden', mb: 2.5, position: 'relative' }}>
      {product.tag && (
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            zIndex: 1,
            backgroundColor: product.tag === 'BESTSELLER' ? '#E8DCC8' : '#1B2A4A',
            color: product.tag === 'BESTSELLER' ? '#1B2A4A' : '#E8DCC8',
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            fontWeight: 700,
            px: 1.5,
            py: 0.6,
          }}
        >
          {product.tag}
        </Box>
      )}
      <Box
        className="img-inner"
        sx={{
          height: 420,
          backgroundImage: `url(${product.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          transition: 'transform 0.55s ease',
        }}
      />
      {/* Quick Shop 오버레이 */}
      <Box
        className="quick-shop"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(27,42,74,0.88)',
          py: 1.5,
          display: 'flex',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.25s',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            color: '#E8DCC8',
          }}
        >
          빠른 구매
        </Typography>
      </Box>
    </Box>

    {/* 텍스트 */}
    <Typography
      sx={{
        fontSize: '0.62rem',
        letterSpacing: '0.22em',
        color: '#8A96A8',
        mb: 0.6,
        textTransform: 'uppercase',
      }}
    >
      {product.category}
    </Typography>
    <Typography
      sx={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: '1.05rem',
        color: '#1B2A4A',
        mb: 0.6,
        letterSpacing: '0.02em',
      }}
    >
      {product.name}
    </Typography>
    <Typography sx={{ fontSize: '0.85rem', color: '#6B7A90', letterSpacing: '0.04em' }}>
      {product.price}
    </Typography>
  </Box>
)

const NewArrivalsSection = () => (
  <Box sx={{ backgroundColor: '#FAF7F2', py: 11 }}>
    <Container maxWidth="lg">
      {/* 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          mb: 7,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '0.62rem',
              letterSpacing: '0.28em',
              color: '#8A96A8',
              mb: 1.2,
              textTransform: 'uppercase',
            }}
          >
            — 2026 SS
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
            신상품
          </Typography>
        </Box>
        <Button
          disableRipple
          sx={{
            color: '#1B2A4A',
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            borderBottom: '1px solid #1B2A4A',
            borderRadius: 0,
            pb: 0.4,
            px: 0,
            minWidth: 0,
            '&:hover': { backgroundColor: 'transparent', opacity: 0.55 },
          }}
        >
          전체 보기 →
        </Button>
      </Box>

      {/* 상품 그리드 */}
      <Grid container spacing={4}>
        {PRODUCTS.map((product) => (
          <Grid item xs={12} md={4} key={product.name}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
)

export default NewArrivalsSection
