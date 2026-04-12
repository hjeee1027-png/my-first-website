import React from 'react'
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  IconButton,
  Stack,
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import FacebookIcon from '@mui/icons-material/Facebook'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const NAV_LINKS = ['메뉴', '소개', '예약', '공지사항', '오시는 길']

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a1a',
        color: '#e0e0e0',
        pt: 7,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>

          {/* 브랜드 영역 */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#fff',
                letterSpacing: 2,
                mb: 1.5,
              }}
            >
              🍽️ 맛의 거리
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                color: '#bbb',
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              매일 신선한 재료로 정성껏 만드는
              <br />
              우리 동네 대표 맛집
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton
                href="#"
                sx={{
                  color: '#bbb',
                  '&:hover': { color: '#E1306C', bgcolor: 'rgba(225,48,108,0.1)' },
                }}
              >
                <CameraAltIcon fontSize="medium" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  color: '#bbb',
                  '&:hover': { color: '#FF0000', bgcolor: 'rgba(255,0,0,0.1)' },
                }}
              >
                <OndemandVideoIcon fontSize="medium" />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  color: '#bbb',
                  '&:hover': { color: '#1877F2', bgcolor: 'rgba(24,119,242,0.1)' },
                }}
              >
                <FacebookIcon fontSize="medium" />
              </IconButton>
            </Stack>
          </Grid>

          {/* 빠른 링크 */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#fff',
                mb: 2.5,
                fontSize: '1rem',
              }}
            >
              바로가기
            </Typography>
            <Stack spacing={1.5}>
              {NAV_LINKS.map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href="#"
                  sx={{
                    color: '#bbb',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#ff8f00' },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* 매장 정보 */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#fff',
                mb: 2.5,
                fontSize: '1rem',
              }}
            >
              매장 정보
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationOnIcon sx={{ color: '#ff8f00', mt: 0.2, flexShrink: 0 }} />
                <Typography sx={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  서울특별시 마포구 홍대입구로 123
                  <br />
                  맛의거리 빌딩 1층
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ color: '#ff8f00', flexShrink: 0 }} />
                <Typography sx={{ color: '#bbb', fontSize: '0.95rem' }}>
                  02-1234-5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <AccessTimeIcon sx={{ color: '#ff8f00', mt: 0.2, flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ color: '#bbb', fontSize: '0.95rem' }}>
                    평일 · 주말  11:00 – 22:00
                  </Typography>
                  <Typography sx={{ color: '#888', fontSize: '0.85rem', mt: 0.5 }}>
                    매주 월요일 정기휴무
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#333', my: 5 }} />

        {/* 하단 카피라이트 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
            © 2024 맛의 거리. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {['개인정보처리방침', '이용약관'].map((item) => (
              <Typography
                key={item}
                component="a"
                href="#"
                sx={{
                  color: '#666',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  '&:hover': { color: '#bbb' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
