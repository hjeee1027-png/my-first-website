import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material'

const B = import.meta.env.BASE_URL

const TECH_FEATURES = [
  {
    title: 'AI 자율주행 Level 3',
    subtitle: 'AUTONOMOUS DRIVING',
    desc: '신호등 인식, 차선 유지, 자동 긴급 제동까지. 고속도로 전 구간 핸즈프리 주행을 실현합니다.',
    image: `${B}img/story_road.webp`,
  },
  {
    title: 'LiDAR 360° 스캔',
    subtitle: 'SENSOR TECHNOLOGY',
    desc: '초당 200만 포인트를 스캔하는 솔리드스테이트 LiDAR로 악천후에서도 완벽한 주변 인식.',
    image: `${B}img/car4_1.webp`,
  },
  {
    title: '27" 통합 디스플레이',
    subtitle: 'COCKPIT EXPERIENCE',
    desc: '운전석과 조수석이 공유하는 파노라믹 터치 디스플레이. 3D 내비게이션과 OTA 업데이트 지원.',
    image: `${B}img/tech_display.jpeg`,
  },
  {
    title: 'Meridian 22스피커',
    subtitle: 'AUDIO SYSTEM',
    desc: '22개의 스피커가 만들어내는 3D 서라운드 사운드. 콘서트홀을 차 안으로 가져왔습니다.',
    image: `${B}img/car1_2.jpeg`,
  },
]

const FALLBACK = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'

export default function TechSection() {
  return (
    <Box sx={{ bgcolor: '#f8f8f8', py: { xs: 8, md: 12 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
            INNOVATION
          </Typography>
          <Typography variant="h2" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
            첨단 기술의 정점
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '1rem', maxWidth: 600, mx: 'auto' }}>
            생동감 넘치는 역동성. AI 자율주행 기술이 만들어낼 편안함
          </Typography>
        </Box>

        {/* 4-카드 그리드 */}
        <Grid container spacing={3}>
          {TECH_FEATURES.map((item, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 0,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 이미지 */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="260"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'cover', transition: 'transform 0.5s ease', '&:hover': { transform: 'scale(1.03)' } }}
                    onError={(e) => { e.target.src = FALLBACK }}
                  />
                  {/* 오버레이 라벨 */}
                  <Box sx={{
                    position: 'absolute', top: 16, left: 16,
                    bgcolor: 'rgba(12,18,28,0.75)', px: 1.5, py: 0.5,
                  }}>
                    <Typography sx={{ color: '#A68966', fontSize: '0.65rem', letterSpacing: '0.18em', fontWeight: 600 }}>
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Box>

                {/* 내용 */}
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {/* 구분선 (ProductSection 보더와 동일: 1px solid #e0e0e0) */}
                  <Box sx={{ width: 32, height: 2, bgcolor: '#A68966' }} />
                  <Typography sx={{ color: '#111', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.35 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.8, flex: 1 }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
