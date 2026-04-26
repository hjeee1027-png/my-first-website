import { Box, Container, Typography, Grid } from '@mui/material'

const TECH_FEATURES = [
  { title: 'AI 자율주행 Level 3', desc: '신호등 인식, 차선 유지, 자동 긴급 제동까지. 고속도로 전 구간 핸즈프리 주행을 실현합니다.' },
  { title: 'LiDAR 360° 스캔', desc: '초당 200만 포인트를 스캔하는 솔리드스테이트 LiDAR로 악천후에서도 완벽한 주변 인식.' },
  { title: '27" 통합 디스플레이', desc: '운전석과 조수석이 공유하는 파노라믹 터치 디스플레이. 3D 내비게이션과 OTA 업데이트 지원.' },
  { title: 'Meridian 22스피커', desc: '22개의 스피커가 만들어내는 3D 서라운드 사운드. 콘서트홀을 차 안으로 가져왔습니다.' },
]

export default function TechSection() {
  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
            INNOVATION
          </Typography>
          <Typography variant="h2" sx={{ color: '#A68966', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
            첨단 기술의 정점
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '1rem', maxWidth: 600, mx: 'auto' }}>
            생동감 넘치는 역동성. AI 자율주행 기술이 만들어낼 편안함
          </Typography>
        </Box>

        <Grid container spacing={8} alignItems="center">
          {/* 왼쪽 기술 설명 */}
          <Grid item xs={12} md={5}>
            {TECH_FEATURES.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  gap: 3,
                  mb: 4,
                  pb: 4,
                  borderBottom: i < TECH_FEATURES.length - 1 ? '1px solid #e0e0e0' : 'none',
                }}
              >
                <Box
                  sx={{
                    width: 3,
                    flexShrink: 0,
                    bgcolor: '#A68966',
                    mt: '4px',
                    alignSelf: 'stretch',
                    minHeight: 40,
                  }}
                />
                <Box>
                  <Typography sx={{ color: '#111', fontWeight: 600, fontSize: '1rem', mb: 0.8 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.8 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>

          {/* 오른쪽 이미지 */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 280, md: 480 },
                overflow: 'hidden',
                bgcolor: '#f5f5f5',
              }}
            >
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}img/tech_display.jpeg`}
                alt="VANTAGE 첨단 기술"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
