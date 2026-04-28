import { useState, useMemo } from 'react'
import {
  Box, Container, Typography, Grid, Card, CardMedia, CardContent,
  Chip, Button, ToggleButton, ToggleButtonGroup, Slider, Select,
  MenuItem, FormControl, InputLabel, TextField, InputAdornment, Divider
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CARS, formatPrice, getDiscountedPrice, CAR_COLORS } from '../data/mockData'

const FUEL_TYPES = ['전체', '하이브리드', '디젤', '가솔린', '전기']
const YEARS = [2024, 2025]
const SORT_OPTIONS = [
  { value: 'default', label: '기본 정렬' },
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
  { value: 'year_desc', label: '최신 연식순' },
  { value: 'efficiency_desc', label: '연비 높은순' },
]

export default function SearchPage() {
  const [params] = useSearchParams()
  const initialQ = params.get('q') || ''
  const [query, setQuery] = useState(initialQ)
  const [fuelFilter, setFuelFilter] = useState('전체')
  const [yearFilter, setYearFilter] = useState([])
  const [priceRange, setPriceRange] = useState([0, 300000000])
  const [promotionOnly, setPromotionOnly] = useState(false)
  const [sort, setSort] = useState('default')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    let cars = [...CARS]
    if (query) cars = cars.filter(c => c.model_name.toLowerCase().includes(query.toLowerCase()) || c.model_name_ko.includes(query) || c.fuel_type.includes(query))
    if (fuelFilter !== '전체') cars = cars.filter(c => c.fuel_type === fuelFilter)
    if (yearFilter.length > 0) cars = cars.filter(c => yearFilter.includes(c.year))
    cars = cars.filter(c => c.base_price >= priceRange[0] && c.base_price <= priceRange[1])
    if (promotionOnly) cars = cars.filter(c => c.is_promotion)
    if (sort === 'price_asc') cars.sort((a, b) => a.base_price - b.base_price)
    else if (sort === 'price_desc') cars.sort((a, b) => b.base_price - a.base_price)
    else if (sort === 'year_desc') cars.sort((a, b) => b.year - a.year)
    else if (sort === 'efficiency_desc') cars.sort((a, b) => b.efficiency - a.efficiency)
    return cars
  }, [query, fuelFilter, yearFilter, priceRange, promotionOnly, sort])

  const toggleYear = (year) => setYearFilter(y => y.includes(year) ? y.filter(v => v !== year) : [...y, year])

  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', pt: '72px' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 }, py: 6 }}>
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>EXPLORE</Typography>
            <Typography variant="h3" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.875rem' }, mb: 1 }}>
              전체 모델
            </Typography>
            <Typography sx={{ color: '#888', fontSize: '0.9rem' }}>
              {filtered.length}개의 차량이 검색되었습니다
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#fff', color: '#666', border: '1px solid #e0e0e0', borderRadius: 0, fontSize: '0.85rem' }}
            >
              {SORT_OPTIONS.map(o => (
                <MenuItem key={o.value} value={o.value} sx={{ fontSize: '0.85rem' }}>{o.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={4}>
          {/* 필터 패널 */}
          <Grid item xs={12} md={2.5}>
            <Box>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>검색</Typography>
              <TextField
                fullWidth
                placeholder="차량명, 색상 등"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="small"
                sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#aaa', fontSize: '1.1rem' }} /></InputAdornment> }}
              />

              <Divider sx={{ borderColor: '#e0e0e0', mb: 3 }} />

              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 1.5 }}>연료 타입</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
                {FUEL_TYPES.map(f => (
                  <Chip
                    key={f}
                    label={f}
                    onClick={() => setFuelFilter(f)}
                    size="small"
                    sx={{
                      bgcolor: fuelFilter === f ? 'rgba(166,137,102,0.1)' : 'transparent',
                      color: fuelFilter === f ? '#A68966' : '#666',
                      border: `1px solid ${fuelFilter === f ? '#A68966' : '#e0e0e0'}`,
                      borderRadius: 0,
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ borderColor: '#e0e0e0', mb: 3 }} />

              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 1.5 }}>출시 연도</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                {YEARS.map(y => (
                  <Chip
                    key={y}
                    label={y}
                    onClick={() => toggleYear(y)}
                    size="small"
                    sx={{
                      bgcolor: yearFilter.includes(y) ? 'rgba(166,137,102,0.1)' : 'transparent',
                      color: yearFilter.includes(y) ? '#A68966' : '#666',
                      border: `1px solid ${yearFilter.includes(y) ? '#A68966' : '#e0e0e0'}`,
                      borderRadius: 0,
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ borderColor: '#e0e0e0', mb: 3 }} />

              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 1 }}>가격대</Typography>
              <Box sx={{ px: 1, mb: 1 }}>
                <Slider
                  value={priceRange}
                  onChange={(_, v) => setPriceRange(v)}
                  min={0}
                  max={300000000}
                  step={10000000}
                  sx={{ color: '#A68966', '& .MuiSlider-thumb': { bgcolor: '#A68966' }, '& .MuiSlider-track': { bgcolor: '#A68966' }, '& .MuiSlider-rail': { bgcolor: '#e0e0e0' } }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ color: '#888', fontSize: '0.75rem' }}>{formatPrice(priceRange[0])}</Typography>
                <Typography sx={{ color: '#888', fontSize: '0.75rem' }}>{formatPrice(priceRange[1])}</Typography>
              </Box>

              <Divider sx={{ borderColor: '#e0e0e0', mb: 3 }} />

              <Chip
                label="특가 상품만 보기"
                onClick={() => setPromotionOnly(p => !p)}
                sx={{
                  bgcolor: promotionOnly ? 'rgba(166,137,102,0.1)' : 'transparent',
                  color: promotionOnly ? '#A68966' : '#666',
                  border: `1px solid ${promotionOnly ? '#A68966' : '#e0e0e0'}`,
                  borderRadius: 0,
                  cursor: 'pointer',
                  userSelect: 'none',
                  width: '100%',
                  '& .MuiChip-label': { width: '100%', textAlign: 'center' },
                }}
              />

              <Button
                size="small"
                fullWidth
                onClick={() => { setQuery(''); setFuelFilter('전체'); setYearFilter([]); setPriceRange([0, 300000000]); setPromotionOnly(false) }}
                sx={{ color: '#888', mt: 2, fontSize: '0.8rem', '&:hover': { color: '#A68966' } }}
              >
                필터 초기화
              </Button>
            </Box>
          </Grid>

          {/* 결과 목록 */}
          <Grid item xs={12} md={9.5}>
            {filtered.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography sx={{ color: '#888', fontSize: '1.1rem', mb: 2 }}>검색 결과가 없습니다</Typography>
                <Typography sx={{ color: '#bbb', fontSize: '0.875rem' }}>다른 검색어나 필터를 사용해 보세요</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filtered.map((car) => (
                  <Grid item xs={12} sm={6} lg={4} key={car.id}>
                    <Card
                      sx={{
                        bgcolor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: 0,
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'border-color 0.2s',
                        '&:hover': { borderColor: '#A68966' },
                      }}
                      onClick={() => navigate('/reservation', { state: { car } })}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          height="220"
                          image={car.thumbnail_url}
                          alt={car.model_name}
                          sx={{ objectFit: 'cover' }}
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80' }}
                        />
                        <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip label={car.fuel_type} size="small" sx={{ bgcolor: 'rgba(0,0,0,0.55)', color: '#fff', borderRadius: 0, fontSize: '0.7rem' }} />
                          {car.badge && (
                            <Chip label={car.badge} size="small" sx={{ bgcolor: '#111', color: '#fff', fontWeight: 600, fontSize: '0.7rem', borderRadius: 0 }} />
                          )}
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 2.5 }}>
                        <Typography sx={{ color: '#111', fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
                          {car.model_name}
                        </Typography>
                        <Typography sx={{ color: '#888', fontSize: '0.8rem', mb: 2 }}>
                          {car.year} · {car.fuel_type} · 연비 {car.efficiency}km/kWh
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 0.8, mb: 2.5 }}>
                          {car.color_options.slice(0, 4).map((cid) => {
                            const c = CAR_COLORS.find(x => x.id === cid)
                            return c ? (
                              <Box key={cid} sx={{ width: 14, height: 14, bgcolor: c.hex, border: '1px solid #e0e0e0' }} title={c.nameKo} />
                            ) : null
                          })}
                        </Box>

                        <Divider sx={{ borderColor: '#e0e0e0', mb: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <Box>
                            {car.discount_rate > 0 && (
                              <Typography sx={{ color: '#bbb', fontSize: '0.75rem', textDecoration: 'line-through', lineHeight: 1 }}>
                                {formatPrice(car.base_price)}
                              </Typography>
                            )}
                            <Typography sx={{ color: '#111', fontWeight: 700, fontSize: '1.1rem' }}>
                              {formatPrice(getDiscountedPrice(car.base_price, car.discount_rate))}
                            </Typography>
                          </Box>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: '#e0e0e0', color: '#111', fontSize: '0.75rem', px: 1.5, py: 0.5, '&:hover': { borderColor: '#111' } }}
                            onClick={(e) => { e.stopPropagation(); navigate('/reservation', { state: { car } }) }}
                          >
                            시승 예약
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
