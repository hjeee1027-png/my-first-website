import { Box, Container, Grid, Typography, Divider, Link, IconButton } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookIcon from '@mui/icons-material/Facebook'

const FOOTER_LINKS = {
  '차량': ['전체 모델', '차량 비교', '맞춤 견적', '시승 예약'],
  '브랜드': ['VANTAGE 스토리', '디자인 철학', '기술 혁신', '지속가능성'],
  '고객 서비스': ['전시장 찾기', '서비스 센터', '보증 안내', '자주 묻는 질문'],
  '법적 고지': ['이용약관', '개인정보처리방침', '쿠키 정책', '법적 고지'],
}

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0c121c', borderTop: '1px solid rgba(166,137,102,0.2)', mt: 'auto' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 3, md: 6 }, py: { xs: 5, md: 8 } }}>
        <Grid container spacing={4}>
          {/* 브랜드 섹션 */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, letterSpacing: '0.35em', color: '#fff', mb: 2, fontFamily: '"Roboto", sans-serif' }}
            >
              VANTAGE
            </Typography>
            <Typography variant="body2" sx={{ color: '#4A4A4A', lineHeight: 1.8, mb: 3, fontSize: '0.85rem' }}>
              지평선 위에서, 기준 그 너머로.<br />
              우리는 단순히 이동 수단을 만드는 것이 아닙니다.<br />
              우리는 당신이 세상을 바라보는 관점을 설계합니다.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: '#4A4A4A', '&:hover': { color: '#A68966' }, p: 0.5 }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton sx={{ color: '#4A4A4A', '&:hover': { color: '#A68966' }, p: 0.5 }}>
                <YouTubeIcon fontSize="small" />
              </IconButton>
              <IconButton sx={{ color: '#4A4A4A', '&:hover': { color: '#A68966' }, p: 0.5 }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* 링크 섹션들 */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <Grid item xs={6} md={2.25} key={category}>
              <Typography
                variant="overline"
                sx={{ color: '#A68966', fontWeight: 600, letterSpacing: '0.12em', mb: 2, display: 'block', fontSize: '0.7rem' }}
              >
                {category}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{ color: '#4A4A4A', fontSize: '0.85rem', '&:hover': { color: '#E1E1E1' }, transition: 'color 0.2s', cursor: 'pointer' }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(74,74,74,0.3)', my: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>
            © 2025 VANTAGE Automotive Co., Ltd. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>
              사업자등록번호: 123-45-67890
            </Typography>
            <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>
              대표: 이반티지
            </Typography>
            <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>
              고객센터: 1588-1234
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
