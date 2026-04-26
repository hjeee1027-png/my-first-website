import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@mui/system'

const dustFloat = keyframes`
  0% { transform: translateX(-100%) translateY(0); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.3; }
  100% { transform: translateX(200vw) translateY(-30px); opacity: 0; }
`
const carMove = keyframes`
  0% { transform: translateX(-8px); }
  50% { transform: translateX(4px); }
  100% { transform: translateX(-8px); }
`
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`
const scanLine = keyframes`
  0% { top: 0%; opacity: 0.8; }
  100% { top: 100%; opacity: 0; }
`

export default function BannerSection() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        bgcolor: '#0a0e18',
      }}
    >
      {/* 배경 그라디언트 (사막 황무지 분위기) */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #0a0e18 0%, #1a1a0a 40%, #2a1a05 65%, #0a0e18 100%)',
          zIndex: 0,
        }}
      />

      {/* 지평선 효과 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%', left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(166,137,102,0.3), rgba(255,230,150,0.5), rgba(166,137,102,0.3), transparent)',
          zIndex: 1,
        }}
      />

      {/* 도로 (중앙 직선 도로) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20%',
          height: '35%',
          background: 'linear-gradient(0deg, rgba(30,25,15,0.9) 0%, rgba(20,18,10,0.3) 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '3%',
            height: '100%',
            background: 'repeating-linear-gradient(0deg, #A68966 0px, #A68966 20px, transparent 20px, transparent 40px)',
            opacity: 0.4,
          }
        }}
      />

      {/* 먼지 파티클들 */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            bottom: `${28 + i * 3}%`,
            left: 0,
            width: `${150 + i * 80}px`,
            height: `${6 + i * 4}px`,
            background: `radial-gradient(ellipse, rgba(180,140,80,${0.15 + i * 0.05}) 0%, transparent 70%)`,
            animation: `${dustFloat} ${3 + i * 0.8}s ${i * 0.6}s infinite linear`,
            zIndex: 2,
          }}
        />
      ))}

      {/* 메인 차량 실루엣 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '70%', md: '50%' },
          maxWidth: 700,
          zIndex: 3,
          animation: `${carMove} 4s ease-in-out infinite`,
        }}
      >
        {/* SUV 차체 SVG 실루엣 */}
        <svg viewBox="0 0 700 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))' }}>
          {/* 차체 */}
          <path d="M80 180 L80 120 Q85 100 120 85 L200 65 Q230 55 280 52 L420 52 Q470 55 500 65 L580 85 Q615 100 620 120 L620 180 Z" fill="#0c121c" />
          {/* 루프라인 */}
          <path d="M180 85 Q220 45 300 38 L400 38 Q480 45 520 85" stroke="#A68966" strokeWidth="1.5" fill="none" />
          {/* 윈드실드 */}
          <path d="M175 88 Q215 50 300 42 L300 88 Z" fill="rgba(100,150,200,0.15)" stroke="rgba(166,137,102,0.3)" strokeWidth="0.5" />
          <path d="M525 88 Q485 50 400 42 L400 88 Z" fill="rgba(100,150,200,0.15)" stroke="rgba(166,137,102,0.3)" strokeWidth="0.5" />
          {/* 사이드 윈도우 */}
          <rect x="310" y="58" width="80" height="30" rx="2" fill="rgba(100,150,200,0.1)" stroke="rgba(166,137,102,0.2)" strokeWidth="0.5" />
          {/* 도어 라인 */}
          <line x1="300" y1="90" x2="300" y2="175" stroke="rgba(166,137,102,0.2)" strokeWidth="0.5" />
          <line x1="410" y1="90" x2="410" y2="175" stroke="rgba(166,137,102,0.2)" strokeWidth="0.5" />
          {/* 그릴 */}
          <rect x="82" y="130" width="25" height="35" rx="1" fill="rgba(166,137,102,0.15)" stroke="#A68966" strokeWidth="0.8" />
          {/* 헤드라이트 */}
          <ellipse cx="105" cy="118" rx="18" ry="8" fill="rgba(255,240,200,0.1)" stroke="#A68966" strokeWidth="1" />
          <ellipse cx="107" cy="118" rx="12" ry="5" fill="rgba(255,240,200,0.4)" />
          {/* 테일라이트 */}
          <ellipse cx="595" cy="118" rx="18" ry="8" fill="rgba(200,50,50,0.1)" stroke="rgba(200,50,50,0.5)" strokeWidth="1" />
          <ellipse cx="593" cy="118" rx="12" ry="5" fill="rgba(200,50,50,0.3)" />
          {/* 앞바퀴 */}
          <circle cx="185" cy="182" r="48" fill="#111" stroke="#4A4A4A" strokeWidth="2" />
          <circle cx="185" cy="182" r="36" fill="#0c121c" stroke="#A68966" strokeWidth="1.5" />
          <circle cx="185" cy="182" r="18" fill="#1a1a1a" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <line key={i} x1={185 + Math.cos(angle * Math.PI / 180) * 18} y1={182 + Math.sin(angle * Math.PI / 180) * 18} x2={185 + Math.cos(angle * Math.PI / 180) * 35} y2={182 + Math.sin(angle * Math.PI / 180) * 35} stroke="#A68966" strokeWidth="2" />
          ))}
          {/* 뒷바퀴 */}
          <circle cx="515" cy="182" r="48" fill="#111" stroke="#4A4A4A" strokeWidth="2" />
          <circle cx="515" cy="182" r="36" fill="#0c121c" stroke="#A68966" strokeWidth="1.5" />
          <circle cx="515" cy="182" r="18" fill="#1a1a1a" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <line key={i} x1={515 + Math.cos(angle * Math.PI / 180) * 18} y1={182 + Math.sin(angle * Math.PI / 180) * 18} x2={515 + Math.cos(angle * Math.PI / 180) * 35} y2={182 + Math.sin(angle * Math.PI / 180) * 35} stroke="#A68966" strokeWidth="2" />
          ))}
          {/* 차체 하이라이트 */}
          <path d="M100 140 Q200 130 350 128 Q500 130 600 140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
          <path d="M150 105 Q200 95 350 90 Q500 95 550 105" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" fill="none" />
          {/* 범퍼 디테일 */}
          <path d="M80 160 L80 185 Q82 188 90 188 L155 188" stroke="#A68966" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M620 160 L620 185 Q618 188 610 188 L545 188" stroke="#A68966" strokeWidth="0.8" fill="none" opacity="0.5" />
        </svg>
      </Box>

      {/* 속도감 있는 배경 줄기 효과 */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${35 + i * 3}%`,
            left: 0,
            width: '100%',
            height: '1px',
            background: `linear-gradient(90deg, transparent ${20 + i * 5}%, rgba(166,137,102,${0.05 + i * 0.01}) 50%, transparent ${80 - i * 5}%)`,
            zIndex: 1,
          }}
        />
      ))}

      {/* 텍스트 오버레이 */}
      <Container
        maxWidth={false}
        sx={{
          position: 'absolute',
          inset: 0,
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
          zIndex: 10,
        }}
      >
        <Box sx={{ maxWidth: 700 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#A68966',
              letterSpacing: '0.3em',
              fontSize: '0.75rem',
              display: 'block',
              mb: 2,
              animation: `${fadeInUp} 0.8s 0.2s both`,
            }}
          >
            VANTAGE AUTOMOTIVE
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem', lg: '5rem' },
              lineHeight: 1.1,
              letterSpacing: '0.03em',
              mb: 2,
              animation: `${fadeInUp} 0.8s 0.4s both`,
            }}
          >
            세상의 기준을<br />
            <Box component="span" sx={{ color: '#A68966' }}>뛰어넘다</Box>
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.7,
              mb: 5,
              animation: `${fadeInUp} 0.8s 0.6s both`,
              maxWidth: 500,
            }}
          >
            디자인부터 제작까지, 새로운 시야에서<br />기준 그 너머로
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', animation: `${fadeInUp} 0.8s 0.8s both` }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/search')}
              sx={{
                bgcolor: '#A68966', color: '#0B0B0B',
                border: 'none',
                px: 5, py: 1.8,
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                '&:hover': { bgcolor: '#c4a882', transform: 'translateY(-2px)', boxShadow: '0 8px 30px rgba(166,137,102,0.3)' },
                transition: 'all 0.3s ease',
              }}
            >
              자세히 보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/reservation')}
              sx={{
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#fff',
                px: 5, py: 1.8,
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                '&:hover': { borderColor: '#A68966', color: '#A68966', bgcolor: 'transparent' },
              }}
            >
              시승 예약
            </Button>
          </Box>
        </Box>
      </Container>

      {/* 스크롤 인디케이터 */}
      <Box
        sx={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          zIndex: 10, animation: `${fadeInUp} 1s 1.2s both`,
        }}
      >
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>SCROLL</Typography>
        <Box sx={{
          width: 1, height: 50,
          background: 'linear-gradient(180deg, rgba(166,137,102,0.6) 0%, transparent 100%)',
          animation: `${scanLine} 2s ease-in-out infinite`,
          position: 'relative',
        }} />
      </Box>
    </Box>
  )
}
