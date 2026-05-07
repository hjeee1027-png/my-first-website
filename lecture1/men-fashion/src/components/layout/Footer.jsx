import React from 'react'
import { Box, Typography, Container, Grid, Divider } from '@mui/material'

const FOOTER_NAV = {
  컬렉션: ['2026 SS', '2025 FW', '아카이브', '룩북'],
  서비스: ['사이즈 가이드', '배송 및 반품', '매장 찾기', '고객센터'],
  브랜드: ['브랜드 스토리', '장인 정신', '지속가능성', '채용'],
}

const Footer = () => (
  <Box sx={{ backgroundColor: '#0E1A2E', pt: 9, pb: 4 }}>
    <Container maxWidth="lg">
      <Grid container spacing={6} sx={{ mb: 8 }}>
        {/* 브랜드 소개 */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: '1.5rem',
                letterSpacing: '0.35em',
                color: '#E8DCC8',
              }}
            >
              NORD
            </Typography>
            <Typography
              sx={{
                fontSize: '0.58rem',
                letterSpacing: '0.35em',
                color: '#3A4E6A',
                mt: 0.3,
              }}
            >
              MAISON
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.82rem',
              color: '#4A5E78',
              lineHeight: 2,
              maxWidth: 280,
            }}
          >
            정밀한 테일러링과 영원한 우아함을 통해 현대 남성복을 재정의합니다.
          </Typography>

          {/* SNS 링크 */}
          <Box sx={{ display: 'flex', gap: 2.5, mt: 3.5 }}>
            {['인스타그램', '핀터레스트', '카카오'].map((sns) => (
              <Typography
                key={sns}
                component="a"
                href="#"
                sx={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: '#3A4E6A',
                  textDecoration: 'none',
                  '&:hover': { color: '#E8DCC8' },
                  transition: 'color 0.2s',
                }}
              >
                {sns}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* 링크 컬럼들 */}
        {Object.entries(FOOTER_NAV).map(([title, links]) => (
          <Grid item xs={6} md={2} key={title}>
            <Typography
              sx={{
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                color: '#E8DCC8',
                mb: 3,
              }}
            >
              {title}
            </Typography>
            {links.map((link) => (
              <Typography
                key={link}
                component="a"
                href="#"
                sx={{
                  display: 'block',
                  fontSize: '0.8rem',
                  color: '#4A5E78',
                  mb: 1.4,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  '&:hover': { color: '#C8D0D8' },
                  transition: 'color 0.2s',
                }}
              >
                {link}
              </Typography>
            ))}
          </Grid>
        ))}

        {/* 뉴스레터 */}
        <Grid item xs={12} md={4}>
          <Typography
            sx={{
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              color: '#E8DCC8',
              mb: 3,
            }}
          >
            뉴스레터
          </Typography>
          <Typography
            sx={{
              fontSize: '0.82rem',
              color: '#4A5E78',
              mb: 3,
              lineHeight: 1.9,
            }}
          >
            신상품, 독점 혜택, 에디토리얼 콘텐츠를 이메일로 받아보세요.
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Box
              component="input"
              placeholder="이메일 주소 입력"
              sx={{
                flex: 1,
                border: 'none',
                borderBottom: '1px solid #2C3E5A',
                backgroundColor: 'transparent',
                color: '#C8D0D8',
                px: 0,
                py: 1.2,
                fontSize: '0.8rem',
                outline: 'none',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                '&::placeholder': { color: '#2C3E5A' },
              }}
            />
            <Box
              component="button"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid #2C3E5A',
                color: '#8A96A8',
                px: 2,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                '&:hover': { color: '#E8DCC8', borderBottomColor: '#E8DCC8' },
                transition: 'all 0.2s',
              }}
            >
              구독 →
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: '#1A2A40', mb: 3.5 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          sx={{ fontSize: '0.7rem', color: '#2C3E5A', letterSpacing: '0.04em' }}
        >
          © 2026 NORD MAISON. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['개인정보처리방침', '이용약관', '사업자 정보'].map((item) => (
            <Typography
              key={item}
              component="a"
              href="#"
              sx={{
                fontSize: '0.7rem',
                color: '#2C3E5A',
                textDecoration: 'none',
                '&:hover': { color: '#8A96A8' },
                transition: 'color 0.2s',
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
)

export default Footer
