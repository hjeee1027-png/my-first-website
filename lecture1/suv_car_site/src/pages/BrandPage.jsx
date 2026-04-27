import { Box, Container, Typography, Grid, Divider } from '@mui/material'
import { keyframes } from '@mui/system'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`

const TIMELINE = [
  { year: '2010', title: '브랜드 창립', desc: '서울에서 시작된 VANTAGE의 첫 걸음. 프리미엄 SUV에 대한 새로운 비전을 품다.' },
  { year: '2014', title: '첫 번째 플래그십 모델', desc: 'VANTAGE I 출시. 국내 대형 SUV 시장의 새로운 기준을 제시하며 큰 반향을 일으키다.' },
  { year: '2018', title: '글로벌 진출', desc: '중동 및 동남아시아 시장 진출. VANTAGE의 럭셔리 DNA가 세계에 알려지다.' },
  { year: '2021', title: 'AI 자율주행 Level 3', desc: '국내 최초 대형 SUV 자율주행 3단계 인증 획득. 기술과 안전의 새로운 지평을 열다.' },
  { year: '2024', title: '전동화 선언', desc: '2030년까지 전 라인업 전동화 완성 선언. 지속가능한 럭셔리의 미래를 준비하다.' },
  { year: '2025', title: 'VANTAGE Crest EV', desc: '첫 번째 순수 전기 SUV 출시. 530km 주행거리와 22분 급속충전으로 전기차의 한계를 극복하다.' },
]

const PHILOSOPHY = [
  { title: '인간 중심 드라이빙', desc: '운전자와 탑승자 모두의 경험을 최우선으로 설계합니다. 기술은 인간을 위해 존재합니다.' },
  { title: '미래 지향적 미학', desc: '시간이 흘러도 변하지 않는 클래식함 위에 첨단의 세련미를 더합니다.' },
  { title: '완벽한 안전', desc: '5스타 충돌 안전, 14개 에어백, AI 긴급 제동. 가장 소중한 것을 지킵니다.' },
  { title: '지속가능한 고급', desc: '친환경 소재와 전기 파워트레인으로 럭셔리와 환경의 공존을 증명합니다.' },
]

const SUSTAINABILITY = [
  { label: '2030년', desc: '전 라인업 전동화 완성' },
  { label: '탄소 중립', desc: '2040년 생산 과정 탄소 중립 달성' },
  { label: '재활용 소재', desc: '내장재 60% 재활용/친환경 소재 적용' },
  { label: '에너지 효율', desc: '공장 100% 재생에너지 전환' },
]

export default function BrandPage() {
  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', pt: '72px' }}>
      {/* 히어로 */}
      <Box
        sx={{
          height: { xs: 400, md: 560 },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: '#111',
        }}
      >
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}img/car1_4.jpeg`}
          alt="VANTAGE Brand"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.6)' }} />
        <Box sx={{ position: 'relative', textAlign: 'center', zIndex: 1, px: 3, animation: `${fadeIn} 1s ease` }}>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.5em', color: '#A68966', fontSize: { xs: '0.75rem', md: '0.9rem' }, mb: 3 }}>
            BRAND STORY
          </Typography>
          <Typography
            variant="h1"
            sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '2.5rem', md: '4.5rem' }, letterSpacing: '0.08em', mb: 3 }}
          >
            VANTAGE
          </Typography>
          <Typography
            sx={{ color: 'rgba(255,255,255,0.6)', fontSize: { xs: '1rem', md: '1.2rem' }, letterSpacing: '0.15em', maxWidth: 600, mx: 'auto' }}
          >
            지평선 위에서, 기준 그 너머로
          </Typography>
        </Box>
      </Box>

      {/* 브랜드 스토리 */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 3, md: 8 } }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 2 }}>
                OUR STORY
              </Typography>
              <Typography variant="h3" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2rem' }, mb: 3, lineHeight: 1.3 }}>
                우리는 단순히<br />이동 수단을 만들지 않습니다
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '1rem', lineHeight: 1.9, mb: 3 }}>
                우리는 당신이 세상을 바라보는 관점을 설계합니다.
                성공의 길은 때로 거칠고 가파릅니다. 때로는 가족의 안녕을 위해, 때로는 자신만의 성취를 증명하기 위해,
                또 때로는 인생의 황혼에서 만나는 진정한 여유를 위해 당신은 쉼 없이 달려왔습니다.
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '1rem', lineHeight: 1.9, mb: 3 }}>
                VANTAGE는 그 여정의 끝이 아닌, 새로운 시야가 시작되는 정점에 서 있습니다.
                가장 높은 곳에서 가장 넓게 세상을 조망하는 특권.
                기준을 넘어선 당신에게 허락된 단 하나의 자리, VANTAGE입니다.
              </Typography>
              <Box sx={{ borderLeft: '3px solid #A68966', pl: 3 }}>
                <Typography sx={{ color: '#A68966', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7 }}>
                  "VANTAGE — 우월한 위치에서 세상을 바라보는 자만이 알 수 있는 자유"
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: 280, md: 420 },
                  bgcolor: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: { xs: '6rem', md: '10rem' }, color: 'rgba(166,137,102,0.08)', letterSpacing: '0.1em', userSelect: 'none' }}>
                  V
                </Typography>
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <Typography sx={{ color: '#A68966', fontWeight: 900, letterSpacing: '0.4em', fontSize: '1.5rem' }}>VANTAGE</Typography>
                  <Typography sx={{ color: '#bbb', fontSize: '0.75rem', letterSpacing: '0.2em' }}>EST. 2010</Typography>
                  <Divider sx={{ borderColor: 'rgba(166,137,102,0.3)', width: 80, my: 1 }} />
                  <Typography sx={{ color: '#888', fontSize: '0.85rem', textAlign: 'center', px: 4, lineHeight: 1.7 }}>
                    Premium Large SUV<br />Crafted for the Visionary
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 타임라인 */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8f8f8' }}>
        <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 8 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>HISTORY</Typography>
            <Typography variant="h3" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2rem' } }}>브랜드 역사</Typography>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', left: { xs: 20, md: '50%' }, top: 0, bottom: 0, width: 1, bgcolor: 'rgba(166,137,102,0.3)', transform: { md: 'translateX(-50%)' } }} />

            {TIMELINE.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: i % 2 === 0 ? 'row' : 'row-reverse' },
                  mb: 5,
                  position: 'relative',
                  animation: `${fadeIn} 0.6s ${i * 0.15}s both`,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 12, md: '50%' },
                    transform: { md: 'translateX(-50%)' },
                    width: 16, height: 16,
                    bgcolor: '#A68966',
                    borderRadius: '50%',
                    top: '50%',
                    mt: { xs: 0, md: '-8px' },
                    zIndex: 1,
                  }}
                />

                <Box sx={{ width: { md: '45%' }, pl: { xs: 8, md: i % 2 === 0 ? 0 : 4 }, pr: { md: i % 2 === 0 ? 4 : 0 }, textAlign: { md: i % 2 === 0 ? 'right' : 'left' } }}>
                  <Typography sx={{ color: '#A68966', fontWeight: 700, fontSize: '1.3rem', mb: 0.5 }}>{item.year}</Typography>
                  <Typography sx={{ color: '#111', fontWeight: 600, fontSize: '1rem', mb: 0.8 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.desc}</Typography>
                </Box>

                <Box sx={{ width: { md: '55%' } }} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 디자인 철학 */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 3, md: 8 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>PHILOSOPHY</Typography>
            <Typography variant="h3" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2rem' } }}>디자인 철학</Typography>
          </Box>

          <Grid container spacing={3}>
            {PHILOSOPHY.map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box
                  sx={{
                    p: 4,
                    border: '1px solid #e0e0e0',
                    borderTop: '3px solid #A68966',
                    height: '100%',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: '#A68966' },
                  }}
                >
                  <Typography sx={{ color: '#A68966', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                    0{i + 1}
                  </Typography>
                  <Typography sx={{ color: '#111', fontWeight: 600, fontSize: '1rem', mb: 1.5 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 지속가능성 */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8f8f8' }}>
        <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 3, md: 8 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>SUSTAINABILITY</Typography>
            <Typography variant="h3" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2rem' }, mb: 2 }}>지속가능한 미래</Typography>
            <Typography sx={{ color: '#666', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
              VANTAGE는 럭셔리와 지속가능성이 함께할 수 있음을 증명합니다.
              더 넓은 세상을 위한 더 큰 책임.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {SUSTAINABILITY.map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box
                  sx={{
                    p: 4,
                    bgcolor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderTop: '3px solid #A68966',
                  }}
                >
                  <Typography sx={{ color: '#A68966', fontWeight: 700, fontSize: '1.3rem', mb: 1 }}>{item.label}</Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
