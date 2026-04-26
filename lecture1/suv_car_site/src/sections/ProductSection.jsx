import { useState } from 'react'
import { Box, Container, Typography, Tabs, Tab, Grid, Chip, Button, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'
import { CARS, CAR_COLORS, formatPrice, getDiscountedPrice } from '../data/mockData'

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const navigate = useNavigate()

  const car = CARS[activeTab]
  const images = car.images

  const handleTabChange = (_, v) => {
    setActiveTab(v)
    setImgIdx(0)
  }

  const IMG_LABELS = ['외관 전체', '내부 인테리어', '바퀴 휠', '후면']

  return (
    <Box sx={{ bgcolor: '#0B0B0B', py: { xs: 8, md: 12 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
            OUR MODELS
          </Typography>
          <Typography variant="h2" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
            전체 라인업
          </Typography>
          <Typography sx={{ color: '#969696', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
            VANTAGE가 제안하는 4가지 완벽한 선택
          </Typography>
        </Box>

        <Grid container spacing={0} sx={{ minHeight: 600 }}>
          {/* 왼쪽 탭 + 정보 (30%) */}
          <Grid item xs={12} md={3.6}>
            <Box sx={{ borderRight: { md: '1px solid rgba(74,74,74,0.3)' }, pr: { md: 4 }, pb: { xs: 3, md: 0 } }}>
              {/* 모델 탭 */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                orientation="vertical"
                sx={{
                  mb: 4,
                  '.MuiTabs-indicator': { left: 0, right: 'auto', bgcolor: '#A68966', width: 3 },
                }}
              >
                {CARS.map((c, i) => (
                  <Tab
                    key={c.id}
                    label={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 1 }}>
                        <Typography sx={{ fontWeight: activeTab === i ? 700 : 400, fontSize: '0.9rem', color: activeTab === i ? '#fff' : '#4A4A4A', letterSpacing: '0.03em', lineHeight: 1.2 }}>
                          {c.model_name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: activeTab === i ? '#A68966' : '#333', mt: 0.3 }}>
                          {c.fuel_type} · {c.year}
                        </Typography>
                      </Box>
                    }
                    sx={{ alignItems: 'flex-start', textAlign: 'left', pl: 3, py: 2, borderBottom: '1px solid rgba(74,74,74,0.2)' }}
                  />
                ))}
              </Tabs>

              {/* 선택된 차량 정보 */}
              <Box sx={{ pl: 3 }}>
                {car.badge && (
                  <Chip
                    label={car.badge}
                    size="small"
                    sx={{ bgcolor: '#A68966', color: '#0B0B0B', fontWeight: 600, fontSize: '0.7rem', mb: 2, borderRadius: 0 }}
                  />
                )}

                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
                  {car.model_name}
                </Typography>
                <Typography sx={{ color: '#969696', fontSize: '0.875rem', mb: 2 }}>
                  {car.model_name_ko}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {car.discount_rate > 0 ? (
                    <>
                      <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem', textDecoration: 'line-through' }}>
                        {formatPrice(car.base_price)}
                      </Typography>
                      <Typography sx={{ color: '#A68966', fontWeight: 700, fontSize: '1.3rem' }}>
                        {formatPrice(getDiscountedPrice(car.base_price, car.discount_rate))}
                      </Typography>
                      <Chip
                        label={`${Math.round(car.discount_rate * 100)}% 할인`}
                        size="small"
                        sx={{ bgcolor: 'rgba(166,137,102,0.1)', color: '#A68966', border: '1px solid rgba(166,137,102,0.3)', borderRadius: 0, fontSize: '0.7rem', mt: 0.5 }}
                      />
                    </>
                  ) : (
                    <Typography sx={{ color: '#A68966', fontWeight: 700, fontSize: '1.3rem' }}>
                      {formatPrice(car.base_price)}
                    </Typography>
                  )}
                </Box>

                <Typography sx={{ color: '#969696', fontSize: '0.85rem', lineHeight: 1.7, mb: 3 }}>
                  {car.description}
                </Typography>

                {/* 색상 옵션 */}
                <Typography sx={{ color: '#4A4A4A', fontSize: '0.75rem', letterSpacing: '0.1em', mb: 1.5 }}>
                  색상 옵션
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {car.color_options.map((colorId) => {
                    const c = CAR_COLORS.find(c => c.id === colorId)
                    return c ? (
                      <Box
                        key={colorId}
                        title={c.nameKo}
                        sx={{
                          width: 20, height: 20,
                          bgcolor: c.hex,
                          border: '1px solid rgba(255,255,255,0.15)',
                          cursor: 'pointer',
                          '&:hover': { border: '1px solid #A68966', transform: 'scale(1.2)' },
                          transition: 'all 0.2s',
                        }}
                      />
                    ) : null
                  })}
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/reservation', { state: { car } })}
                  sx={{ borderColor: '#A68966', color: '#A68966', py: 1.5, mb: 1.5, fontSize: '0.8rem', letterSpacing: '0.1em' }}
                >
                  시승 예약하기
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigate('/search')}
                  sx={{ color: '#4A4A4A', fontSize: '0.8rem', letterSpacing: '0.1em', '&:hover': { color: '#E1E1E1' } }}
                >
                  자세히 보기 →
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* 오른쪽 이미지 슬라이드 (70%) */}
          <Grid item xs={12} md={8.4}>
            <Box sx={{ pl: { md: 4 }, position: 'relative' }}>
              {/* 메인 이미지 */}
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: '#111',
                  height: { xs: 240, sm: 360, md: 460 },
                  mb: 2,
                }}
              >
                <Box
                  component="img"
                  src={images[imgIdx]}
                  alt={`${car.model_name} ${IMG_LABELS[imgIdx]}`}
                  sx={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.4s ease',
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80'
                  }}
                />
                {/* 이미지 라벨 */}
                <Box
                  sx={{
                    position: 'absolute', top: 16, left: 16,
                    bgcolor: 'rgba(0,0,0,0.6)', px: 2, py: 0.5,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                    {IMG_LABELS[imgIdx]}
                  </Typography>
                </Box>

                {/* 이전/다음 버튼 */}
                <IconButton
                  onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)}
                  sx={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)', color: '#fff',
                    '&:hover': { bgcolor: 'rgba(166,137,102,0.8)' },
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => setImgIdx((imgIdx + 1) % images.length)}
                  sx={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)', color: '#fff',
                    '&:hover': { bgcolor: 'rgba(166,137,102,0.8)' },
                  }}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* 썸네일 + 미니맵 */}
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                {images.map((img, i) => (
                  <Box
                    key={i}
                    onClick={() => setImgIdx(i)}
                    sx={{
                      position: 'relative',
                      width: { xs: 60, md: 80 },
                      height: { xs: 45, md: 55 },
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: i === imgIdx ? '1.5px solid #A68966' : '1.5px solid transparent',
                      opacity: i === imgIdx ? 1 : 0.5,
                      transition: 'all 0.2s',
                      '&:hover': { opacity: 1 },
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={IMG_LABELS[i]}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=60' }}
                    />
                  </Box>
                ))}

                {/* 미니맵 - 차량 부위 표시 */}
                <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                  <svg viewBox="0 0 120 50" width="120" height="50" fill="none">
                    <path d="M10 35 L10 22 Q12 16 20 12 L50 8 L70 8 L100 12 Q108 16 110 22 L110 35 Z" fill="none" stroke="#4A4A4A" strokeWidth="1" />
                    {[
                      { x: 25, y: 20, label: '정면', idx: 0 },
                      { x: 60, y: 18, label: '내부', idx: 1 },
                      { x: 88, y: 30, label: '휠', idx: 2 },
                      { x: 95, y: 20, label: '후면', idx: 3 },
                    ].map(pt => (
                      <g key={pt.idx} onClick={() => setImgIdx(pt.idx)} style={{ cursor: 'pointer' }}>
                        <circle cx={pt.x} cy={pt.y} r="4" fill={imgIdx === pt.idx ? '#A68966' : '#333'} stroke={imgIdx === pt.idx ? '#A68966' : '#4A4A4A'} strokeWidth="0.5" />
                      </g>
                    ))}
                  </svg>
                  <Typography sx={{ color: '#4A4A4A', fontSize: '0.7rem' }}>미니맵</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
