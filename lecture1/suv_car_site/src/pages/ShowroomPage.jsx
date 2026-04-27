import { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, TextField, InputAdornment } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PhoneIcon from '@mui/icons-material/Phone'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import SearchIcon from '@mui/icons-material/Search'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { SHOWROOMS } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const CITIES = ['전체', '서울', '부산', '대구', '인천', '광주']

export default function ShowroomPage() {
  const [selectedCity, setSelectedCity] = useState('전체')
  const [selectedId, setSelectedId] = useState(null)
  const [query, setQuery] = useState('')
  const [locating, setLocating] = useState(false)
  const navigate = useNavigate()

  const filtered = SHOWROOMS.filter(s => {
    const cityMatch = selectedCity === '전체' || s.city === selectedCity
    const queryMatch = !query || s.name.includes(query) || s.address.includes(query)
    return cityMatch && queryMatch
  })

  const handleGeolocate = () => {
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      () => {
        setTimeout(() => {
          setSelectedCity('서울')
          setLocating(false)
        }, 800)
      },
      () => {
        setLocating(false)
        alert('위치 권한을 허용해주세요.')
      }
    )
  }

  const selected = SHOWROOMS.find(s => s.id === selectedId)

  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', pt: '72px' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 }, py: 6 }}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>SHOWROOM</Typography>
          <Typography variant="h3" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.875rem' }, mb: 2 }}>
            전시장 안내
          </Typography>
          <Typography sx={{ color: '#888', fontSize: '0.9rem' }}>
            가까운 VANTAGE 전시장을 방문해 직접 경험해 보세요
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 지도 영역 */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                bgcolor: '#f0f0f0',
                height: { xs: 300, md: 500 },
                border: '1px solid #e0e0e0',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />

              {SHOWROOMS.map((s) => {
                const normalizedLat = (s.lat - 35) / (37.7 - 35)
                const normalizedLng = (s.lng - 126.5) / (129.2 - 126.5)
                const top = 80 - normalizedLat * 60
                const left = normalizedLng * 80 + 10
                return (
                  <Box
                    key={s.id}
                    onClick={() => setSelectedId(s.id === selectedId ? null : s.id)}
                    sx={{
                      position: 'absolute',
                      top: `${top}%`,
                      left: `${left}%`,
                      cursor: 'pointer',
                      zIndex: 2,
                      transform: 'translate(-50%, -100%)',
                      userSelect: 'none',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box
                        sx={{
                          bgcolor: selectedId === s.id ? '#A68966' : '#fff',
                          border: `2px solid ${selectedId === s.id ? '#A68966' : 'rgba(166,137,102,0.6)'}`,
                          borderRadius: '50% 50% 50% 0',
                          transform: 'rotate(-45deg)',
                          width: 28,
                          height: 28,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: '1rem', color: selectedId === s.id ? '#fff' : '#A68966', transform: 'rotate(45deg)' }} />
                      </Box>
                      {selectedId === s.id && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -70,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: '#fff',
                            border: '1px solid #e0e0e0',
                            px: 1.5, py: 1,
                            whiteSpace: 'nowrap',
                            zIndex: 3,
                          }}
                        >
                          <Typography sx={{ color: '#111', fontSize: '0.75rem', fontWeight: 600 }}>{s.name}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )
              })}

              <Box
                sx={{
                  position: 'absolute', top: '10%', left: '20%',
                  color: 'rgba(0,0,0,0.07)', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.2em',
                  pointerEvents: 'none', userSelect: 'none',
                }}
              >
                KOREA
              </Box>

              <Box sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(255,255,255,0.9)', px: 2, py: 1, border: '1px solid #e0e0e0' }}>
                <Typography sx={{ color: '#aaa', fontSize: '0.7rem' }}>카카오맵 API 연동 예정</Typography>
              </Box>
            </Box>
          </Grid>

          {/* 전시장 목록 */}
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="지역 또는 지점명 검색"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#bbb', fontSize: '1rem' }} /></InputAdornment> }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  disabled={locating}
                  onClick={handleGeolocate}
                  sx={{ borderColor: '#e0e0e0', color: '#666', whiteSpace: 'nowrap', px: 1.5, '&:hover': { borderColor: '#A68966', color: '#A68966' } }}
                  startIcon={<MyLocationIcon fontSize="small" />}
                >
                  내 주변
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {CITIES.map(c => (
                  <Chip
                    key={c}
                    label={c}
                    onClick={() => setSelectedCity(c)}
                    size="small"
                    sx={{
                      bgcolor: selectedCity === c ? 'rgba(166,137,102,0.1)' : 'transparent',
                      color: selectedCity === c ? '#A68966' : '#666',
                      border: `1px solid ${selectedCity === c ? '#A68966' : '#e0e0e0'}`,
                      borderRadius: 0,
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ maxHeight: 420, overflow: 'auto', pr: 0.5 }}>
              {filtered.map(s => (
                <Card
                  key={s.id}
                  onClick={() => setSelectedId(s.id === selectedId ? null : s.id)}
                  sx={{
                    bgcolor: selectedId === s.id ? 'rgba(166,137,102,0.05)' : '#fff',
                    border: `1px solid ${selectedId === s.id ? '#A68966' : '#e0e0e0'}`,
                    borderRadius: 0,
                    mb: 1.5,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'rgba(166,137,102,0.5)' },
                  }}
                >
                  <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Typography sx={{ color: '#111', fontWeight: 600, fontSize: '0.95rem' }}>{s.name}</Typography>
                      {s.parking && (
                        <Chip label="주차 가능" size="small" icon={<LocalParkingIcon />} sx={{ bgcolor: 'rgba(0,150,100,0.08)', color: '#2e7d32', border: '1px solid rgba(0,150,100,0.2)', borderRadius: 0, fontSize: '0.7rem' }} />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 1 }}>
                      <LocationOnIcon sx={{ color: '#ccc', fontSize: '0.95rem', mt: 0.1, flexShrink: 0 }} />
                      <Typography sx={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.5 }}>{s.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon sx={{ color: '#ccc', fontSize: '0.9rem', flexShrink: 0 }} />
                      <Typography sx={{ color: '#666', fontSize: '0.8rem' }}>{s.hours}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <PhoneIcon sx={{ color: '#ccc', fontSize: '0.9rem', flexShrink: 0 }} />
                      <Typography
                        component="a"
                        href={`tel:${s.phone.replace(/-/g, '')}`}
                        sx={{ color: '#A68966', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {s.phone}
                      </Typography>
                    </Box>

                    {selectedId === s.id && (
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={(e) => { e.stopPropagation(); navigate('/reservation', { state: { branch: s.name } }) }}
                          sx={{ bgcolor: '#111', color: '#fff', border: 'none', fontSize: '0.75rem', py: 0.8, flex: 1, '&:hover': { bgcolor: '#333' } }}
                        >
                          시승 예약
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={(e) => { e.stopPropagation(); window.open(`tel:${s.phone.replace(/-/g, '')}`) }}
                          sx={{ borderColor: '#e0e0e0', color: '#666', fontSize: '0.75rem', py: 0.8, flex: 1, '&:hover': { borderColor: '#111' } }}
                        >
                          전화 문의
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
