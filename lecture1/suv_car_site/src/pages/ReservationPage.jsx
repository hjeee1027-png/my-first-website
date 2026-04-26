import { useState } from 'react'
import { Box, Container, Typography, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stepper, Step, StepLabel, Alert, CircularProgress, Chip, Divider } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { CARS, BRANCHES, formatPrice, getDiscountedPrice, CAR_COLORS, WHEEL_OPTIONS } from '../data/mockData'
import { useAuth } from '../hooks/useAuth'
import { createReservation } from '../utils/supabase'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PersonIcon from '@mui/icons-material/Person'

const STEPS = ['차량 선택', '지점 및 날짜', '개인정보', '완료']

const TODAY = new Date()
const MIN_DATE = new Date(TODAY.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
const MAX_DATE = new Date(TODAY.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

export default function ReservationPage() {
  const { state } = useLocation()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [selectedCar, setSelectedCar] = useState(state?.car || CARS[0])
  const [selectedColor, setSelectedColor] = useState(state?.color?.id || 'abyss_black')
  const [selectedWheel, setSelectedWheel] = useState(state?.wheel?.id || 'w22_sport')
  const [branch, setBranch] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [form, setForm] = useState({
    name: user?.user_metadata?.display_name || '',
    phone: user?.user_metadata?.phone || '',
    email: user?.email || '',
    message: '',
  })
  const [type] = useState(state?.type || 'reservation')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [resId, setResId] = useState(null)

  const TIME_SLOTS = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

  const color = CAR_COLORS.find(c => c.id === selectedColor)
  const wheel = WHEEL_OPTIONS.find(w => w.id === selectedWheel)
  const finalPrice = getDiscountedPrice(selectedCar.base_price, selectedCar.discount_rate) + (wheel?.price || 0)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const validateStep = () => {
    if (step === 0) {
      if (!selectedCar) return '차량을 선택해주세요.'
    }
    if (step === 1) {
      if (!branch) return '지점을 선택해주세요.'
      if (!date) return '날짜를 선택해주세요.'
      if (!timeSlot) return '시간을 선택해주세요.'
    }
    if (step === 2) {
      if (!form.name) return '이름을 입력해주세요.'
      if (!form.phone) return '연락처를 입력해주세요.'
      if (!form.email) return '이메일을 입력해주세요.'
    }
    return null
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setLoading(true); setError('')
    try {
      const resData = {
        user_id: user?.id || null,
        car_id: selectedCar.car_id,
        branch_name: branch,
        res_date: `${date}T${timeSlot}:00`,
        status: '상담신청',
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email,
        color_option: selectedColor,
        wheel_option: selectedWheel,
        message: form.message,
        type,
      }
      try {
        const res = await createReservation(resData)
        setResId(res?.id || 'VTG' + Date.now())
      } catch {
        setResId('VTG' + Date.now())
      }
      setDone(true)
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8', pt: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: '5rem', color: '#A68966', mb: 3 }} />
          <Typography variant="h4" sx={{ color: '#111', fontWeight: 700, mb: 2 }}>
            {type === 'quote' ? '견적 문의 완료!' : '시승 예약 완료!'}
          </Typography>
          <Typography sx={{ color: '#666', mb: 1, fontSize: '0.95rem' }}>
            예약 번호: <Box component="span" sx={{ color: '#A68966', fontWeight: 600 }}>{resId}</Box>
          </Typography>
          <Typography sx={{ color: '#666', mb: 4, fontSize: '0.875rem', lineHeight: 1.8 }}>
            {form.name}님의 {type === 'quote' ? '견적 문의' : `${branch} ${date} ${timeSlot} 시승 예약`}이 접수되었습니다.<br />
            담당자가 24시간 내에 연락드릴 예정입니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" sx={{ borderColor: '#111', color: '#111', px: 4, py: 1.5, '&:hover': { bgcolor: '#111', color: '#fff' } }} onClick={() => navigate('/')}>홈으로</Button>
            {user && <Button variant="contained" sx={{ bgcolor: '#A68966', color: '#fff', border: 'none', px: 4, py: 1.5, '&:hover': { bgcolor: '#96795a' } }} onClick={() => navigate('/mypage')}>예약 확인</Button>}
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', pt: '72px' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 6 }, py: 6 }}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
            {type === 'quote' ? 'QUOTE REQUEST' : 'TEST DRIVE'}
          </Typography>
          <Typography variant="h3" sx={{ color: '#111', fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.875rem' } }}>
            {type === 'quote' ? '견적 문의' : '시승 예약'}
          </Typography>
        </Box>

        {/* 스텝 인디케이터 */}
        <Stepper activeStep={step} sx={{ mb: 6, px: { xs: 0, md: 4 } }}>
          {STEPS.slice(0, 3).map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{ sx: { '&.Mui-active': { color: '#A68966' }, '&.Mui-completed': { color: '#A68966' } } }}
                sx={{ '.MuiStepLabel-label': { color: '#999', '&.Mui-active': { color: '#111' }, '&.Mui-completed': { color: '#A68966' } } }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          {/* 메인 폼 */}
          <Grid item xs={12} md={7}>
            <Box sx={{ bgcolor: '#fff', border: '1px solid #e0e0e0', p: { xs: 3, md: 4 } }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 0 }}>
                  {error}
                </Alert>
              )}

              {/* 스텝 0: 차량 선택 */}
              {step === 0 && (
                <Box>
                  <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DirectionsCarIcon fontSize="small" /> 차량 선택
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    {CARS.map(car => (
                      <Box
                        key={car.id}
                        onClick={() => setSelectedCar(car)}
                        sx={{
                          p: 2, border: `1px solid ${selectedCar.id === car.id ? '#A68966' : '#e0e0e0'}`,
                          cursor: 'pointer', display: 'flex', gap: 2, alignItems: 'center',
                          bgcolor: selectedCar.id === car.id ? 'rgba(166,137,102,0.05)' : 'transparent',
                          transition: 'border-color 0.2s',
                          userSelect: 'none',
                          '&:hover': { borderColor: 'rgba(166,137,102,0.5)' },
                        }}
                      >
                        <Box component="img" src={car.thumbnail_url} alt={car.model_name} sx={{ width: 80, height: 55, objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400' }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ color: '#111', fontWeight: 600, fontSize: '0.9rem' }}>{car.model_name}</Typography>
                          <Typography sx={{ color: '#888', fontSize: '0.8rem' }}>{car.fuel_type} · {car.year}</Typography>
                        </Box>
                        <Typography sx={{ color: '#A68966', fontWeight: 600, fontSize: '0.9rem' }}>
                          {formatPrice(getDiscountedPrice(car.base_price, car.discount_rate))}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>색상 선택</Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                    {CAR_COLORS.filter(c => selectedCar.color_options.includes(c.id)).map(c => (
                      <Box key={c.id} onClick={() => setSelectedColor(c.id)} sx={{ width: 28, height: 28, bgcolor: c.hex, border: `2px solid ${selectedColor === c.id ? '#A68966' : '#e0e0e0'}`, cursor: 'pointer', transition: 'border-color 0.2s', userSelect: 'none' }} title={c.nameKo} />
                    ))}
                  </Box>

                  <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>휠 선택</Typography>
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {WHEEL_OPTIONS.map(w => (
                      <Grid item xs={6} key={w.id}>
                        <Box onClick={() => setSelectedWheel(w.id)} sx={{ p: 1.5, border: `1px solid ${selectedWheel === w.id ? '#A68966' : '#e0e0e0'}`, cursor: 'pointer', bgcolor: selectedWheel === w.id ? 'rgba(166,137,102,0.05)' : 'transparent', transition: 'border-color 0.2s', userSelect: 'none' }}>
                          <Typography sx={{ color: '#111', fontSize: '0.8rem', fontWeight: 500 }}>{w.name}</Typography>
                          <Typography sx={{ color: '#A68966', fontSize: '0.75rem' }}>+{formatPrice(w.price)}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* 스텝 1: 지점/날짜 */}
              {step === 1 && (
                <Box>
                  <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonthIcon fontSize="small" /> 지점 및 날짜 선택
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>희망 지점</InputLabel>
                    <Select value={branch} onChange={(e) => setBranch(e.target.value)} label="희망 지점">
                      {BRANCHES.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TextField fullWidth label="희망 날짜" type="date" value={date} onChange={(e) => setDate(e.target.value)} inputProps={{ min: MIN_DATE, max: MAX_DATE }} InputLabelProps={{ shrink: true }} sx={{ mb: 3 }} />
                  <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.1em', mb: 2 }}>시간 선택</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {TIME_SLOTS.map(t => (
                      <Chip
                        key={t}
                        label={t}
                        onClick={() => setTimeSlot(t)}
                        sx={{
                          bgcolor: timeSlot === t ? 'rgba(166,137,102,0.1)' : 'transparent',
                          color: timeSlot === t ? '#A68966' : '#666',
                          border: `1px solid ${timeSlot === t ? '#A68966' : '#e0e0e0'}`,
                          borderRadius: 0,
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* 스텝 2: 개인정보 */}
              {step === 2 && (
                <Box>
                  <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" /> 개인정보 입력
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField fullWidth label="이름 *" value={form.name} onChange={set('name')} />
                    <TextField fullWidth label="연락처 *" value={form.phone} onChange={set('phone')} placeholder="010-0000-0000" />
                    <TextField fullWidth label="이메일 *" type="email" value={form.email} onChange={set('email')} />
                    <TextField fullWidth label="문의사항 (선택)" multiline rows={3} value={form.message} onChange={set('message')} placeholder="원하시는 옵션이나 궁금한 점을 자유롭게 입력해주세요." />
                  </Box>
                </Box>
              )}

              {/* 버튼 */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                {step > 0 && (
                  <Button variant="outlined" onClick={() => { setStep(s => s - 1); setError('') }} sx={{ borderColor: '#e0e0e0', color: '#111', py: 1.5, flex: 1, '&:hover': { borderColor: '#111' } }}>
                    이전
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={step === 2 ? handleSubmit : handleNext}
                  disabled={loading}
                  sx={{ bgcolor: '#111', color: '#fff', border: 'none', py: 1.5, flex: 2, fontWeight: 700, '&:hover': { bgcolor: '#333' } }}
                >
                  {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : step === 2 ? '예약 완료' : '다음'}
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* 요약 패널 */}
          <Grid item xs={12} md={5}>
            <Box sx={{ bgcolor: '#fff', border: '1px solid #e0e0e0', p: 3 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 3 }}>선택 요약</Typography>

              <Box component="img" src={selectedCar.thumbnail_url} alt={selectedCar.model_name} sx={{ width: '100%', height: 160, objectFit: 'cover', mb: 3 }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800' }} />

              <Typography sx={{ color: '#111', fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>{selectedCar.model_name}</Typography>
              <Typography sx={{ color: '#888', fontSize: '0.8rem', mb: 2 }}>{selectedCar.fuel_type} · {selectedCar.year}</Typography>

              {color && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{ width: 14, height: 14, bgcolor: color.hex, border: '1px solid #e0e0e0' }} />
                  <Typography sx={{ color: '#666', fontSize: '0.85rem' }}>{color.nameKo}</Typography>
                </Box>
              )}
              {wheel && (
                <Typography sx={{ color: '#666', fontSize: '0.85rem', mb: 3 }}>휠: {wheel.name}</Typography>
              )}

              {branch && (
                <>
                  <Divider sx={{ borderColor: '#e0e0e0', mb: 2 }} />
                  <Typography sx={{ color: '#666', fontSize: '0.85rem', mb: 0.5 }}>{branch}</Typography>
                  {date && <Typography sx={{ color: '#666', fontSize: '0.85rem', mb: 0.5 }}>{date} {timeSlot}</Typography>}
                </>
              )}

              <Divider sx={{ borderColor: '#e0e0e0', my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography sx={{ color: '#888', fontSize: '0.8rem' }}>예상 금액</Typography>
                <Typography sx={{ color: '#A68966', fontWeight: 700, fontSize: '1.3rem' }}>
                  {formatPrice(finalPrice)}
                </Typography>
              </Box>
              <Typography sx={{ color: '#bbb', fontSize: '0.75rem', textAlign: 'right', mt: 0.5 }}>
                부가세 포함 · 최종 견적은 상담 후 확정
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
