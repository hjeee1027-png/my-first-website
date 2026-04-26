import { Box, Container, Typography, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'

export default function ReservationCTASection() {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: '#f8f8f8', py: { xs: 8, md: 12 }, borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
            EXPERIENCE
          </Typography>
          <Typography variant="h2" sx={{ color: '#111', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
            지금 시작하세요
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
            반티지를 직접 경험해 보세요.<br />당신을 위한 자리가 준비되어 있습니다.
          </Typography>
        </Box>

        {/* 메인 CTA 버튼들 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* 시승 예약 */}
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => navigate('/reservation')}
              sx={{
                p: { xs: 4, md: 5 },
                bgcolor: '#111',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                userSelect: 'none',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.88 },
              }}
            >
              <DirectionsCarOutlinedIcon sx={{ fontSize: '2.5rem', color: '#A68966' }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1.4rem', md: '1.75rem' }, letterSpacing: '0.03em', lineHeight: 1.2, mb: 1 }}>
                  시승 예약
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.7 }}>
                  원하는 날짜와 지점을 선택하고<br />VANTAGE를 직접 경험해 보세요
                </Typography>
              </Box>
              <Typography sx={{ color: '#A68966', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                예약하기 →
              </Typography>
            </Box>
          </Grid>

          {/* 견적 문의 */}
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => navigate('/reservation', { state: { type: 'quote' } })}
              sx={{
                p: { xs: 4, md: 5 },
                bgcolor: '#fff',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
                userSelect: 'none',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: '#111' },
              }}
            >
              <DescriptionOutlinedIcon sx={{ fontSize: '2.5rem', color: '#111' }} />
              <Box>
                <Typography sx={{ color: '#111', fontWeight: 700, fontSize: { xs: '1.4rem', md: '1.75rem' }, letterSpacing: '0.03em', lineHeight: 1.2, mb: 1 }}>
                  견적 문의
                </Typography>
                <Typography sx={{ color: '#666', fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.7 }}>
                  선택한 옵션과 희망 사양을 기반으로<br />맞춤형 견적을 받아보세요
                </Typography>
              </Box>
              <Typography sx={{ color: '#111', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                문의하기 →
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 추가 서비스 */}
        <Grid container spacing={2}>
          {[
            { Icon: StorefrontOutlinedIcon, label: '전시장 찾기', sub: '가까운 전시장 안내', action: () => navigate('/showroom') },
            { Icon: PhoneOutlinedIcon, label: '전화 상담', sub: '1588-1234', action: () => window.open('tel:15881234') },
            { Icon: CompareArrowsIcon, label: '모델 비교', sub: '최대 3모델 비교', action: () => navigate('/search') },
            { Icon: LocalOfferOutlinedIcon, label: '이벤트/프로모션', sub: '최신 혜택 확인', action: () => navigate('/events') },
          ].map(({ Icon, label, sub, action }) => (
            <Grid item xs={12} sm={6} md={3} key={label}>
              <Box
                onClick={action}
                sx={{
                  p: 3,
                  border: '1px solid #e0e0e0',
                  bgcolor: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  userSelect: 'none',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#111' },
                }}
              >
                <Icon sx={{ color: '#666', fontSize: '1.6rem', flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ color: '#111', fontWeight: 500, fontSize: '0.9rem', mb: 0.3 }}>{label}</Typography>
                  <Typography sx={{ color: '#999', fontSize: '0.8rem' }}>{sub}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
