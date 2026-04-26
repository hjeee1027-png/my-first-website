import { Box, Container, Typography, Grid } from '@mui/material'
import { keyframes } from '@mui/system'

const scanAnim = keyframes`
  0% { transform: translateY(-100%) rotate(-15deg); opacity: 0; }
  20% { opacity: 0.7; }
  80% { opacity: 0.5; }
  100% { transform: translateY(200%) rotate(-15deg); opacity: 0; }
`
const pulseAnim = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
`
const rotateAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`

const TECH_FEATURES = [
  { icon: '🤖', title: 'AI 자율주행 Level 3', desc: '신호등 인식, 차선 유지, 자동 긴급 제동까지. 고속도로 전 구간 핸즈프리 주행을 실현합니다.' },
  { icon: '📡', title: 'LiDAR 360° 스캔', desc: '초당 200만 포인트를 스캔하는 솔리드스테이트 LiDAR로 악천후에서도 완벽한 주변 인식.' },
  { icon: '🖥️', title: '27" 통합 디스플레이', desc: '운전석과 조수석이 공유하는 파노라믹 터치 디스플레이. 3D 내비게이션과 OTA 업데이트 지원.' },
  { icon: '🔊', title: 'Meridian 22스피커', desc: '22개의 스피커가 만들어내는 3D 서라운드 사운드. 콘서트홀을 차 안으로 가져왔습니다.' },
]

export default function TechSection() {
  return (
    <Box sx={{ bgcolor: '#080c14', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
            INNOVATION
          </Typography>
          <Typography variant="h2" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
            첨단 기술의 정점
          </Typography>
          <Typography sx={{ color: '#969696', fontSize: '1rem', maxWidth: 600, mx: 'auto' }}>
            생동감 넘치는 역동성. AI 자율주행 기술이 만들어낼 편안함
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* 왼쪽 기술 설명 */}
          <Grid item xs={12} md={5}>
            <Box sx={{ animation: `${fadeInLeft} 0.8s ease both` }}>
              {TECH_FEATURES.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    mb: 4,
                    pb: 4,
                    borderBottom: i < TECH_FEATURES.length - 1 ? '1px solid rgba(74,74,74,0.3)' : 'none',
                    '&:hover': { '& .tech-icon': { color: '#A68966', transform: 'scale(1.2)' } },
                    transition: 'all 0.3s',
                  }}
                >
                  <Typography
                    className="tech-icon"
                    sx={{ fontSize: '2rem', flexShrink: 0, transition: 'all 0.3s', lineHeight: 1.2 }}
                  >
                    {item.icon}
                  </Typography>
                  <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1rem', mb: 0.8 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: '#969696', fontSize: '0.875rem', lineHeight: 1.7 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* 오른쪽 AI 시각화 */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 300, md: 500 },
                bgcolor: '#0a0e18',
                border: '1px solid rgba(166,137,102,0.1)',
                overflow: 'hidden',
              }}
            >
              {/* 그리드 배경 */}
              <Box
                sx={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(166,137,102,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(166,137,102,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* 도로 */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0, left: '35%', right: '35%',
                  height: '60%',
                  background: 'linear-gradient(0deg, rgba(30,25,15,0.8) 0%, transparent 100%)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                }}
              />

              {/* LiDAR 스캔 빔들 */}
              {[...Array(6)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    top: 0, bottom: 0,
                    left: `${20 + i * 12}%`,
                    width: '2px',
                    background: `linear-gradient(180deg, transparent 0%, rgba(0,200,255,${0.3 + i * 0.05}) 40%, rgba(0,200,255,${0.5 + i * 0.05}) 50%, rgba(0,200,255,${0.3 + i * 0.05}) 60%, transparent 100%)`,
                    animation: `${scanAnim} ${2 + i * 0.3}s ${i * 0.5}s infinite ease-in-out`,
                    transformOrigin: 'center',
                  }}
                />
              ))}

              {/* 차량 SVG */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: { xs: '55%', md: '50%' },
                  zIndex: 5,
                }}
              >
                <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                  <path d="M40 105 L40 65 Q44 50 65 42 L110 32 L200 28 L290 32 L335 42 Q356 50 360 65 L360 105 Z" fill="#0c121c" />
                  <path d="M90 42 Q130 20 200 16 L270 20 Q310 28 310 42" stroke="#A68966" strokeWidth="1" fill="none" />
                  <ellipse cx="100" cy="107" r="28" fill="#111" stroke="#A68966" strokeWidth="1" />
                  <ellipse cx="100" cy="107" r="18" fill="#0c121c" />
                  <ellipse cx="300" cy="107" r="28" fill="#111" stroke="#A68966" strokeWidth="1" />
                  <ellipse cx="300" cy="107" r="18" fill="#0c121c" />
                  {/* 센서 포인트들 */}
                  <circle cx="42" cy="65" r="4" fill="#00c8ff" opacity="0.8" />
                  <circle cx="358" cy="65" r="4" fill="#00c8ff" opacity="0.8" />
                  <circle cx="200" cy="28" r="3" fill="#00c8ff" opacity="0.6" />
                </svg>
              </Box>

              {/* 레이더 링들 */}
              {[80, 140, 200].map((r, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '50%',
                    transform: 'translate(-50%, 50%)',
                    width: r * 2,
                    height: r,
                    border: `1px solid rgba(0,200,255,${0.2 - i * 0.05})`,
                    borderRadius: `${r}px ${r}px 0 0`,
                    animation: `${pulseAnim} ${2 + i * 0.5}s infinite`,
                  }}
                />
              ))}

              {/* 센서 포인트 클라우드 */}
              {[...Array(20)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    top: `${20 + Math.random() * 50}%`,
                    left: `${10 + Math.random() * 80}%`,
                    width: 3, height: 3,
                    borderRadius: '50%',
                    bgcolor: 'rgba(0,200,255,0.6)',
                    animation: `${pulseAnim} ${1 + Math.random() * 2}s ${Math.random()}s infinite`,
                  }}
                />
              ))}

              {/* 오버레이 텍스트 */}
              <Box sx={{ position: 'absolute', top: 20, right: 20, textAlign: 'right' }}>
                <Typography sx={{ color: 'rgba(0,200,255,0.8)', fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                  SYSTEM ACTIVE
                </Typography>
                <Typography sx={{ color: 'rgba(0,200,255,0.5)', fontSize: '0.65rem', fontFamily: 'monospace' }}>
                  LIDAR: 2.1M pts/s
                </Typography>
                <Typography sx={{ color: 'rgba(0,200,255,0.5)', fontSize: '0.65rem', fontFamily: 'monospace' }}>
                  RANGE: 200m
                </Typography>
              </Box>

              {/* 회전 레이더 */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20, left: 20,
                  width: 60, height: 60,
                  animation: `${rotateAnim} 4s linear infinite`,
                }}
              >
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <circle cx="30" cy="30" r="28" stroke="rgba(166,137,102,0.2)" strokeWidth="1" fill="none" />
                  <circle cx="30" cy="30" r="18" stroke="rgba(166,137,102,0.15)" strokeWidth="0.5" fill="none" />
                  <line x1="30" y1="2" x2="30" y2="30" stroke="#A68966" strokeWidth="1.5" opacity="0.7" />
                  <path d="M30 30 L2 30 A28 28 0 0 1 30 2 Z" fill="rgba(166,137,102,0.1)" />
                </svg>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
