import { useState, useRef } from 'react'
import { Box, Container, Typography, Grid, Button, TextField, Tooltip, Chip, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'
import CheckIcon from '@mui/icons-material/Check'
import { CARS, CAR_COLORS, WHEEL_OPTIONS, formatPrice, getDiscountedPrice } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const MODELS = CARS.map(c => ({ id: c.id, name: c.model_name, shortName: c.model_name.replace('VANTAGE ', ''), basePrice: c.base_price, discountRate: c.discount_rate }))

// 모델별 차량 실루엣 SVG 데이터
const CAR_SHAPES = [
  {
    // 0: Pinnacle VII — Range Rover L460 스타일 (장축 럭셔리, 부드러운 곡선)
    w1x: 192, w2x: 508,
    body: 'M85 200 L85 138 Q88 114 127 97 L210 73 Q248 63 302 59 L398 59 Q452 63 490 73 L573 97 Q612 114 615 138 L615 200 Z',
    cabin: 'M205 97 Q248 54 318 46 L382 46 Q452 54 495 97',
    glassL: 'M207 97 Q246 58 314 50 L314 97 Z',
    glassR: 'M493 97 Q454 58 386 50 L386 97 Z',
    glassC: null,
    pillarL: { x1: 322, y1: 97, x2: 322, y2: 196 },
    pillarR: { x1: 432, y1: 97, x2: 432, y2: 196 },
    headOuter: 'M86 128 Q92 118 116 115 L130 118 Q120 125 86 136 Z',
    headInner: 'M88 128 Q94 120 113 117 L124 120 Q116 124 88 134 Z',
    rearOuter: 'M614 128 Q607 118 584 115 L570 118 Q580 125 614 136 Z',
    rearInner: 'M612 128 Q606 120 585 117 L573 120 Q582 124 612 134 Z',
    textY: 148,
  },
  {
    // 1: Summit V — Defender 110 스타일 (박스형, 수직 기둥, 플랫 루프)
    w1x: 175, w2x: 490,
    body: 'M105 200 L105 162 L103 108 L136 90 L178 80 L490 80 L532 90 L565 108 L565 162 L565 200 Z',
    cabin: 'M188 80 L212 54 L490 54 L490 80',
    glassL: 'M190 80 L212 57 L292 57 L292 80 Z',
    glassR: 'M390 80 L390 57 L490 57 L490 80 Z',
    glassC: 'M294 80 L294 57 L388 57 L388 80 Z',
    pillarL: null,
    pillarR: null,
    headOuter: 'M106 154 L106 110 L132 103 L142 108 L142 152 Z',
    headInner: 'M108 151 L108 113 L130 106 L139 111 L139 149 Z',
    rearOuter: 'M563 154 L563 110 L539 103 L529 108 L529 152 Z',
    rearInner: 'M561 151 L561 113 L541 106 L532 111 L532 149 Z',
    textY: 152,
  },
  {
    // 2: Apex S — Range Rover Evoque 스타일 (쿠페형 경사 루프라인, 스포티)
    w1x: 195, w2x: 505,
    body: 'M90 200 L90 156 Q92 130 121 113 L196 91 Q232 78 282 72 L390 70 Q460 74 514 90 L580 118 Q613 135 614 158 L614 200 Z',
    cabin: 'M192 113 Q228 70 288 60 L372 58 Q448 68 514 113',
    glassL: 'M194 113 Q226 74 284 64 L284 113 Z',
    glassR: 'M512 113 Q462 76 395 62 L395 113 Z',
    glassC: null,
    pillarL: { x1: 293, y1: 113, x2: 293, y2: 196 },
    pillarR: null,
    headOuter: 'M92 145 Q97 133 118 129 L130 133 Q121 138 92 151 Z',
    headInner: 'M94 145 Q98 135 115 131 L126 135 Q117 139 94 149 Z',
    rearOuter: 'M612 158 Q605 142 583 136 L571 140 Q582 147 612 165 Z',
    rearInner: 'M610 158 Q604 144 584 138 L573 142 Q582 148 610 163 Z',
    textY: 150,
  },
  {
    // 3: Crest EV — Discovery 5 스타일 (현대적, 계단형 루프, 대형 유리)
    w1x: 186, w2x: 508,
    body: 'M88 200 L88 148 Q90 122 127 105 L208 80 Q244 68 300 64 L400 64 Q456 68 495 80 L574 107 Q610 128 611 152 L611 200 Z',
    cabin: 'M204 105 Q242 63 314 55 L406 55 Q465 64 495 80 L495 105',
    glassL: 'M206 105 Q240 67 310 57 L310 105 Z',
    glassR: 'M410 105 L410 57 Q455 62 493 80 L493 105 Z',
    glassC: 'M312 105 L312 57 L408 57 L408 105 Z',
    pillarL: null,
    pillarR: null,
    headOuter: 'M90 137 Q96 124 119 120 L131 124 Q121 130 90 143 Z',
    headInner: 'M92 137 Q97 126 116 122 L126 126 Q118 131 92 141 Z',
    rearOuter: 'M609 143 Q602 128 580 122 L568 126 Q579 133 609 149 Z',
    rearInner: 'M607 143 Q601 130 581 124 L571 128 Q580 134 607 148 Z',
    textY: 148,
  },
]

function WheelSpokes({ cx, selectedWheel }) {
  if (selectedWheel === 'w23_lux')
    return [0,45,90,135,180,225,270,315].map((a, i) => (
      <line key={i} x1={cx + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={cx + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#A68966" strokeWidth="2.5" />
    ))
  if (selectedWheel === 'w22_sport')
    return [0,60,120,180,240,300].map((a, i) => (
      <line key={i} x1={cx + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={cx + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#C0C0C0" strokeWidth="3" />
    ))
  if (selectedWheel === 'w21_classic')
    return [0,72,144,216,288].map((a, i) => (
      <line key={i} x1={cx + Math.cos(a * Math.PI/180) * 20} y1={203 + Math.sin(a * Math.PI/180) * 20} x2={cx + Math.cos(a * Math.PI/180) * 39} y2={203 + Math.sin(a * Math.PI/180) * 39} stroke="#888" strokeWidth="4" />
    ))
  if (selectedWheel === 'w21_aero')
    return [0,90,180,270].map((a, i) => (
      <path key={i} d={`M${cx + Math.cos(a * Math.PI/180) * 20} ${203 + Math.sin(a * Math.PI/180) * 20} Q${cx + Math.cos((a+30) * Math.PI/180) * 32} ${203 + Math.sin((a+30) * Math.PI/180) * 32} ${cx + Math.cos((a+45) * Math.PI/180) * 39} ${203 + Math.sin((a+45) * Math.PI/180) * 39}`} stroke="#A68966" strokeWidth="2" fill="none" />
    ))
  return null
}

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
  const shape = CAR_SHAPES[selectedModel]

  const lightWheel = color?.hex === '#F5F5F5' || color?.hex === '#8A8A8A'

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
          <Typography variant="h2" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>
            나만의 VANTAGE
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
            색상, 휠, 이니셜 각인까지. 당신만을 위한 ONE-OF-A-KIND를 완성하세요.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 왼쪽 옵션 패널 */}
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
                    p: 2, mb: 1,
                    border: `1px solid ${selectedModel === i ? '#A68966' : '#e0e0e0'}`,
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    bgcolor: selectedModel === i ? 'rgba(166,137,102,0.06)' : 'transparent',
                    transition: 'border-color 0.2s',
                    userSelect: 'none',
                    '&:hover': { borderColor: 'rgba(166,137,102,0.6)' },
                  }}
                >
                  <Typography sx={{ color: selectedModel === i ? '#111' : '#888', fontSize: '0.875rem', fontWeight: selectedModel === i ? 600 : 400 }}>
                    {m.shortName}
                  </Typography>
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
                    p: 1.5, mb: 1,
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

          {/* 오른쪽 프리뷰 */}
          <Grid item xs={12} md={8.4}>
            <Box
              ref={previewRef}
              sx={{ bgcolor: '#f5f5f5', border: '1px solid #e0e0e0', p: { xs: 3, md: 4 } }}
            >
              {/* 차량 SVG 프리뷰 */}
              <Box sx={{ position: 'relative', mb: 3, textAlign: 'center' }}>
                <Box sx={{ display: 'inline-block', position: 'relative', width: '100%', maxWidth: 600 }}>
                  <svg
                    viewBox="0 0 700 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', maxHeight: 280, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.13))', transition: 'all 0.35s ease' }}
                  >
                    {/* 그림자 */}
                    <ellipse cx="350" cy="265" rx="255" ry="16" fill="rgba(0,0,0,0.07)" />

                    {/* 차체 */}
                    <path d={shape.body} fill={color?.hex || '#c8c8c8'} />
                    {/* 도어 하이라이트 라인 */}
                    <path d={shape.body} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                    {/* 캐빈/루프 */}
                    <path d={shape.cabin} fill={color?.hex || '#c8c8c8'} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

                    {/* 유리창 — 왼쪽 */}
                    <path d={shape.glassL} fill="rgba(100,160,220,0.2)" stroke="rgba(166,137,102,0.3)" strokeWidth="0.8" />
                    {/* 유리창 — 오른쪽 */}
                    <path d={shape.glassR} fill="rgba(100,160,220,0.2)" stroke="rgba(166,137,102,0.3)" strokeWidth="0.8" />
                    {/* 유리창 — 가운데 (3열 모델) */}
                    {shape.glassC && (
                      <path d={shape.glassC} fill="rgba(100,160,220,0.2)" stroke="rgba(166,137,102,0.3)" strokeWidth="0.8" />
                    )}

                    {/* 필러 라인 */}
                    {shape.pillarL && (
                      <line x1={shape.pillarL.x1} y1={shape.pillarL.y1} x2={shape.pillarL.x2} y2={shape.pillarL.y2} stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
                    )}
                    {shape.pillarR && (
                      <line x1={shape.pillarR.x1} y1={shape.pillarR.y1} x2={shape.pillarR.x2} y2={shape.pillarR.y2} stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
                    )}

                    {/* 전조등 */}
                    <path d={shape.headOuter} fill="rgba(255,240,190,0.08)" stroke="#A68966" strokeWidth="0.8" />
                    <path d={shape.headInner} fill="rgba(255,240,190,0.45)" />

                    {/* 후미등 */}
                    <path d={shape.rearOuter} fill="rgba(200,40,40,0.1)" stroke="rgba(200,40,40,0.5)" strokeWidth="0.8" />
                    <path d={shape.rearInner} fill="rgba(200,40,40,0.38)" />

                    {/* 브랜드 레터링 */}
                    <text x="350" y={shape.textY} textAnchor="middle" fill="rgba(166,137,102,0.55)" fontSize="10" fontWeight="bold" letterSpacing="4" fontFamily="Roboto, sans-serif">VANTAGE</text>

                    {/* 앞바퀴 */}
                    <circle cx={shape.w1x} cy={203} r={52} fill="#1a1a1a" stroke="#555" strokeWidth="2" />
                    <circle cx={shape.w1x} cy={203} r={40} fill={lightWheel ? '#ddd' : '#222'} stroke="#A68966" strokeWidth="1.5" />
                    <circle cx={shape.w1x} cy={203} r={20} fill="#1a1a1a" />
                    <WheelSpokes cx={shape.w1x} selectedWheel={selectedWheel} />

                    {/* 뒷바퀴 */}
                    <circle cx={shape.w2x} cy={203} r={52} fill="#1a1a1a" stroke="#555" strokeWidth="2" />
                    <circle cx={shape.w2x} cy={203} r={40} fill={lightWheel ? '#ddd' : '#222'} stroke="#A68966" strokeWidth="1.5" />
                    <circle cx={shape.w2x} cy={203} r={20} fill="#1a1a1a" />
                    <WheelSpokes cx={shape.w2x} selectedWheel={selectedWheel} />

                    {/* 이니셜 모노그램 */}
                    {showMonogram && monogram && (
                      <>
                        <text x="350" y="185" textAnchor="middle" fill="rgba(166,137,102,0.85)" fontSize="22" fontWeight="bold" letterSpacing="6" fontFamily="Roboto, sans-serif" style={{ fontStyle: 'italic' }}>
                          {monogram}
                        </text>
                        <text x="350" y="205" textAnchor="middle" fill="rgba(166,137,102,0.4)" fontSize="9" letterSpacing="2" fontFamily="Roboto, sans-serif">
                          PERSONAL EDITION
                        </text>
                      </>
                    )}
                  </svg>
                </Box>

                {showMonogram && monogram && (
                  <Chip
                    label={`이니셜 "${monogram}" 적용됨 — 도어 스텝 각인`}
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
                    <Typography sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
                      {formatPrice(finalPrice)}
                    </Typography>
                    <Typography sx={{ color: '#999', fontSize: '0.75rem' }}>부가세 포함 · 옵션 추가 금액 별도</Typography>
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
