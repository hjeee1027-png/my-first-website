import { useState, useRef } from 'react'
import { Box, Container, Typography, Grid, Button, TextField, Tooltip, Chip, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'
import CheckIcon from '@mui/icons-material/Check'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { CARS, CAR_COLORS, WHEEL_OPTIONS, formatPrice, getDiscountedPrice } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const MODELS = CARS.map(c => ({
  id: c.id, name: c.model_name,
  shortName: c.model_name.replace('VANTAGE ', ''),
  basePrice: c.base_price, discountRate: c.discount_rate,
}))

// Color helpers for 3D gradient effect
function tint(hex, pct) {
  if (!hex || hex.length < 7) return '#aaa'
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return `rgb(${Math.round(r+(255-r)*pct)},${Math.round(g+(255-g)*pct)},${Math.round(b+(255-b)*pct)})`
}
function shade(hex, pct) {
  if (!hex || hex.length < 7) return '#555'
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return `rgb(${Math.round(r*(1-pct))},${Math.round(g*(1-pct))},${Math.round(b*(1-pct))})`
}
function isLight(hex) {
  if (!hex || hex.length < 7) return false
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return (r*299 + g*587 + b*114) / 1000 > 160
}

// Side view shape paths per model
const SIDE_SHAPES = [
  { // 0: Pinnacle VII — 장축 럭셔리 SUV
    w1x:192, w2x:508, textY:155,
    body:'M85 205 L85 140 Q88 115 127 97 L210 74 Q248 63 302 59 L398 59 Q452 63 490 73 L573 97 Q612 115 615 140 L615 205 Z',
    cabin:'M205 97 Q248 53 318 45 L382 45 Q452 53 495 97',
    glassL:'M208 97 Q247 57 315 49 L315 97 Z',
    glassR:'M493 97 Q453 57 385 49 L385 97 Z',
    glassC:null,
    pillarL:{x1:323,y1:97,x2:323,y2:200},
    pillarR:{x1:433,y1:97,x2:433,y2:200},
    doorLine:'M230 97 L230 200 M340 97 L340 200 M450 97 L450 200',
    headOuter:'M86 130 Q92 118 116 115 L130 118 Q120 126 86 138 Z',
    headInner:'M88 130 Q94 120 113 117 L124 120 Q116 124 88 136 Z',
    drl:'M88 125 L125 118',
    rearOuter:'M614 130 Q607 118 584 115 L570 118 Q580 126 614 138 Z',
    rearInner:'M612 130 Q606 120 585 117 L572 120 Q581 125 612 135 Z',
  },
  { // 1: Summit V — 박스형 오프로더
    w1x:175, w2x:490, textY:158,
    body:'M105 205 L105 162 L103 108 L136 90 L178 80 L490 80 L532 90 L565 108 L565 162 L565 205 Z',
    cabin:'M188 80 L212 52 L490 52 L490 80',
    glassL:'M190 80 L213 55 L292 55 L292 80 Z',
    glassR:'M390 80 L390 55 L490 55 L490 80 Z',
    glassC:'M294 80 L294 55 L388 55 L388 80 Z',
    pillarL:null, pillarR:null,
    doorLine:'M292 80 L292 200 M390 80 L390 200',
    headOuter:'M106 154 L106 110 L132 103 L142 108 L142 152 Z',
    headInner:'M108 151 L108 113 L130 106 L139 111 L139 149 Z',
    drl:'M108 120 L140 113',
    rearOuter:'M563 154 L563 110 L539 103 L529 108 L529 152 Z',
    rearInner:'M561 151 L561 113 L541 106 L532 111 L532 149 Z',
  },
  { // 2: Apex S — 쿠페형 스포티 SUV
    w1x:195, w2x:505, textY:155,
    body:'M90 205 L90 156 Q92 130 121 114 L196 92 Q232 78 282 72 L390 70 Q460 74 514 91 L580 118 Q613 136 614 158 L614 205 Z',
    cabin:'M192 114 Q228 70 288 60 L372 58 Q448 68 514 114',
    glassL:'M194 114 Q226 74 284 64 L284 114 Z',
    glassR:'M512 114 Q462 76 395 62 L395 114 Z',
    glassC:null,
    pillarL:{x1:293,y1:114,x2:293,y2:200},
    pillarR:{x1:403,y1:114,x2:403,y2:200},
    doorLine:'M350 100 L350 200',
    headOuter:'M92 145 Q97 133 118 129 L130 133 Q121 138 92 151 Z',
    headInner:'M94 145 Q98 135 115 131 L126 135 Q117 139 94 149 Z',
    drl:'M93 137 L128 131',
    rearOuter:'M612 158 Q605 142 583 136 L571 140 Q582 147 612 165 Z',
    rearInner:'M610 158 Q604 144 584 138 L573 142 Q582 148 610 163 Z',
  },
  { // 3: Crest EV — 현대적 대형 전기 SUV
    w1x:186, w2x:508, textY:152,
    body:'M88 205 L88 148 Q90 122 127 105 L208 80 Q244 68 300 64 L400 64 Q456 68 495 80 L574 107 Q610 128 611 152 L611 205 Z',
    cabin:'M204 105 Q242 63 314 55 L406 55 Q465 64 495 80 L495 105',
    glassL:'M206 105 Q240 67 310 57 L310 105 Z',
    glassR:'M410 105 L410 57 Q455 62 493 80 L493 105 Z',
    glassC:'M312 105 L312 57 L408 57 L408 105 Z',
    pillarL:null, pillarR:null,
    doorLine:'M310 105 L310 200 M408 105 L408 200',
    headOuter:'M90 137 Q96 124 119 120 L131 124 Q121 130 90 143 Z',
    headInner:'M92 137 Q97 126 116 122 L126 126 Q118 131 92 141 Z',
    drl:'M90 128 L130 121',
    rearOuter:'M609 143 Q602 128 580 122 L568 126 Q579 133 609 149 Z',
    rearInner:'M607 143 Q601 130 581 124 L571 128 Q580 134 607 148 Z',
  },
]

// Front view variant data per model
const FRONT_VARIANTS = [
  { // 0: Pinnacle VII — 가로형 DRL, 메쉬 그릴
    headL:'M72 198 Q76 168 108 158 L148 152 L155 172 Q158 198 136 212 L82 216 Q66 210 72 198 Z',
    headR:'M488 198 Q484 168 452 158 L412 152 L405 172 Q402 198 424 212 L478 216 Q494 210 488 198 Z',
    drlL:'M80 178 Q115 165 150 160',
    drlR:'M480 178 Q445 165 410 160',
    grille:'M162 215 L398 215 L408 295 L152 295 Z',
    grilleStyle:'mesh',
    badge: 'V',
  },
  { // 1: Summit V — 직사각 라이트, 플랫 그릴
    headL:'M72 198 L72 152 L148 152 L148 198 Q148 215 108 215 L72 215 Z',
    headR:'M488 198 L488 152 L412 152 L412 198 Q412 215 452 215 L488 215 Z',
    drlL:'M78 162 L142 162',
    drlR:'M482 162 L418 162',
    grille:'M155 215 L405 215 L405 300 L155 300 Z',
    grilleStyle:'slat',
    badge: 'S',
  },
  { // 2: Apex S — 날카로운 스포티 라이트
    headL:'M72 198 Q80 162 118 148 L152 145 L158 168 Q155 200 130 215 L78 218 Q64 210 72 198 Z',
    headR:'M488 198 Q480 162 442 148 L408 145 L402 168 Q405 200 430 215 L482 218 Q496 210 488 198 Z',
    drlL:'M76 165 Q108 152 150 148',
    drlR:'M484 165 Q452 152 410 148',
    grille:'M165 215 L395 215 L402 295 L158 295 Z',
    grilleStyle:'sport',
    badge: 'A',
  },
  { // 3: Crest EV — LED 바, 클로즈드 그릴
    headL:'M68 192 Q75 158 115 148 L158 145 L162 172 Q160 198 132 210 L76 215 Q60 208 68 192 Z',
    headR:'M492 192 Q485 158 445 148 L402 145 L398 172 Q400 198 428 210 L484 215 Q500 208 492 192 Z',
    drlL:'M72 168 L158 160',
    drlR:'M488 168 L402 160',
    grille:'M168 215 L392 215 L392 295 L168 295 Z',
    grilleStyle:'ev',
    badge: 'E',
  },
]

// Rear view variant data per model
const REAR_VARIANTS = [
  { // 0: Pinnacle VII — 가로형 통합 후미등
    tailL:'M72 185 Q76 158 105 148 L145 145 L150 168 Q148 195 120 205 L76 208 Q65 200 72 185 Z',
    tailR:'M488 185 Q484 158 455 148 L415 145 L410 168 Q412 195 440 205 L484 208 Q495 200 488 185 Z',
    ledL:'M80 175 L142 160',
    ledR:'M480 175 L418 160',
    nameplate:'VANTAGE',
    window:'M158 72 L402 72 Q430 88 435 142 L125 142 Q130 88 158 72 Z',
  },
  { // 1: Summit V — 수직 직사각 후미등
    tailL:'M72 195 L72 148 L145 148 L145 195 Q145 208 108 208 L72 208 Z',
    tailR:'M488 195 L488 148 L415 148 L415 195 Q415 208 452 208 L488 208 Z',
    ledL:'M78 158 L138 158',
    ledR:'M482 158 L422 158',
    nameplate:'SUMMIT',
    window:'M170 68 L390 68 L390 138 L170 138 Z',
  },
  { // 2: Apex S — 경사형 후미등
    tailL:'M72 198 Q80 162 115 148 L148 145 L155 170 Q152 202 124 215 L78 218 Q63 210 72 198 Z',
    tailR:'M488 198 Q480 162 445 148 L412 145 L405 170 Q408 202 436 215 L482 218 Q497 210 488 198 Z',
    ledL:'M76 168 Q108 155 146 149',
    ledR:'M484 168 Q452 155 414 149',
    nameplate:'APEX',
    window:'M162 72 L398 72 Q425 90 428 142 L132 142 Q135 90 162 72 Z',
  },
  { // 3: Crest EV — 풀 LED 바 후미등
    tailL:'M68 195 Q75 158 112 148 L155 145 L160 172 Q158 200 128 212 L74 216 Q58 208 68 195 Z',
    tailR:'M492 195 Q485 158 448 148 L405 145 L400 172 Q402 200 432 212 L486 216 Q502 208 492 195 Z',
    ledL:'M72 170 L156 158',
    ledR:'M488 170 L404 158',
    nameplate:'CREST EV',
    window:'M155 68 L405 68 Q435 86 438 142 L122 142 Q125 86 155 68 Z',
  },
]

// Wheel with 3D gradients
function Wheel({ cx, cy, wheelId, lightBody }) {
  const uid = `whl_${cx}_${cy}_${wheelId}`
  const spokeColor = wheelId === 'w23_lux' ? '#C8A458' : wheelId === 'w22_sport' ? '#d8d8d8' : '#909090'
  const spokeW = wheelId === 'w21_classic' ? 4 : 2.5
  const angles =
    wheelId === 'w23_lux' ? [0,45,90,135,180,225,270,315] :
    wheelId === 'w22_sport' ? [0,60,120,180,240,300] :
    wheelId === 'w21_classic' ? [0,72,144,216,288] :
    [0,90,180,270]
  const R = 50, Rim = 38, Hub = 14
  return (
    <g>
      <defs>
        <radialGradient id={`tire_${uid}`} cx="40%" cy="35%" r="58%">
          <stop offset="0%" stopColor="#585858" />
          <stop offset="60%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <radialGradient id={`rim_${uid}`} cx="38%" cy="32%" r="55%">
          <stop offset="0%" stopColor={lightBody ? '#f0f0f0' : '#4a4a4a'} />
          <stop offset="55%" stopColor={lightBody ? '#c8c8c8' : '#262626'} />
          <stop offset="100%" stopColor={lightBody ? '#a0a0a0' : '#111'} />
        </radialGradient>
        <radialGradient id={`hub_${uid}`} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#505050" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
      </defs>
      {/* Tire */}
      <circle cx={cx} cy={cy} r={R} fill={`url(#tire_${uid})`} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
      {/* Tire highlight */}
      <ellipse cx={cx-14} cy={cy-18} rx={9} ry={5} fill="rgba(255,255,255,0.06)" transform={`rotate(-35,${cx-14},${cy-18})`} />
      {/* Rim */}
      <circle cx={cx} cy={cy} r={Rim} fill={`url(#rim_${uid})`} />
      <circle cx={cx} cy={cy} r={Rim} fill="none" stroke={wheelId.includes('lux') ? '#C8A458' : '#555'} strokeWidth="1.2" />
      {/* Spokes */}
      {wheelId === 'w21_aero'
        ? [0,90,180,270].map((a,i) => {
            const r1 = 16, r2 = Rim-2
            const x1=cx+Math.cos(a*Math.PI/180)*r1, y1=cy+Math.sin(a*Math.PI/180)*r1
            const xm=cx+Math.cos((a+28)*Math.PI/180)*(r1+r2)/2, ym=cy+Math.sin((a+28)*Math.PI/180)*(r1+r2)/2
            const x2=cx+Math.cos((a+45)*Math.PI/180)*r2, y2=cy+Math.sin((a+45)*Math.PI/180)*r2
            return <path key={i} d={`M${x1} ${y1} Q${xm} ${ym} ${x2} ${y2}`} stroke={spokeColor} strokeWidth="2.2" fill="none" />
          })
        : angles.map((a,i) => (
            <line key={i}
              x1={cx+Math.cos(a*Math.PI/180)*16} y1={cy+Math.sin(a*Math.PI/180)*16}
              x2={cx+Math.cos(a*Math.PI/180)*(Rim-2)} y2={cy+Math.sin(a*Math.PI/180)*(Rim-2)}
              stroke={spokeColor} strokeWidth={spokeW}
            />
          ))
      }
      {/* Hub */}
      <circle cx={cx} cy={cy} r={Hub} fill={`url(#hub_${uid})`} stroke="#555" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={6} fill="#222" />
      {/* Rim highlight */}
      <circle cx={cx} cy={cy} r={Rim} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" strokeDasharray="60 200" strokeDashoffset="-20" />
    </g>
  )
}

// SIDE VIEW
function SideView({ shape, colorHex, wheelId, monogram }) {
  const id = `sv_${colorHex?.replace('#','')}`
  const c = colorHex || '#888888'
  const light = isLight(c)
  return (
    <svg viewBox="0 0 700 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', maxHeight:260, transition:'all 0.4s ease', filter:'drop-shadow(0 12px 32px rgba(0,0,0,0.22))' }}>
      <defs>
        <linearGradient id={`body_${id}`} x1="350" y1="40" x2="350" y2="210" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={tint(c,0.55)} />
          <stop offset="20%"  stopColor={tint(c,0.22)} />
          <stop offset="55%"  stopColor={c} />
          <stop offset="85%"  stopColor={shade(c,0.22)} />
          <stop offset="100%" stopColor={shade(c,0.38)} />
        </linearGradient>
        <linearGradient id={`glass_${id}`} x1="10%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor="rgba(230,245,255,0.38)" />
          <stop offset="40%"  stopColor="rgba(190,225,245,0.20)" />
          <stop offset="100%" stopColor="rgba(80,150,210,0.28)" />
        </linearGradient>
        <linearGradient id={`stripe_${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
          <stop offset="22%"  stopColor={`rgba(255,255,255,${light?'0.06':'0.18'})`} />
          <stop offset="55%"  stopColor={`rgba(255,255,255,${light?'0.03':'0.10'})`} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id={`gnd_${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="350" cy="252" rx="252" ry="14" fill={`url(#gnd_${id})`} />

      {/* Body */}
      <path d={shape.body} fill={`url(#body_${id})`} />
      <path d={shape.cabin} fill={`url(#body_${id})`} stroke={shade(c,0.12)} strokeWidth="0.6" />
      {/* Shoulder highlight stripe */}
      <path d={shape.body} fill={`url(#stripe_${id})`} />
      {/* Body outline */}
      <path d={shape.body} fill="none" stroke={shade(c,0.25)} strokeWidth="0.8" strokeOpacity="0.55" />

      {/* Glass windows */}
      <path d={shape.glassL} fill={`url(#glass_${id})`} stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" />
      <path d={shape.glassR} fill={`url(#glass_${id})`} stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" />
      {shape.glassC && <path d={shape.glassC} fill={`url(#glass_${id})`} stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" />}
      {/* Glass reflection */}
      <path d={shape.glassL} fill="rgba(255,255,255,0.07)" />

      {/* Pillar & door seams */}
      {shape.pillarL && <line x1={shape.pillarL.x1} y1={shape.pillarL.y1} x2={shape.pillarL.x2} y2={shape.pillarL.y2} stroke={shade(c,0.18)} strokeWidth="1.8" strokeOpacity="0.55" />}
      {shape.pillarR && <line x1={shape.pillarR.x1} y1={shape.pillarR.y1} x2={shape.pillarR.x2} y2={shape.pillarR.y2} stroke={shade(c,0.18)} strokeWidth="1.8" strokeOpacity="0.55" />}

      {/* Front headlight */}
      <path d={shape.headOuter} fill="rgba(255,248,220,0.08)" stroke="#C8A850" strokeWidth="1.1" />
      <path d={shape.headInner} fill="rgba(255,245,200,0.60)" />
      <path d={shape.drl} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />

      {/* Rear taillight */}
      <path d={shape.rearOuter} fill="rgba(200,30,30,0.10)" stroke="rgba(215,40,40,0.70)" strokeWidth="1.1" />
      <path d={shape.rearInner} fill="rgba(225,40,40,0.55)" />

      {/* VANTAGE subtle lettering */}
      <text x="350" y={shape.textY} textAnchor="middle"
        fill={light ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)'}
        fontSize="9" fontWeight="bold" letterSpacing="5"
        fontFamily="Roboto, sans-serif">VANTAGE</text>

      {/* Monogram — shown immediately when typed */}
      {monogram && (
        <>
          <rect x="280" y={shape.textY-34} width="140" height="38" rx="1"
            fill="rgba(0,0,0,0.08)" stroke="rgba(166,137,102,0.35)" strokeWidth="0.8" />
          <text x="350" y={shape.textY-12} textAnchor="middle"
            fill="rgba(166,137,102,0.92)" fontSize="19" fontWeight="bold"
            letterSpacing="5" fontFamily="Roboto, sans-serif" fontStyle="italic">
            {monogram}
          </text>
          <text x="350" y={shape.textY+2} textAnchor="middle"
            fill="rgba(166,137,102,0.45)" fontSize="7" letterSpacing="2.5"
            fontFamily="Roboto, sans-serif">PERSONAL EDITION</text>
        </>
      )}

      {/* Front wheel */}
      <Wheel cx={shape.w1x} cy={203} wheelId={wheelId} lightBody={light} />
      {/* Rear wheel */}
      <Wheel cx={shape.w2x} cy={203} wheelId={wheelId} lightBody={light} />
    </svg>
  )
}

// FRONT VIEW
function FrontView({ modelIdx, colorHex, wheelId, monogram }) {
  const v = FRONT_VARIANTS[modelIdx]
  const id = `fv${modelIdx}_${colorHex?.replace('#','')}`
  const c = colorHex || '#888888'
  const light = isLight(c)

  // Grille patterns
  const GrillePattern = ({ style, x, y, w, h }) => {
    if (style === 'mesh') {
      const lines = []
      for (let i = 0; i <= 6; i++) {
        lines.push(<line key={`h${i}`} x1={x} y1={y+i*(h/6)} x2={x+w} y2={y+i*(h/6)} stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />)
        lines.push(<line key={`v${i}`} x1={x+i*(w/6)} y1={y} x2={x+i*(w/6)} y2={y+h} stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />)
      }
      return <>{lines}</>
    }
    if (style === 'slat') {
      return <>{[0,1,2,3,4].map(i => <rect key={i} x={x+4} y={y+6+i*14} width={w-8} height="6" rx="1" fill="rgba(255,255,255,0.10)" />)}</>
    }
    if (style === 'sport') {
      return <>{[0,1,2,3].map(i => <rect key={i} x={x+2} y={y+5+i*16} width={w-4} height="4" rx="0" fill="rgba(255,255,255,0.08)" />)}</>
    }
    if (style === 'ev') {
      return (
        <>
          <rect x={x+4} y={y+h/2-5} width={w-8} height="10" rx="2" fill="rgba(100,180,255,0.15)" stroke="rgba(100,200,255,0.3)" strokeWidth="0.8" />
          <text x={x+w/2} y={y+h/2+4} textAnchor="middle" fill="rgba(100,200,255,0.5)" fontSize="8" letterSpacing="2" fontFamily="Roboto">EV</text>
        </>
      )
    }
    return null
  }

  return (
    <svg viewBox="0 0 560 390" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', maxHeight:340, transition:'all 0.4s ease', filter:'drop-shadow(0 12px 32px rgba(0,0,0,0.22))' }}>
      <defs>
        <linearGradient id={`fbody_${id}`} x1="280" y1="50" x2="280" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={tint(c,0.60)} />
          <stop offset="18%"  stopColor={tint(c,0.28)} />
          <stop offset="52%"  stopColor={c} />
          <stop offset="80%"  stopColor={shade(c,0.20)} />
          <stop offset="100%" stopColor={shade(c,0.40)} />
        </linearGradient>
        <linearGradient id={`fglass_${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="rgba(235,248,255,0.42)" />
          <stop offset="45%"  stopColor="rgba(190,228,248,0.22)" />
          <stop offset="100%" stopColor="rgba(70,145,215,0.30)" />
        </linearGradient>
        <linearGradient id={`fhood_${id}`} x1="280" y1="135" x2="280" y2="215" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={tint(c,0.18)} />
          <stop offset="100%" stopColor={shade(c,0.12)} />
        </linearGradient>
        <radialGradient id={`fgnd_${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.28)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id={`fwhl_${id}`} cx="38%" cy="32%" r="55%">
          <stop offset="0%"   stopColor="#585858" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="280" cy="382" rx="234" ry="15" fill={`url(#fgnd_${id})`} />

      {/* === BODY SHELL === */}
      {/* Roof */}
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L144 138 Q154 70 190 55 Z" fill={`url(#fbody_${id})`} />
      {/* Left side panel (fender to bumper) */}
      <path d="M144 138 L68 202 L64 305 Q62 340 78 355 L190 355 Q175 338 168 305 L168 292 L144 292 L144 138 Z" fill={`url(#fbody_${id})`} />
      {/* Right side panel */}
      <path d="M416 138 L492 202 L496 305 Q498 340 482 355 L370 355 Q385 338 392 305 L392 292 L416 292 L416 138 Z" fill={`url(#fbody_${id})`} />
      {/* Panel outline for depth */}
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L492 202 L496 305 Q498 340 482 355 L78 355 Q62 340 64 305 L68 202 L144 138 Q154 70 190 55 Z" fill="none" stroke={shade(c,0.28)} strokeWidth="0.9" strokeOpacity="0.5" />

      {/* Hood (below windshield, above grille) */}
      <path d="M144 138 L68 202 L492 202 L416 138 Z" fill={`url(#fhood_${id})`} />
      <path d="M144 138 L68 202 L492 202 L416 138 Z" fill="none" stroke={shade(c,0.2)} strokeWidth="0.7" strokeOpacity="0.4" />

      {/* Center crease on hood */}
      <line x1="280" y1="142" x2="280" y2="200" stroke={tint(c,0.25)} strokeWidth="1" strokeOpacity="0.5" />

      {/* Windshield glass */}
      <path d="M194 58 Q280 49 366 58 Q400 73 408 136 L152 136 Q160 73 194 58 Z" fill={`url(#fglass_${id})`} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      {/* Glass reflection streak */}
      <path d="M195 65 Q260 56 330 62 L320 130 L190 130 Z" fill="rgba(255,255,255,0.07)" />

      {/* Windshield trim */}
      <path d="M194 58 Q280 49 366 58 Q400 73 408 136 L152 136 Q160 73 194 58 Z" fill="none" stroke={shade(c,0.15)} strokeWidth="2" strokeOpacity="0.6" />

      {/* === HEADLIGHTS === */}
      <path d={v.headL} fill="rgba(20,20,30,0.85)" stroke={shade(c,0.3)} strokeWidth="1" />
      <path d={v.headR} fill="rgba(20,20,30,0.85)" stroke={shade(c,0.3)} strokeWidth="1" />
      {/* Headlight inner glow */}
      <path d={v.headL} fill="rgba(255,248,210,0.45)" />
      <path d={v.headR} fill="rgba(255,248,210,0.45)" />
      {/* DRL strips */}
      <path d={v.drlL} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round" />
      <path d={v.drlR} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round" />

      {/* === LOWER FASCIA / GRILLE === */}
      {/* Grille surround */}
      <path d={v.grille} fill="rgba(15,15,18,0.88)" stroke="rgba(100,100,100,0.4)" strokeWidth="1" />
      {/* Grille pattern */}
      {(() => {
        const gx = v.grilleStyle === 'ev' ? 168 : v.grilleStyle === 'slat' ? 155 : v.grilleStyle === 'sport' ? 165 : 162
        const gw = v.grilleStyle === 'ev' ? 224 : v.grilleStyle === 'slat' ? 250 : v.grilleStyle === 'sport' ? 230 : 236
        const gy = 215, gh = v.grilleStyle === 'slat' ? 85 : 80
        return <GrillePattern style={v.grilleStyle} x={gx} y={gy} w={gw} h={gh} />
      })()}
      {/* Brand badge on grille */}
      <circle cx="280" cy="255" r="18" fill="rgba(30,30,30,0.9)" stroke="#A68966" strokeWidth="1.2" />
      <text x="280" y="260" textAnchor="middle" fill="#C8A458" fontSize="10" fontWeight="900" letterSpacing="0" fontFamily="Roboto, sans-serif">{v.badge}</text>

      {/* Lower bumper */}
      <path d="M64 305 Q62 340 78 355 L482 355 Q498 340 496 305 Z" fill={shade(c,0.35)} stroke={shade(c,0.45)} strokeWidth="0.8" />
      {/* Bumper diffuser detail */}
      <path d="M168 330 L392 330 L388 350 L172 350 Z" fill="rgba(0,0,0,0.25)" />
      {[190,220,250,280,310,340,370].map(x => (
        <line key={x} x1={x} y1={332} x2={x} y2={348} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}

      {/* === WHEELS (partial front view) === */}
      {/* Left wheel arch */}
      <path d="M64 305 Q64 355 120 362 Q172 368 175 355 L175 305 Z" fill={shade(c,0.42)} stroke={shade(c,0.55)} strokeWidth="0.8" />
      <ellipse cx="120" cy="350" rx="55" ry="18" fill="rgba(0,0,0,0.5)" />
      <ellipse cx="120" cy="340" rx="48" ry="48" fill="url(#fwhl_{id})" stroke="#333" strokeWidth="1.5" />
      <circle cx="120" cy="340" r="36" fill="rgba(40,40,40,0.9)" stroke="#555" strokeWidth="1" />
      <circle cx="120" cy="340" r="14" fill="#1a1a1a" stroke="#555" strokeWidth="1" />
      {[0,60,120,180,240,300].map((a,i) => (
        <line key={i}
          x1={120+Math.cos(a*Math.PI/180)*15} y1={340+Math.sin(a*Math.PI/180)*15}
          x2={120+Math.cos(a*Math.PI/180)*34} y2={340+Math.sin(a*Math.PI/180)*34}
          stroke="#d0d0d0" strokeWidth="2.2" />
      ))}
      {/* Right wheel arch */}
      <path d="M496 305 Q496 355 440 362 Q388 368 385 355 L385 305 Z" fill={shade(c,0.42)} stroke={shade(c,0.55)} strokeWidth="0.8" />
      <ellipse cx="440" cy="350" rx="55" ry="18" fill="rgba(0,0,0,0.5)" />
      <ellipse cx="440" cy="340" rx="48" ry="48" fill="url(#fwhl_{id})" stroke="#333" strokeWidth="1.5" />
      <circle cx="440" cy="340" r="36" fill="rgba(40,40,40,0.9)" stroke="#555" strokeWidth="1" />
      <circle cx="440" cy="340" r="14" fill="#1a1a1a" stroke="#555" strokeWidth="1" />
      {[0,60,120,180,240,300].map((a,i) => (
        <line key={i}
          x1={440+Math.cos(a*Math.PI/180)*15} y1={340+Math.sin(a*Math.PI/180)*15}
          x2={440+Math.cos(a*Math.PI/180)*34} y2={340+Math.sin(a*Math.PI/180)*34}
          stroke="#d0d0d0" strokeWidth="2.2" />
      ))}

      {/* Monogram on windshield area */}
      {monogram && (
        <text x="280" y="108" textAnchor="middle"
          fill="rgba(166,137,102,0.65)" fontSize="16" fontWeight="bold"
          letterSpacing="5" fontFamily="Roboto, sans-serif" fontStyle="italic">
          {monogram}
        </text>
      )}
    </svg>
  )
}

// REAR VIEW
function RearView({ modelIdx, colorHex, monogram }) {
  const v = REAR_VARIANTS[modelIdx]
  const id = `rv${modelIdx}_${colorHex?.replace('#','')}`
  const c = colorHex || '#888888'
  const light = isLight(c)

  return (
    <svg viewBox="0 0 560 390" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', maxHeight:340, transition:'all 0.4s ease', filter:'drop-shadow(0 12px 32px rgba(0,0,0,0.22))' }}>
      <defs>
        <linearGradient id={`rbody_${id}`} x1="280" y1="50" x2="280" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={tint(c,0.55)} />
          <stop offset="20%"  stopColor={tint(c,0.22)} />
          <stop offset="55%"  stopColor={c} />
          <stop offset="82%"  stopColor={shade(c,0.20)} />
          <stop offset="100%" stopColor={shade(c,0.40)} />
        </linearGradient>
        <linearGradient id={`rglass_${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="rgba(235,248,255,0.40)" />
          <stop offset="45%"  stopColor="rgba(190,228,248,0.20)" />
          <stop offset="100%" stopColor="rgba(70,145,215,0.28)" />
        </linearGradient>
        <radialGradient id={`rgnd_${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.28)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="280" cy="382" rx="234" ry="15" fill={`url(#rgnd_${id})`} />

      {/* Body shell */}
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L492 202 L496 305 Q498 340 482 355 L78 355 Q62 340 64 305 L68 202 L144 138 Q154 70 190 55 Z" fill={`url(#rbody_${id})`} />
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L492 202 L496 305 Q498 340 482 355 L78 355 Q62 340 64 305 L68 202 L144 138 Q154 70 190 55 Z" fill="none" stroke={shade(c,0.28)} strokeWidth="0.9" strokeOpacity="0.5" />

      {/* Upper body / roof */}
      <path d="M194 58 Q280 49 366 58 Q400 73 408 136 L416 138 Q406 70 370 55 Q280 46 190 55 Q154 70 144 138 L152 136 Q160 73 194 58 Z" fill={tint(c,0.28)} />

      {/* Rear glass (tailgate window) */}
      <path d={v.window} fill={`url(#rglass_${id})`} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      {/* Glass reflection */}
      <path d={v.window} fill="rgba(255,255,255,0.07)" clipPath={`url(#rclip_${id})`} />
      <defs>
        <clipPath id={`rclip_${id}`}>
          <path d={v.window} />
        </clipPath>
      </defs>
      <path d="M156 75 Q200 62 258 68 L245 138 L135 138 Z" fill="rgba(255,255,255,0.06)" clipPath={`url(#rclip_${id})`} />

      {/* VANTAGE nameplate */}
      <text x="280" y="172" textAnchor="middle"
        fill={light ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)'}
        fontSize="11" fontWeight="bold" letterSpacing="6"
        fontFamily="Roboto, sans-serif">{v.nameplate}</text>
      <text x="280" y="185" textAnchor="middle"
        fill="rgba(166,137,102,0.40)" fontSize="6.5" letterSpacing="3.5"
        fontFamily="Roboto, sans-serif">VANTAGE AUTOMOTIVE</text>

      {/* Monogram on tailgate */}
      {monogram && (
        <>
          <rect x="240" y="192" width="80" height="30" rx="1"
            fill="rgba(0,0,0,0.10)" stroke="rgba(166,137,102,0.40)" strokeWidth="0.8" />
          <text x="280" y="212" textAnchor="middle"
            fill="rgba(166,137,102,0.88)" fontSize="16" fontWeight="bold"
            letterSpacing="5" fontFamily="Roboto, sans-serif" fontStyle="italic">
            {monogram}
          </text>
        </>
      )}

      {/* === TAILLIGHTS === */}
      <path d={v.tailL} fill="rgba(20,15,15,0.85)" stroke={shade(c,0.3)} strokeWidth="1" />
      <path d={v.tailR} fill="rgba(20,15,15,0.85)" stroke={shade(c,0.3)} strokeWidth="1" />
      {/* Taillight inner glow */}
      <path d={v.tailL} fill="rgba(210,35,35,0.55)" />
      <path d={v.tailR} fill="rgba(210,35,35,0.55)" />
      {/* LED strips */}
      <path d={v.ledL} fill="none" stroke="rgba(255,80,80,0.85)" strokeWidth="2.2" strokeLinecap="round" />
      <path d={v.ledR} fill="none" stroke="rgba(255,80,80,0.85)" strokeWidth="2.2" strokeLinecap="round" />

      {/* Lower bumper */}
      <path d="M64 305 Q62 340 78 355 L482 355 Q498 340 496 305 Z" fill={shade(c,0.35)} stroke={shade(c,0.45)} strokeWidth="0.8" />
      {/* Exhaust */}
      <ellipse cx="195" cy="350" rx="22" ry="8" fill="rgba(0,0,0,0.55)" stroke="#555" strokeWidth="1" />
      <ellipse cx="195" cy="350" rx="16" ry="5" fill="rgba(30,30,30,0.8)" />
      <ellipse cx="365" cy="350" rx="22" ry="8" fill="rgba(0,0,0,0.55)" stroke="#555" strokeWidth="1" />
      <ellipse cx="365" cy="350" rx="16" ry="5" fill="rgba(30,30,30,0.8)" />
      {/* License plate area */}
      <rect x="222" y="298" width="116" height="30" rx="1" fill="rgba(240,240,240,0.85)" stroke="#888" strokeWidth="0.8" />
      <text x="280" y="319" textAnchor="middle" fill="#333" fontSize="8" letterSpacing="2.5" fontFamily="Roboto, sans-serif" fontWeight="bold">VNT·0000</text>

      {/* Rear wheels */}
      <path d="M64 305 Q62 355 118 364 Q172 370 175 355 L175 305 Z" fill={shade(c,0.42)} />
      <ellipse cx="120" cy="350" rx="55" ry="18" fill="rgba(0,0,0,0.5)" />
      <ellipse cx="120" cy="340" rx="48" ry="48" fill="rgba(20,20,20,0.9)" stroke="#333" strokeWidth="1.5" />
      <circle cx="120" cy="340" r="36" fill="rgba(38,38,38,0.9)" stroke="#555" strokeWidth="1" />
      <circle cx="120" cy="340" r="14" fill="#1a1a1a" />
      {[0,60,120,180,240,300].map((a,i) => (
        <line key={i}
          x1={120+Math.cos(a*Math.PI/180)*15} y1={340+Math.sin(a*Math.PI/180)*15}
          x2={120+Math.cos(a*Math.PI/180)*34} y2={340+Math.sin(a*Math.PI/180)*34}
          stroke="#d0d0d0" strokeWidth="2.2" />
      ))}
      <path d="M496 305 Q498 355 442 364 Q388 370 385 355 L385 305 Z" fill={shade(c,0.42)} />
      <ellipse cx="440" cy="350" rx="55" ry="18" fill="rgba(0,0,0,0.5)" />
      <ellipse cx="440" cy="340" rx="48" ry="48" fill="rgba(20,20,20,0.9)" stroke="#333" strokeWidth="1.5" />
      <circle cx="440" cy="340" r="36" fill="rgba(38,38,38,0.9)" stroke="#555" strokeWidth="1" />
      <circle cx="440" cy="340" r="14" fill="#1a1a1a" />
      {[0,60,120,180,240,300].map((a,i) => (
        <line key={i}
          x1={440+Math.cos(a*Math.PI/180)*15} y1={340+Math.sin(a*Math.PI/180)*15}
          x2={440+Math.cos(a*Math.PI/180)*34} y2={340+Math.sin(a*Math.PI/180)*34}
          stroke="#d0d0d0" strokeWidth="2.2" />
      ))}
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CustomizeSection() {
  const [selectedModel, setSelectedModel]   = useState(0)
  const [selectedColor, setSelectedColor]   = useState('abyss_black')
  const [selectedWheel, setSelectedWheel]   = useState('w22_sport')
  const [monogram, setMonogram]             = useState('')
  const [view, setView]                     = useState('side') // 'side' | 'front' | 'rear'
  const [shareMsg, setShareMsg]             = useState('')
  const navigate   = useNavigate()
  const previewRef = useRef(null)

  const model     = MODELS[selectedModel]
  const color     = CAR_COLORS.find(c => c.id === selectedColor)
  const wheel     = WHEEL_OPTIONS.find(w => w.id === selectedWheel)
  const finalPrice = getDiscountedPrice(model.basePrice, model.discountRate) + (wheel?.price || 0)
  const shape     = SIDE_SHAPES[selectedModel]

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

  const VIEW_LABELS = [
    { key: 'side',  label: '측면' },
    { key: 'front', label: '정면' },
    { key: 'rear',  label: '후면' },
  ]

  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 8, md: 12 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* Section header */}
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
          {/* Left option panel */}
          <Grid item xs={12} md={3.6}>
            {/* 01. 모델 선택 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                01. 모델 선택
              </Typography>
              {MODELS.map((m, i) => (
                <Box key={m.id} onClick={() => { setSelectedModel(i); setView('side') }}
                  sx={{
                    p: 2, mb: 1,
                    border: `1px solid ${selectedModel === i ? '#A68966' : '#e0e0e0'}`,
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    bgcolor: selectedModel === i ? 'rgba(166,137,102,0.06)' : 'transparent',
                    transition: 'border-color 0.2s', userSelect: 'none',
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

            {/* 02. 색상 선택 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                02. 색상 선택
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
                {CAR_COLORS.map((c) => (
                  <Tooltip key={c.id} title={c.nameKo} placement="top">
                    <Box onClick={() => setSelectedColor(c.id)}
                      sx={{
                        width: 32, height: 32, bgcolor: c.hex,
                        border: selectedColor === c.id ? '2px solid #A68966' : '2px solid #e0e0e0',
                        cursor: 'pointer', position: 'relative',
                        transition: 'border-color 0.2s', userSelect: 'none',
                      }}
                    >
                      {selectedColor === c.id && (
                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckIcon sx={{ color: isLight(c.hex) ? '#333' : '#fff', fontSize: '0.9rem' }} />
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
              <Typography sx={{ color: '#666', fontSize: '0.8rem', mt: 1 }}>{color?.nameKo}</Typography>
            </Box>

            {/* 03. 휠 선택 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>
                03. 휠 선택
              </Typography>
              {WHEEL_OPTIONS.map((w) => (
                <Box key={w.id} onClick={() => setSelectedWheel(w.id)}
                  sx={{
                    p: 1.5, mb: 1,
                    border: `1px solid ${selectedWheel === w.id ? '#A68966' : '#e0e0e0'}`,
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    bgcolor: selectedWheel === w.id ? 'rgba(166,137,102,0.06)' : 'transparent',
                    transition: 'border-color 0.2s', userSelect: 'none',
                    '&:hover': { borderColor: 'rgba(166,137,102,0.6)' },
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

            {/* 04. 이니셜 각인 (실시간 반영) */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 1 }}>
                04. 이니셜 각인 서비스
              </Typography>
              <Typography sx={{ color: '#aaa', fontSize: '0.75rem', mb: 1.5 }}>
                입력 즉시 차량에 반영됩니다
              </Typography>
              <TextField
                fullWidth
                placeholder="이니셜 입력 (최대 4자)"
                value={monogram}
                onChange={(e) => {
                  if (e.target.value.length <= 4) setMonogram(e.target.value.toUpperCase())
                }}
                size="small"
                sx={{ mb: 1 }}
              />
              {monogram && (
                <Chip
                  label={`"${monogram}" 적용 중 — 도어 스텝 각인`}
                  onDelete={() => setMonogram('')}
                  sx={{ bgcolor: 'rgba(166,137,102,0.08)', color: '#A68966', border: '1px solid rgba(166,137,102,0.3)', borderRadius: 0, fontSize: '0.75rem' }}
                />
              )}
            </Box>
          </Grid>

          {/* Right preview panel */}
          <Grid item xs={12} md={8.4}>
            <Box ref={previewRef} sx={{ bgcolor: '#f0f0f0', border: '1px solid #e0e0e0', p: { xs: 2, md: 3 } }}>
              {/* View angle selector */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2.5, justifyContent: 'flex-end' }}>
                {VIEW_LABELS.map(({ key, label }) => (
                  <Button key={key} onClick={() => setView(key)} size="small"
                    variant={view === key ? 'contained' : 'outlined'}
                    sx={{
                      bgcolor: view === key ? '#0c121c' : 'transparent',
                      color: view === key ? '#fff' : '#666',
                      borderColor: view === key ? '#0c121c' : '#ccc',
                      fontSize: '0.75rem', px: 2, py: 0.6, minWidth: 'auto',
                      '&:hover': { bgcolor: view === key ? '#0c121c' : 'rgba(0,0,0,0.04)', borderColor: '#0c121c' },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>

              {/* 3D Car preview */}
              <Box sx={{ position: 'relative', mb: 2.5, textAlign: 'center', bgcolor: '#e8e8e8', borderRadius: 0, p: { xs: 2, md: 3 } }}>
                {/* Background gradient for depth */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.55) 0%, rgba(220,220,220,0.2) 55%, rgba(180,180,180,0.1) 100%)',
                  pointerEvents: 'none',
                }} />
                <Box sx={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: view === 'side' ? 640 : 520 }}>
                  {view === 'side' && (
                    <SideView shape={shape} colorHex={color?.hex} wheelId={selectedWheel} monogram={monogram} />
                  )}
                  {view === 'front' && (
                    <FrontView modelIdx={selectedModel} colorHex={color?.hex} wheelId={selectedWheel} monogram={monogram} />
                  )}
                  {view === 'rear' && (
                    <RearView modelIdx={selectedModel} colorHex={color?.hex} monogram={monogram} />
                  )}
                </Box>
              </Box>

              {/* Summary + price */}
              <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 2.5, bgcolor: '#fff', mx: -3, px: 3, pb: 2.5 }}>
                <Grid container spacing={2} sx={{ mb: 2.5 }}>
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2.5 }}>
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
                  <Button fullWidth variant="contained"
                    onClick={() => navigate('/reservation', { state: { car: CARS[selectedModel], color, wheel } })}
                    sx={{ bgcolor: '#0c121c', color: '#fff', border: 'none', '&:hover': { bgcolor: '#1e2a3a' }, py: 1.8, fontWeight: 600 }}>
                    이 구성으로 시승 예약
                  </Button>
                  <Button fullWidth variant="outlined"
                    onClick={() => navigate('/reservation', { state: { car: CARS[selectedModel], color, wheel, type: 'quote' } })}
                    sx={{ borderColor: '#0c121c', color: '#0c121c', py: 1.8, '&:hover': { bgcolor: '#0c121c', color: '#fff' } }}>
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
