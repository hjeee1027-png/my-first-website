import { Box, Container, Typography, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'

export default function ReservationCTASection() {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: '#0B0B0B', py: { xs: 8, md: 12 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 배경 텍스트 워터마크 */}
        <Box sx={{ position: 'relative', textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: { xs: '4rem', md: '8rem' },
              fontWeight: 900,
              color: 'rgba(166,137,102,0.04)',
              letterSpacing: '0.2em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            VANTAGE
          </Typography>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
              EXPERIENCE
            </Typography>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
              지금 시작하세요
            </Typography>
            <Typography sx={{ color: '#969696', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
              반티지를 직접 경험해 보세요.<br />당신을 위한 자리가 준비되어 있습니다.
            </Typography>
          </Box>
        </Box>

        {/* 메인 CTA 버튼들 - 페르소나3 (액티브 시니어) 위한 크고 직관적인 배치 */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {/* 시승 예약 - 가장 큰 버튼 */}
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => navigate('/reservation')}
              sx={{
                p: { xs: 4, md: 6 },
                bgcolor: '#A68966',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#c4a882',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 60px rgba(166,137,102,0.3)',
                },
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#0B0B0B' }} />
              <Box>
                <Typography sx={{ color: '#0B0B0B', fontWeight: 900, fontSize: { xs: '1.5rem', md: '2rem' }, letterSpacing: '0.05em', lineHeight: 1.2, mb: 1 }}>
                  시승 예약
                </Typography>
                <Typography sx={{ color: 'rgba(11,11,11,0.7)', fontSize: { xs: '0.95rem', md: '1.1rem' }, lineHeight: 1.6 }}>
                  원하는 날짜와 지점을 선택하고<br />VANTAGE를 직접 경험해 보세요
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ color: '#0B0B0B', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                  예약하기 →
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 견적 문의 */}
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => navigate('/reservation', { state: { type: 'quote' } })}
              sx={{
                p: { xs: 4, md: 6 },
                bgcolor: '#0c121c',
                border: '2px solid rgba(166,137,102,0.4)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '2px solid #A68966',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 60px rgba(166,137,102,0.1)',
                },
              }}
            >
              <RequestQuoteIcon sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#A68966' }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.5rem', md: '2rem' }, letterSpacing: '0.05em', lineHeight: 1.2, mb: 1 }}>
                  견적 문의
                </Typography>
                <Typography sx={{ color: '#969696', fontSize: { xs: '0.95rem', md: '1.1rem' }, lineHeight: 1.6 }}>
                  선택한 옵션과 희망 사양을 기반으로<br />맞춤형 견적을 받아보세요
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ color: '#A68966', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                  문의하기 →
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* 추가 서비스 */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              onClick={() => navigate('/showroom')}
              sx={{
                p: 3,
                border: '1px solid rgba(74,74,74,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                '&:hover': { borderColor: '#A68966', '& .cta-icon': { color: '#A68966' } },
                transition: 'all 0.3s',
              }}
            >
              <LocationOnIcon className="cta-icon" sx={{ color: '#4A4A4A', fontSize: '2rem', flexShrink: 0 }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem', mb: 0.3 }}>전시장 찾기</Typography>
                <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>가까운 전시장 안내</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3,
                border: '1px solid rgba(74,74,74,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                '&:hover': { borderColor: '#A68966', '& .cta-icon': { color: '#A68966' } },
                transition: 'all 0.3s',
              }}
              onClick={() => window.open('tel:15881234')}
            >
              <PhoneIcon className="cta-icon" sx={{ color: '#4A4A4A', fontSize: '2rem', flexShrink: 0 }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem', mb: 0.3 }}>전화 상담</Typography>
                <Typography sx={{ color: '#A68966', fontSize: '0.9rem', fontWeight: 600 }}>1588-1234</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              onClick={() => navigate('/search')}
              sx={{
                p: 3,
                border: '1px solid rgba(74,74,74,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                '&:hover': { borderColor: '#A68966' },
                transition: 'all 0.3s',
              }}
            >
              <Box sx={{ fontSize: '2rem', flexShrink: 0 }}>🚙</Box>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem', mb: 0.3 }}>모델 비교</Typography>
                <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>최대 3모델 비교</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              onClick={() => navigate('/events')}
              sx={{
                p: 3,
                border: '1px solid rgba(74,74,74,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                '&:hover': { borderColor: '#A68966' },
                transition: 'all 0.3s',
              }}
            >
              <Box sx={{ fontSize: '2rem', flexShrink: 0 }}>🎁</Box>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem', mb: 0.3 }}>이벤트/프로모션</Typography>
                <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>최신 혜택 확인</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
