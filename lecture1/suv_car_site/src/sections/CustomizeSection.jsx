import { useState, useRef } from 'react'
import { Box, Container, Typography, Grid, Button, TextField, Tooltip, Chip, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'
import CheckIcon from '@mui/icons-material/Check'
import { CARS, CAR_COLORS, WHEEL_OPTIONS, formatPrice, getDiscountedPrice } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const MODELS = CARS.map(c => ({ id: c.id, name: c.model_name, shortName: c.model_name.replace('VANTAGE ', ''), basePrice: c.base_price, discountRate: c.discount_rate }))

export default function CustomizeSection() {
  const [selectedModel, setSelectedModel] = useState(0)
  const [selectedColor, setSelectedColor] = useState('abyss_black')
  const [selectedWheel, setSelectedWheel] = useState('w22_sport')
  const [monogram, setMonogram] = useState('')
  const [showMonogram, setShowMonogram] = useState(false)
  const [shareMsg, setShareMsg] = useState('')
  const navigate = useNavigate()
  const previewRef = useRef(null)

  const model = MODELS[selectedModel]
  const color = CAR_COLORS.find(c => c.id === selectedColor)
  const wheel = WHEEL_OPTIONS.find(w => w.id === selectedWheel)
  const finalPrice = getDiscountedPrice(model.basePrice, model.discountRate) + (wheel?.price || 0)

  const handleShare = () => {
    const text = `VANTAGE ${model.name} / ${color.nameKo} / ${wheel.name} - 나만의 VANTAGE를 구성했습니다!`
    if (navigator.share) {
      navigator.share({ title: 'VANTAGE 커스터마이징', text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(text)
      setShareMsg('링크가 복사되었습니다!')
      setTimeout(() => setShareMsg(''), 2000)
    }
  }

  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 8, md: 12 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>
            CONFIGURE
          </Typography>
          <Typography variant="h2" sx={{ color: '#111', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
            나만의 VANTAGE
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
            색상, 휠, 이니셜 각인까지. 당신만을 위한 ONE-OF-A-KIND를 완성하세요.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 왼쪽 옵션 패널 (30%) */}
          <Grid item xs={12} md={3.6}>
            {/* 모델 선택 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                01. 모델 선택
              </Typography>
              {MODELS.map((m, i) => (
                <Box
                  key={m.id}
                  onClick={() => setSelectedModel(i)}
                  sx={{
                    p: 2,
                    mb: 1,
                    border: `1px solid ${selectedModel === i ? '#A68966' : '#e0e0e0'}`,
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    bgcolor: selectedModel === i ? 'rgba(166,137,102,0.06)' : 'transparent',
                    transition: 'border-color 0.2s',
                    userSelect: 'none',
                    '&:hover': { borderColor: 'rgba(166,137,102,0.6)' },
                  }}
                >
                  <Box>
                    <Typography sx={{ color: selectedModel === i ? '#111' : '#888', fontSize: '0.875rem', fontWeight: selectedModel === i ? 600 : 400 }}>
                      {m.shortName}
                    </Typography>
                  </Box>
                  {selectedModel === i && <CheckIcon sx={{ color: '#A68966', fontSize: '1rem' }} />}
                </Box>
              ))}
            </Box>

            {/* 색상 선택 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                02. 색상 선택
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
                {CAR_COLORS.map((c) => (
                  <Tooltip key={c.id} title={c.nameKo} placement="top">
                    <Box
                      onClick={() => setSelectedColor(c.id)}
                      sx={{
                        width: 32, height: 32,
                        bgcolor: c.hex,
                        border: selectedColor === c.id ? '2px solid #A68966' : '2px solid #e0e0e0',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                        userSelect: 'none',
                      }}
                    >
                      {selectedColor === c.id && (
                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckIcon sx={{ color: c.hex === '#F5F5F5' || c.hex === '#8A8A8A' ? '#333' : '#fff', fontSize: '0.9rem' }} />
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
              <Typography sx={{ color: '#666', fontSize: '0.8rem', mt: 1 }}>{color?.nameKo}</Typography>
            </Box>

            {/* 휠 선택 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                03. 휠 선택
              </Typography>
              {WHEEL_OPTIONS.map((w) => (
                <Box
                  key={w.id}
                  onClick={() => setSelectedWheel(w.id)}
                  sx={{
                    p: 1.5,
                    mb: 1,
                    border: `1px solid ${selectedWheel === w.id ? '#A68966' : '#e0e0e0'}`,
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    bgcolor: selectedWheel === w.id ? 'rgba(166,137,102,0.06)' : 'transparent',
                    '&:hover': { borderColor: 'rgba(166,137,102,0.6)' },
                    transition: 'border-color 0.2s',
                    userSelect: 'none',
                  }}
                >
                  <Box>
                    <Typography sx={{ color: selectedWheel === w.id ? '#111' : '#888', fontSize: '0.85rem', fontWeight: selectedWheel === w.id ? 600 : 400 }}>
                      {w.name}
                    </Typography>
                    <Typography sx={{ color: '#A68966', fontSize: '0.75rem' }}>
                      +{formatPrice(w.price)}
                    </Typography>
                  </Box>
                  {selectedWheel === w.id && <CheckIcon sx={{ color: '#A68966', fontSize: '1rem' }} />}
                </Box>
              ))}
            </Box>

            {/* 이니셜 각인 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                04. 이니셜 각인 서비스
              </Typography>
              <TextField
                fullWidth
                placeholder="이니셜 입력 (최대 4자)"
                value={monogram}
                onChange={(e) => {
                  if (e.target.value.length <= 4) setMonogram(e.target.value.toUpperCase())
                }}
                size="small"
                sx={{ mb: 1.5 }}
              />
              <Button
                variant="outlined"
                fullWidth
                size="small"
                onClick={() => setShowMonogram(!!monogram)}
                sx={{ borderColor: '#e0e0e0', color: '#666', '&:hover': { borderColor: '#A68966', color: '#A68966' }, py: 1 }}
              >
                미리보기 적용
              </Button>
            </Box>
          </Grid>

          {/* 오른쪽 프리뷰 (70%) */}
          <Grid item xs={12} md={8.4}>
            <Box
              ref={previewRef}
              sx={{
                bgcolor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                p: { xs: 3, md: 4 },
              }}
            >
              {/* 차량 렌더링 미리보기 */}
              <Box sx={{ position: 'relative', mb: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-block',
                    position: 'relative',
                    width: '100%',
                    maxWidth: 600,
                  }}
                >
                  <svg viewBox="0 0 700 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxHeight: 280, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}>
                    <ellipse cx="350" cy="265" rx="260" ry="18" fill="rgba(0,0,0,0.08)" />
                    <path d="M80 200 L80 135 Q85 112 125 95 L210 72 Q245 62 300 58 L400 58 Q455 62 490 72 L580 95 Q615 112 620 135 L620 200 Z" fill={color?.hex || '#c8c8c8'} />
                    <path d="M95 155 Q200 145 350 142 Q500 145 605 155" stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" fill="none" />
                    <path d="M195 95 Q240 52 320 44 L380 44 Q460 52 505 95" fill={color?.hex || '#c8c8c8'} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                    <path d="M192 97 Q238 58 320 48 L320 97 Z" fill="rgba(100,160,220,0.2)" stroke="rgba(166,137,102,0.3)" strokeWidth="0.8" />
                    <path d="M508 97 Q462 58 380 48 L380 97 Z" fill="rgba(100,160,220,0.2)" stroke="rgba(166,137,102,0.3)" strokeWidth="0.8" />
                    <rect x="330" y="62" width="90" height="35" rx="2" fill="rgba(100,160,220,0.15)" stroke="rgba(166,137,102,0.25)" strokeWidth="0.8" />
                    <line x1="322" y1="97" x2="322" y2="196" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
                    <line x1="432" y1="97" x2="432" y2="196" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
                    <rect x="83" y="148" width="28" height="38" rx="1" fill="rgba(40,40,40,0.8)" stroke="#A68966" strokeWidth="0.8" />
                    {[0,1,2,3,4].map(i => <line key={i} x1="86" y1={152 + i * 7} x2="108" y2={152 + i * 7} stroke="#A68966" strokeWidth="0.4" opacity="0.5" />)}
                    <path d="M82 128 Q90 118 115 115 L132 118 Q120 125 82 135 Z" fill="rgba(255,240,190,0.08)" stroke="#A68966" strokeWidth="0.8" />
                    <path d="M86 128 Q93 120 112 118 L126 121 Q116 126 86 133 Z" fill="rgba(255,240,190,0.4)" />
                    <path d="M618 128 Q610 118 585 115 L568 118 Q580 125 618 135 Z" fill="rgba(200,40,40,0.1)" stroke="rgba(200,40,40,0.5)" strokeWidth="0.8" />
                    <path d="M614 128 Q607 120 588 118 L574 121 Q584 126 614 133 Z" fill="rgba(200,40,40,0.35)" />
                    <text x="350" y="140" textAnchor="middle" fill="rgba(166,137,102,0.7)" fontSize="11" fontWeight="bold" letterSpacing="4" fontFamily="Roboto, sans-serif">VANTAGE</text>
                    <circle cx="192" cy="203" r="52" fill="#1a1a1a" stroke="#555" strokeWidth="2" />
                    <circle cx="192" cy="203" r="40" fill={color?.hex === '#F5F5F5' ? '#ddd' : '#222'} stroke="#A68966" strokeWidth="1.5" />
                    <circle cx="192" cy="203" r="20" fill="#1a1a1a" />
                    {selectedWheel === 'w23_lux' && [0,45,90,135,180,225,270,315].map((a, i) => <line key={i} x1={192 + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={192 + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#A68966" strokeWidth="2.5" />)}
                    {selectedWheel === 'w22_sport' && [0,60,120,180,240,300].map((a, i) => <line key={i} x1={192 + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={192 + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#C0C0C0" strokeWidth="3" />)}
                    {selectedWheel === 'w21_classic' && [0,72,144,216,288].map((a, i) => <line key={i} x1={192 + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={192 + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#888" strokeWidth="4" />)}
                    {selectedWheel === 'w21_aero' && [0,90,180,270].map((a, i) => <path key={i} d={`M${192 + Math.cos(a * Math.PI/180) * 20} ${203 + Math.sin(a * Math.PI/180) * 20} Q${192 + Math.cos((a+30) * Math.PI/180) * 32} ${203 + Math.sin((a+30) * Math.PI/180) * 32} ${192 + Math.cos((a+45) * Math.PI/180) * 39} ${203 + Math.sin((a+45) * Math.PI/180) * 39}`} stroke="#A68966" strokeWidth="2" fill="none" />)}
                    <circle cx="508" cy="203" r="52" fill="#1a1a1a" stroke="#555" strokeWidth="2" />
                    <circle cx="508" cy="203" r="40" fill={color?.hex === '#F5F5F5' ? '#ddd' : '#222'} stroke="#A68966" strokeWidth="1.5" />
                    <circle cx="508" cy="203" r="20" fill="#1a1a1a" />
                    {selectedWheel === 'w23_lux' && [0,45,90,135,180,225,270,315].map((a, i) => <line key={i} x1={508 + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={508 + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#A68966" strokeWidth="2.5" />)}
                    {selectedWheel === 'w22_sport' && [0,60,120,180,240,300].map((a, i) => <line key={i} x1={508 + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={508 + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#C0C0C0" strokeWidth="3" />)}
                    {selectedWheel === 'w21_classic' && [0,72,144,216,288].map((a, i) => <line key={i} x1={508 + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={508 + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#888" strokeWidth="4" />)}
                    {selectedWheel === 'w21_aero' && [0,90,180,270].map((a, i) => <path key={i} d={`M${508 + Math.cos(a * Math.PI/180) * 20} ${203 + Math.sin(a * Math.PI/180) * 20} Q${508 + Math.cos((a+30) * Math.PI/180) * 32} ${203 + Math.sin((a+30) * Math.PI/180) * 32} ${508 + Math.cos((a+45) * Math.PI/180) * 39} ${203 + Math.sin((a+45) * Math.PI/180) * 39}`} stroke="#A68966" strokeWidth="2" fill="none" />)}
                    {showMonogram && monogram && (
                      <text x="350" y="190" textAnchor="middle" fill="rgba(166,137,102,0.85)" fontSize="22" fontWeight="bold" letterSpacing="6" fontFamily="Roboto, sans-serif" style={{ fontStyle: 'italic' }}>
                        {monogram}
                      </text>
                    )}
                    {showMonogram && monogram && (
                      <text x="350" y="215" textAnchor="middle" fill="rgba(166,137,102,0.4)" fontSize="9" letterSpacing="2" fontFamily="Roboto, sans-serif">
                        PERSONAL EDITION
                      </text>
                    )}
                  </svg>
                </Box>

                {showMonogram && monogram && (
                  <Chip
                    label={`이니셜 "${monogram}" 적용됨 - 도어 스텝 각인`}
                    sx={{ bgcolor: 'rgba(166,137,102,0.08)', color: '#A68966', border: '1px solid rgba(166,137,102,0.3)', borderRadius: 0, mt: 1, fontSize: '0.75rem' }}
                  />
                )}
              </Box>

              {/* 선택 요약 + 가격 */}
              <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 3 }}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ color: '#666', fontSize: '0.75rem', letterSpacing: '0.1em', mb: 0.5 }}>모델</Typography>
                    <Typography sx={{ color: '#111', fontSize: '0.9rem', fontWeight: 500 }}>{model.shortName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ color: '#666', fontSize: '0.75rem', letterSpacing: '0.1em', mb: 0.5 }}>색상</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 14, height: 14, bgcolor: color?.hex, border: '1px solid #e0e0e0' }} />
                      <Typography sx={{ color: '#111', fontSize: '0.9rem', fontWeight: 500 }}>{color?.nameKo}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ color: '#666', fontSize: '0.75rem', letterSpacing: '0.1em', mb: 0.5 }}>휠</Typography>
                    <Typography sx={{ color: '#111', fontSize: '0.9rem', fontWeight: 500 }}>{wheel?.name}</Typography>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
                  <Box>
                    <Typography sx={{ color: '#666', fontSize: '0.75rem', letterSpacing: '0.1em', mb: 0.5 }}>예상 금액</Typography>
                    <Typography sx={{ color: '#A68966', fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
                      {formatPrice(finalPrice)}
                    </Typography>
                    <Typography sx={{ color: '#999', fontSize: '0.75rem' }}>
                      부가세 포함 · 옵션 추가 금액 별도
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleShare} sx={{ color: '#666', '&:hover': { color: '#A68966' }, border: '1px solid #e0e0e0' }}>
                      <ShareIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ color: '#666', '&:hover': { color: '#A68966' }, border: '1px solid #e0e0e0' }}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {shareMsg && (
                  <Typography sx={{ color: '#A68966', fontSize: '0.8rem', mb: 2 }}>{shareMsg}</Typography>
                )}

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/reservation', { state: { car: CARS[selectedModel], color, wheel } })}
                    sx={{ bgcolor: '#111', color: '#fff', border: 'none', '&:hover': { bgcolor: '#333' }, py: 1.8, fontWeight: 600 }}
                  >
                    이 구성으로 시승 예약
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/reservation', { state: { car: CARS[selectedModel], color, wheel, type: 'quote' } })}
                    sx={{ borderColor: '#111', color: '#111', py: 1.8, '&:hover': { bgcolor: '#111', color: '#fff' } }}
                  >
                    견적 문의
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
