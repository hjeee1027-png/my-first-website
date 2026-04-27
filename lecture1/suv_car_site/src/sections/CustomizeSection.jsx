import { useState, useRef } from 'react'
import { Box, Container, Typography, Grid, Button, TextField, Tooltip, Chip, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import CheckIcon from '@mui/icons-material/Check'
import { CARS, CAR_COLORS, WHEEL_OPTIONS, formatPrice, getDiscountedPrice } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const MODELS = CARS.map(c => ({
  id: c.id, name: c.model_name,
  shortName: c.model_name.replace('VANTAGE ', ''),
  basePrice: c.base_price, discountRate: c.discount_rate,
}))

// ── Color helpers ─────────────────────────────────────────────────────────────
function tint(hex, p) {
  if (!hex || hex.length < 7) return '#aaa'
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16)
  return `rgb(${Math.round(r+(255-r)*p)},${Math.round(g+(255-g)*p)},${Math.round(b+(255-b)*p)})`
}
function shade(hex, p) {
  if (!hex || hex.length < 7) return '#333'
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16)
  return `rgb(${Math.round(r*(1-p))},${Math.round(g*(1-p))},${Math.round(b*(1-p))})`
}
function isLight(hex) {
  if (!hex || hex.length < 7) return false
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16)
  return (r*299+g*587+b*114)/1000 > 160
}

// ── Side view shape paths ─────────────────────────────────────────────────────
const SIDE_SHAPES = [
  { w1x:192,w2x:508,textY:155,
    body:'M85 205 L85 140 Q88 115 127 97 L210 74 Q248 63 302 59 L398 59 Q452 63 490 73 L573 97 Q612 115 615 140 L615 205 Z',
    cabin:'M205 97 Q248 53 318 45 L382 45 Q452 53 495 97',
    glassL:'M208 97 Q247 57 315 49 L315 97 Z',
    glassR:'M493 97 Q453 57 385 49 L385 97 Z',glassC:null,
    pillarL:{x1:323,y1:97,x2:323,y2:200},pillarR:{x1:433,y1:97,x2:433,y2:200},
    headOuter:'M86 130 Q92 118 116 115 L130 118 Q120 126 86 138 Z',
    headInner:'M88 130 Q94 120 113 117 L124 120 Q116 124 88 136 Z',drl:'M88 125 L125 118',
    rearOuter:'M614 130 Q607 118 584 115 L570 118 Q580 126 614 138 Z',
    rearInner:'M612 130 Q606 120 585 117 L572 120 Q581 125 612 135 Z',
  },
  { w1x:175,w2x:490,textY:158,
    body:'M105 205 L105 162 L103 108 L136 90 L178 80 L490 80 L532 90 L565 108 L565 162 L565 205 Z',
    cabin:'M188 80 L212 52 L490 52 L490 80',
    glassL:'M190 80 L213 55 L292 55 L292 80 Z',
    glassR:'M390 80 L390 55 L490 55 L490 80 Z',glassC:'M294 80 L294 55 L388 55 L388 80 Z',
    pillarL:null,pillarR:null,
    headOuter:'M106 154 L106 110 L132 103 L142 108 L142 152 Z',
    headInner:'M108 151 L108 113 L130 106 L139 111 L139 149 Z',drl:'M108 120 L140 113',
    rearOuter:'M563 154 L563 110 L539 103 L529 108 L529 152 Z',
    rearInner:'M561 151 L561 113 L541 106 L532 111 L532 149 Z',
  },
  { w1x:195,w2x:505,textY:155,
    body:'M90 205 L90 156 Q92 130 121 114 L196 92 Q232 78 282 72 L390 70 Q460 74 514 91 L580 118 Q613 136 614 158 L614 205 Z',
    cabin:'M192 114 Q228 70 288 60 L372 58 Q448 68 514 114',
    glassL:'M194 114 Q226 74 284 64 L284 114 Z',
    glassR:'M512 114 Q462 76 395 62 L395 114 Z',glassC:null,
    pillarL:{x1:293,y1:114,x2:293,y2:200},pillarR:{x1:403,y1:114,x2:403,y2:200},
    headOuter:'M92 145 Q97 133 118 129 L130 133 Q121 138 92 151 Z',
    headInner:'M94 145 Q98 135 115 131 L126 135 Q117 139 94 149 Z',drl:'M93 137 L128 131',
    rearOuter:'M612 158 Q605 142 583 136 L571 140 Q582 147 612 165 Z',
    rearInner:'M610 158 Q604 144 584 138 L573 142 Q582 148 610 163 Z',
  },
  { w1x:186,w2x:508,textY:152,
    body:'M88 205 L88 148 Q90 122 127 105 L208 80 Q244 68 300 64 L400 64 Q456 68 495 80 L574 107 Q610 128 611 152 L611 205 Z',
    cabin:'M204 105 Q242 63 314 55 L406 55 Q465 64 495 80 L495 105',
    glassL:'M206 105 Q240 67 310 57 L310 105 Z',
    glassR:'M410 105 L410 57 Q455 62 493 80 L493 105 Z',glassC:'M312 105 L312 57 L408 57 L408 105 Z',
    pillarL:null,pillarR:null,
    headOuter:'M90 137 Q96 124 119 120 L131 124 Q121 130 90 143 Z',
    headInner:'M92 137 Q97 126 116 122 L126 126 Q118 131 92 141 Z',drl:'M90 128 L130 121',
    rearOuter:'M609 143 Q602 128 580 122 L568 126 Q579 133 609 149 Z',
    rearInner:'M607 143 Q601 130 581 124 L571 128 Q580 134 607 148 Z',
  },
]

// Front & rear variant data per model
const FRONT_V = [
  { headL:'M72 198 Q76 168 108 158 L148 152 L155 172 Q158 198 136 212 L82 216 Q66 210 72 198 Z',
    headR:'M488 198 Q484 168 452 158 L412 152 L405 172 Q402 198 424 212 L478 216 Q494 210 488 198 Z',
    drlL:'M82 178 Q116 165 150 160',drlR:'M478 178 Q444 165 410 160',
    grille:'M162 216 L398 216 Q406 256 408 296 L152 296 Q154 256 162 216 Z',gs:'mesh' },
  { headL:'M72 200 L72 152 L148 152 L148 200 L72 200 Z',
    headR:'M488 200 L488 152 L412 152 L412 200 L488 200 Z',
    drlL:'M78 162 L142 162',drlR:'M482 162 L418 162',
    grille:'M155 210 L405 210 L405 300 L155 300 Z',gs:'slat' },
  { headL:'M72 198 Q80 160 118 148 L153 145 L158 170 Q155 200 130 215 L78 218 Q63 210 72 198 Z',
    headR:'M488 198 Q480 160 442 148 L407 145 L402 170 Q405 200 430 215 L482 218 Q497 210 488 198 Z',
    drlL:'M76 165 Q108 152 150 148',drlR:'M484 165 Q452 152 410 148',
    grille:'M165 216 L395 216 Q402 255 400 295 L160 295 Q158 255 165 216 Z',gs:'sport' },
  { headL:'M68 195 Q75 158 115 148 L158 145 L162 172 Q160 200 130 212 L74 216 Q58 208 68 195 Z',
    headR:'M492 195 Q485 158 445 148 L402 145 L398 172 Q400 200 430 212 L486 216 Q502 208 492 195 Z',
    drlL:'M72 170 L158 160',drlR:'M488 170 L402 160',
    grille:'M168 216 L392 216 Q390 256 388 296 L172 296 Q170 256 168 216 Z',gs:'ev' },
]
const REAR_V = [
  { tailL:'M72 188 Q76 160 105 150 L145 147 L150 170 Q148 197 120 207 L76 210 Q65 202 72 188 Z',
    tailR:'M488 188 Q484 160 455 150 L415 147 L410 170 Q412 197 440 207 L484 210 Q495 202 488 188 Z',
    ledL:'M80 175 L142 162',ledR:'M480 175 L418 162',name:'VANTAGE',
    win:'M158 70 L402 70 Q430 86 434 140 L126 140 Q130 86 158 70 Z' },
  { tailL:'M72 196 L72 150 L145 150 L145 196 L72 196 Z',
    tailR:'M488 196 L488 150 L415 150 L415 196 L488 196 Z',
    ledL:'M78 160 L138 160',ledR:'M482 160 L422 160',name:'SUMMIT',
    win:'M172 68 L388 68 L388 136 L172 136 Z' },
  { tailL:'M72 200 Q80 162 116 148 L150 145 L156 170 Q153 202 125 215 L79 218 Q64 210 72 200 Z',
    tailR:'M488 200 Q480 162 444 148 L410 145 L404 170 Q407 202 435 215 L481 218 Q496 210 488 200 Z',
    ledL:'M76 168 Q108 155 148 149',ledR:'M484 168 Q452 155 412 149',name:'APEX',
    win:'M162 70 L398 70 Q425 88 428 140 L132 140 Q135 88 162 70 Z' },
  { tailL:'M68 196 Q75 158 112 148 L155 145 L160 172 Q158 200 128 212 L74 216 Q58 208 68 196 Z',
    tailR:'M492 196 Q485 158 448 148 L405 145 L400 172 Q402 200 432 212 L486 216 Q502 208 492 196 Z',
    ledL:'M72 170 L156 158',ledR:'M488 170 L404 158',name:'CREST EV',
    win:'M155 68 L405 68 Q435 84 438 140 L122 140 Q125 84 155 68 Z' },
]

// ── Wheel SVG ─────────────────────────────────────────────────────────────────
function Wheel({ cx, cy, wid }) {
  const uid=`w${cx}${cy}${wid}`
  const sc = wid==='w23_lux'?'#C8A458':wid==='w22_sport'?'#d8d8d8':'#909090'
  const sw = wid==='w21_classic'?4:2.5
  const angles = wid==='w23_lux'?[0,45,90,135,180,225,270,315]:wid==='w22_sport'?[0,60,120,180,240,300]:wid==='w21_classic'?[0,72,144,216,288]:[0,90,180,270]
  return (
    <g>
      <defs>
        <radialGradient id={`t${uid}`} cx="38%" cy="34%" r="58%"><stop offset="0%" stopColor="#5a5a5a"/><stop offset="100%" stopColor="#0e0e0e"/></radialGradient>
        <radialGradient id={`r${uid}`} cx="36%" cy="30%" r="56%"><stop offset="0%" stopColor="#484848"/><stop offset="100%" stopColor="#181818"/></radialGradient>
        <radialGradient id={`h${uid}`} cx="35%" cy="30%" r="58%"><stop offset="0%" stopColor="#505050"/><stop offset="100%" stopColor="#111"/></radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={50} fill={`url(#t${uid})`} stroke="#2e2e2e" strokeWidth="1.5"/>
      <ellipse cx={cx-14} cy={cy-17} rx={9} ry={5} fill="rgba(255,255,255,0.06)" transform={`rotate(-35,${cx-14},${cy-17})`}/>
      <circle cx={cx} cy={cy} r={38} fill={`url(#r${uid})`} stroke={wid.includes('lux')?'#C8A458':'#4a4a4a'} strokeWidth="1.2"/>
      {wid==='w21_aero'
        ?[0,90,180,270].map((a,i)=>{const r1=16,r2=36,xm=cx+Math.cos((a+28)*Math.PI/180)*(r1+r2)/2,ym=cy+Math.sin((a+28)*Math.PI/180)*(r1+r2)/2;return<path key={i} d={`M${cx+Math.cos(a*Math.PI/180)*r1} ${cy+Math.sin(a*Math.PI/180)*r1} Q${xm} ${ym} ${cx+Math.cos((a+45)*Math.PI/180)*r2} ${cy+Math.sin((a+45)*Math.PI/180)*r2}`} stroke={sc} strokeWidth="2.2" fill="none"/>})
        :angles.map((a,i)=><line key={i} x1={cx+Math.cos(a*Math.PI/180)*16} y1={cy+Math.sin(a*Math.PI/180)*16} x2={cx+Math.cos(a*Math.PI/180)*36} y2={cy+Math.sin(a*Math.PI/180)*36} stroke={sc} strokeWidth={sw}/>)
      }
      <circle cx={cx} cy={cy} r={13} fill={`url(#h${uid})`} stroke="#4a4a4a" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={5} fill="#222"/>
      <circle cx={cx} cy={cy} r={38} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" strokeDasharray="50 200" strokeDashoffset="-15"/>
    </g>
  )
}

// ── SIDE VIEW ─────────────────────────────────────────────────────────────────
function SideView({ shape, c, wid, mono }) {
  const id=`sv${c?.replace('#','')}`
  const hex=c||'#888'
  const light=isLight(hex)
  return (
    <svg viewBox="0 0 700 260" fill="none" style={{width:'100%',maxHeight:260,transition:'all 0.4s ease'}}>
      <defs>
        <linearGradient id={`sb${id}`} x1="350" y1="38" x2="350" y2="212" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tint(hex,0.58)}/>
          <stop offset="18%" stopColor={tint(hex,0.24)}/>
          <stop offset="55%" stopColor={hex}/>
          <stop offset="82%" stopColor={shade(hex,0.22)}/>
          <stop offset="100%" stopColor={shade(hex,0.42)}/>
        </linearGradient>
        <linearGradient id={`sg${id}`} x1="10%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="rgba(230,248,255,0.42)"/>
          <stop offset="42%" stopColor="rgba(185,225,245,0.20)"/>
          <stop offset="100%" stopColor="rgba(75,148,215,0.30)"/>
        </linearGradient>
        <linearGradient id={`ss${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="22%" stopColor={`rgba(255,255,255,${light?'0.06':'0.20'})`}/>
          <stop offset="58%" stopColor={`rgba(255,255,255,${light?'0.03':'0.10'})`}/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <radialGradient id={`sgnd${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.28)"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        {/* Colored glow on ground */}
        <radialGradient id={`sglow${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`${hex}44`}/><stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>

      {/* Ground glow */}
      <ellipse cx="350" cy="255" rx="240" ry="20" fill={`url(#sglow${id})`}/>
      {/* Shadow */}
      <ellipse cx="350" cy="250" rx="248" ry="12" fill={`url(#sgnd${id})`}/>

      {/* Body */}
      <path d={shape.body} fill={`url(#sb${id})`}/>
      <path d={shape.cabin} fill={`url(#sb${id})`} stroke={shade(hex,0.14)} strokeWidth="0.6"/>
      {/* Shoulder highlight */}
      <path d={shape.body} fill={`url(#ss${id})`}/>
      <path d={shape.body} fill="none" stroke={shade(hex,0.28)} strokeWidth="0.8" strokeOpacity="0.55"/>

      {/* Glass */}
      <path d={shape.glassL} fill={`url(#sg${id})`} stroke="rgba(255,255,255,0.30)" strokeWidth="0.7"/>
      <path d={shape.glassR} fill={`url(#sg${id})`} stroke="rgba(255,255,255,0.30)" strokeWidth="0.7"/>
      {shape.glassC&&<path d={shape.glassC} fill={`url(#sg${id})`} stroke="rgba(255,255,255,0.30)" strokeWidth="0.7"/>}
      <path d={shape.glassL} fill="rgba(255,255,255,0.07)"/>

      {/* Pillars */}
      {shape.pillarL&&<line x1={shape.pillarL.x1} y1={shape.pillarL.y1} x2={shape.pillarL.x2} y2={shape.pillarL.y2} stroke={shade(hex,0.20)} strokeWidth="2" strokeOpacity="0.55"/>}
      {shape.pillarR&&<line x1={shape.pillarR.x1} y1={shape.pillarR.y1} x2={shape.pillarR.x2} y2={shape.pillarR.y2} stroke={shade(hex,0.20)} strokeWidth="2" strokeOpacity="0.55"/>}

      {/* Headlights */}
      <path d={shape.headOuter} fill="rgba(255,248,220,0.08)" stroke="#C8A850" strokeWidth="1.2"/>
      <path d={shape.headInner} fill="rgba(255,245,200,0.65)"/>
      <path d={shape.drl} fill="none" stroke="rgba(255,255,255,0.80)" strokeWidth="1.8" strokeLinecap="round"/>

      {/* Taillights */}
      <path d={shape.rearOuter} fill="rgba(200,30,30,0.10)" stroke="rgba(218,42,42,0.72)" strokeWidth="1.2"/>
      <path d={shape.rearInner} fill="rgba(225,42,42,0.58)"/>

      {/* Brand */}
      <text x="350" y={shape.textY} textAnchor="middle" fill={light?'rgba(0,0,0,0.12)':'rgba(255,255,255,0.10)'} fontSize="9" fontWeight="bold" letterSpacing="5" fontFamily="Roboto,sans-serif">VANTAGE</text>

      {/* Monogram */}
      {mono&&(
        <>
          <rect x="282" y={shape.textY-36} width="136" height="36" rx="1" fill="rgba(0,0,0,0.10)" stroke="rgba(166,137,102,0.38)" strokeWidth="0.8"/>
          <text x="350" y={shape.textY-14} textAnchor="middle" fill="rgba(166,137,102,0.92)" fontSize="18" fontWeight="bold" letterSpacing="5" fontFamily="Roboto,sans-serif" fontStyle="italic">{mono}</text>
          <text x="350" y={shape.textY+0} textAnchor="middle" fill="rgba(166,137,102,0.45)" fontSize="7" letterSpacing="2.5" fontFamily="Roboto,sans-serif">PERSONAL EDITION</text>
        </>
      )}

      <Wheel cx={shape.w1x} cy={203} wid={wid}/>
      <Wheel cx={shape.w2x} cy={203} wid={wid}/>
    </svg>
  )
}

// ── FRONT VIEW ────────────────────────────────────────────────────────────────
function GrilleInner({ s, x, y, w, h }) {
  if (s==='mesh') return <>{[0,1,2,3,4,5].map(i=>[
    <line key={`h${i}`} x1={x} y1={y+i*(h/5)} x2={x+w} y2={y+i*(h/5)} stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>,
    <line key={`v${i}`} x1={x+i*(w/5)} y1={y} x2={x+i*(w/5)} y2={y+h} stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>
  ])}</>
  if (s==='slat') return <>{[0,1,2,3,4].map(i=><rect key={i} x={x+4} y={y+6+i*16} width={w-8} height="7" rx="1" fill="rgba(255,255,255,0.09)"/>)}</>
  if (s==='sport') return <>{[0,1,2,3].map(i=><rect key={i} x={x+2} y={y+5+i*18} width={w-4} height="5" rx="0" fill="rgba(255,255,255,0.08)"/>)}</>
  if (s==='ev') return <><rect x={x+4} y={y+h/2-6} width={w-8} height="12" rx="2" fill="rgba(100,180,255,0.18)" stroke="rgba(100,210,255,0.35)" strokeWidth="0.8"/><text x={x+w/2} y={y+h/2+4} textAnchor="middle" fill="rgba(120,210,255,0.55)" fontSize="8" letterSpacing="2" fontFamily="Roboto">EV</text></>
  return null
}

function FrontView({ mi, c, wid, mono }) {
  const v=FRONT_V[mi]
  const id=`fv${mi}${c?.replace('#','')}`
  const hex=c||'#888'
  const gx={mesh:162,slat:155,sport:165,ev:168}[v.gs]
  const gw={mesh:236,slat:250,sport:230,ev:224}[v.gs]
  return (
    <svg viewBox="0 0 560 390" fill="none" style={{width:'100%',maxHeight:340,transition:'all 0.4s ease'}}>
      <defs>
        <linearGradient id={`fb${id}`} x1="280" y1="50" x2="280" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tint(hex,0.62)}/><stop offset="18%" stopColor={tint(hex,0.28)}/><stop offset="52%" stopColor={hex}/><stop offset="82%" stopColor={shade(hex,0.22)}/><stop offset="100%" stopColor={shade(hex,0.42)}/>
        </linearGradient>
        <linearGradient id={`fg${id}`} x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor="rgba(238,248,255,0.44)"/><stop offset="45%" stopColor="rgba(190,228,250,0.22)"/><stop offset="100%" stopColor="rgba(68,145,218,0.32)"/>
        </linearGradient>
        <linearGradient id={`fhd${id}`} x1="280" y1="138" x2="280" y2="204" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tint(hex,0.20)}/><stop offset="100%" stopColor={shade(hex,0.14)}/>
        </linearGradient>
        <radialGradient id={`fgnd${id}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(0,0,0,0.30)"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/></radialGradient>
        <radialGradient id={`fglow${id}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={`${hex}44`}/><stop offset="100%" stopColor="rgba(0,0,0,0)"/></radialGradient>
      </defs>

      <ellipse cx="280" cy="386" rx="240" ry="20" fill={`url(#fglow${id})`}/>
      <ellipse cx="280" cy="382" rx="232" ry="14" fill={`url(#fgnd${id})`}/>

      {/* Roof */}
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L144 138 Q154 70 190 55 Z" fill={`url(#fb${id})`}/>
      {/* Side panels */}
      <path d="M144 138 L68 202 L64 308 Q62 342 80 358 L194 358 Q178 340 170 308 L170 294 L144 294 L144 138 Z" fill={`url(#fb${id})`}/>
      <path d="M416 138 L492 202 L496 308 Q498 342 480 358 L366 358 Q382 340 390 308 L390 294 L416 294 L416 138 Z" fill={`url(#fb${id})`}/>
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L492 202 L496 308 Q498 342 480 358 L80 358 Q62 342 64 308 L68 202 L144 138 Q154 70 190 55 Z" fill="none" stroke={shade(hex,0.30)} strokeWidth="0.9" strokeOpacity="0.55"/>

      {/* Hood */}
      <path d="M144 138 L68 202 L492 202 L416 138 Z" fill={`url(#fhd${id})`}/>
      <path d="M144 138 L68 202 L492 202 L416 138 Z" fill="none" stroke={shade(hex,0.22)} strokeWidth="0.7" strokeOpacity="0.45"/>
      <line x1="280" y1="142" x2="280" y2="200" stroke={tint(hex,0.28)} strokeWidth="1" strokeOpacity="0.55"/>

      {/* Windshield */}
      <path d="M194 58 Q280 49 366 58 Q400 73 408 136 L152 136 Q160 73 194 58 Z" fill={`url(#fg${id})`} stroke="rgba(255,255,255,0.28)" strokeWidth="0.9"/>
      <path d="M196 65 Q264 56 332 62 L318 132 L188 132 Z" fill="rgba(255,255,255,0.07)"/>
      <path d="M194 58 Q280 49 366 58 Q400 73 408 136 L152 136 Q160 73 194 58 Z" fill="none" stroke={shade(hex,0.16)} strokeWidth="2.2" strokeOpacity="0.6"/>

      {/* Headlights */}
      <path d={v.headL} fill="rgba(18,18,28,0.88)" stroke={shade(hex,0.32)} strokeWidth="1"/>
      <path d={v.headR} fill="rgba(18,18,28,0.88)" stroke={shade(hex,0.32)} strokeWidth="1"/>
      <path d={v.headL} fill="rgba(255,248,210,0.48)"/>
      <path d={v.headR} fill="rgba(255,248,210,0.48)"/>
      <path d={v.drlL} fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth="2.4" strokeLinecap="round"/>
      <path d={v.drlR} fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth="2.4" strokeLinecap="round"/>

      {/* Grille */}
      <path d={v.grille} fill="rgba(14,14,18,0.90)" stroke="rgba(90,90,90,0.45)" strokeWidth="1"/>
      <GrilleInner s={v.gs} x={gx} y={218} w={gw} h={76}/>
      <circle cx="280" cy="256" r="19" fill="rgba(28,28,28,0.92)" stroke="#A68966" strokeWidth="1.3"/>
      <text x="280" y="261" textAnchor="middle" fill="#C8A458" fontSize="11" fontWeight="900" fontFamily="Roboto,sans-serif">V</text>

      {/* Bumper */}
      <path d="M64 308 Q62 342 80 358 L480 358 Q498 342 496 308 Z" fill={shade(hex,0.38)} stroke={shade(hex,0.48)} strokeWidth="0.8"/>
      <path d="M170 332 L390 332 L386 352 L174 352 Z" fill="rgba(0,0,0,0.28)"/>
      {[192,224,256,280,304,336,368].map(x=><line key={x} x1={x} y1={334} x2={x} y2={350} stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>)}

      {/* Wheel arches front */}
      <path d="M64 308 Q64 356 122 365 Q174 372 178 358 L178 308 Z" fill={shade(hex,0.45)} stroke={shade(hex,0.58)} strokeWidth="0.8"/>
      <ellipse cx="122" cy="345" rx="48" ry="48" fill="rgba(18,18,18,0.92)" stroke="#2e2e2e" strokeWidth="1.5"/>
      <circle cx="122" cy="345" r="36" fill="rgba(36,36,36,0.92)" stroke="#555" strokeWidth="1"/>
      <circle cx="122" cy="345" r="13" fill="#1a1a1a"/>
      {[0,60,120,180,240,300].map((a,i)=><line key={i} x1={122+Math.cos(a*Math.PI/180)*14} y1={345+Math.sin(a*Math.PI/180)*14} x2={122+Math.cos(a*Math.PI/180)*34} y2={345+Math.sin(a*Math.PI/180)*34} stroke="#c8c8c8" strokeWidth="2.2"/>)}
      <path d="M496 308 Q496 356 438 365 Q386 372 382 358 L382 308 Z" fill={shade(hex,0.45)} stroke={shade(hex,0.58)} strokeWidth="0.8"/>
      <ellipse cx="438" cy="345" rx="48" ry="48" fill="rgba(18,18,18,0.92)" stroke="#2e2e2e" strokeWidth="1.5"/>
      <circle cx="438" cy="345" r="36" fill="rgba(36,36,36,0.92)" stroke="#555" strokeWidth="1"/>
      <circle cx="438" cy="345" r="13" fill="#1a1a1a"/>
      {[0,60,120,180,240,300].map((a,i)=><line key={i} x1={438+Math.cos(a*Math.PI/180)*14} y1={345+Math.sin(a*Math.PI/180)*14} x2={438+Math.cos(a*Math.PI/180)*34} y2={345+Math.sin(a*Math.PI/180)*34} stroke="#c8c8c8" strokeWidth="2.2"/>)}

      {mono&&<text x="280" y="108" textAnchor="middle" fill="rgba(166,137,102,0.70)" fontSize="16" fontWeight="bold" letterSpacing="5" fontFamily="Roboto,sans-serif" fontStyle="italic">{mono}</text>}
    </svg>
  )
}

// ── REAR VIEW ─────────────────────────────────────────────────────────────────
function RearView({ mi, c, mono }) {
  const v=REAR_V[mi]
  const id=`rv${mi}${c?.replace('#','')}`
  const hex=c||'#888'
  const light=isLight(hex)
  return (
    <svg viewBox="0 0 560 390" fill="none" style={{width:'100%',maxHeight:340,transition:'all 0.4s ease'}}>
      <defs>
        <linearGradient id={`rb${id}`} x1="280" y1="50" x2="280" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tint(hex,0.58)}/><stop offset="20%" stopColor={tint(hex,0.24)}/><stop offset="55%" stopColor={hex}/><stop offset="82%" stopColor={shade(hex,0.22)}/><stop offset="100%" stopColor={shade(hex,0.42)}/>
        </linearGradient>
        <linearGradient id={`rg${id}`} x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor="rgba(235,248,255,0.42)"/><stop offset="45%" stopColor="rgba(190,228,248,0.22)"/><stop offset="100%" stopColor="rgba(70,145,215,0.30)"/>
        </linearGradient>
        <radialGradient id={`rgnd${id}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(0,0,0,0.30)"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/></radialGradient>
        <radialGradient id={`rglow${id}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={`${hex}44`}/><stop offset="100%" stopColor="rgba(0,0,0,0)"/></radialGradient>
        <clipPath id={`rcp${id}`}><path d={v.win}/></clipPath>
      </defs>

      <ellipse cx="280" cy="386" rx="240" ry="20" fill={`url(#rglow${id})`}/>
      <ellipse cx="280" cy="382" rx="232" ry="14" fill={`url(#rgnd${id})`}/>

      {/* Body */}
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L492 202 L496 308 Q498 342 480 358 L80 358 Q62 342 64 308 L68 202 L144 138 Q154 70 190 55 Z" fill={`url(#rb${id})`}/>
      <path d="M190 55 Q280 46 370 55 Q406 70 416 138 L492 202 L496 308 Q498 342 480 358 L80 358 Q62 342 64 308 L68 202 L144 138 Q154 70 190 55 Z" fill="none" stroke={shade(hex,0.30)} strokeWidth="0.9" strokeOpacity="0.52"/>
      {/* Upper body highlight */}
      <path d="M194 58 Q280 49 366 58 Q400 73 408 136 L416 138 Q406 70 370 55 Q280 46 190 55 Q154 70 144 138 L152 136 Q160 73 194 58 Z" fill={tint(hex,0.30)}/>

      {/* Rear glass */}
      <path d={v.win} fill={`url(#rg${id})`} stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>
      <path d="M158 76 Q208 62 265 68 L252 138 L135 138 Z" fill="rgba(255,255,255,0.07)" clipPath={`url(#rcp${id})`}/>
      <path d={v.win} fill="none" stroke={shade(hex,0.18)} strokeWidth="2.2" strokeOpacity="0.55"/>

      {/* Nameplate */}
      <text x="280" y="170" textAnchor="middle" fill={light?'rgba(0,0,0,0.35)':'rgba(255,255,255,0.35)'} fontSize="11" fontWeight="bold" letterSpacing="6" fontFamily="Roboto,sans-serif">{v.name}</text>
      <text x="280" y="184" textAnchor="middle" fill="rgba(166,137,102,0.40)" fontSize="6.5" letterSpacing="3.5" fontFamily="Roboto,sans-serif">VANTAGE AUTOMOTIVE</text>

      {/* Monogram */}
      {mono&&(
        <>
          <rect x="242" y="192" width="76" height="28" rx="1" fill="rgba(0,0,0,0.12)" stroke="rgba(166,137,102,0.42)" strokeWidth="0.8"/>
          <text x="280" y="211" textAnchor="middle" fill="rgba(166,137,102,0.90)" fontSize="15" fontWeight="bold" letterSpacing="5" fontFamily="Roboto,sans-serif" fontStyle="italic">{mono}</text>
        </>
      )}

      {/* Taillights */}
      <path d={v.tailL} fill="rgba(18,14,14,0.88)" stroke={shade(hex,0.32)} strokeWidth="1"/>
      <path d={v.tailR} fill="rgba(18,14,14,0.88)" stroke={shade(hex,0.32)} strokeWidth="1"/>
      <path d={v.tailL} fill="rgba(215,38,38,0.58)"/>
      <path d={v.tailR} fill="rgba(215,38,38,0.58)"/>
      <path d={v.ledL} fill="none" stroke="rgba(255,82,82,0.88)" strokeWidth="2.4" strokeLinecap="round"/>
      <path d={v.ledR} fill="none" stroke="rgba(255,82,82,0.88)" strokeWidth="2.4" strokeLinecap="round"/>

      {/* Bumper */}
      <path d="M64 308 Q62 342 80 358 L480 358 Q498 342 496 308 Z" fill={shade(hex,0.38)} stroke={shade(hex,0.48)} strokeWidth="0.8"/>
      <ellipse cx="196" cy="352" rx="22" ry="8" fill="rgba(0,0,0,0.58)" stroke="#555" strokeWidth="1"/>
      <ellipse cx="196" cy="352" rx="16" ry="5" fill="rgba(28,28,28,0.85)"/>
      <ellipse cx="364" cy="352" rx="22" ry="8" fill="rgba(0,0,0,0.58)" stroke="#555" strokeWidth="1"/>
      <ellipse cx="364" cy="352" rx="16" ry="5" fill="rgba(28,28,28,0.85)"/>
      <rect x="224" y="300" width="112" height="28" rx="1" fill="rgba(242,242,242,0.88)" stroke="#888" strokeWidth="0.8"/>
      <text x="280" y="320" textAnchor="middle" fill="#333" fontSize="7.5" letterSpacing="2.5" fontFamily="Roboto,sans-serif" fontWeight="bold">VNT · 0000</text>

      {/* Rear wheel arches */}
      <path d="M64 308 Q62 356 120 365 Q174 372 178 358 L178 308 Z" fill={shade(hex,0.45)}/>
      <ellipse cx="122" cy="345" rx="48" ry="48" fill="rgba(18,18,18,0.92)" stroke="#2e2e2e" strokeWidth="1.5"/>
      <circle cx="122" cy="345" r="36" fill="rgba(36,36,36,0.92)" stroke="#555" strokeWidth="1"/>
      <circle cx="122" cy="345" r="13" fill="#1a1a1a"/>
      {[0,60,120,180,240,300].map((a,i)=><line key={i} x1={122+Math.cos(a*Math.PI/180)*14} y1={345+Math.sin(a*Math.PI/180)*14} x2={122+Math.cos(a*Math.PI/180)*34} y2={345+Math.sin(a*Math.PI/180)*34} stroke="#c8c8c8" strokeWidth="2.2"/>)}
      <path d="M496 308 Q498 356 440 365 Q386 372 382 358 L382 308 Z" fill={shade(hex,0.45)}/>
      <ellipse cx="438" cy="345" rx="48" ry="48" fill="rgba(18,18,18,0.92)" stroke="#2e2e2e" strokeWidth="1.5"/>
      <circle cx="438" cy="345" r="36" fill="rgba(36,36,36,0.92)" stroke="#555" strokeWidth="1"/>
      <circle cx="438" cy="345" r="13" fill="#1a1a1a"/>
      {[0,60,120,180,240,300].map((a,i)=><line key={i} x1={438+Math.cos(a*Math.PI/180)*14} y1={345+Math.sin(a*Math.PI/180)*14} x2={438+Math.cos(a*Math.PI/180)*34} y2={345+Math.sin(a*Math.PI/180)*34} stroke="#c8c8c8" strokeWidth="2.2"/>)}
    </svg>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
const VIEWS = [
  { key:'side',  ko:'측면' },
  { key:'front', ko:'정면' },
  { key:'rear',  ko:'후면' },
]

export default function CustomizeSection() {
  const [selectedModel, setSelectedModel] = useState(0)
  const [selectedColor, setSelectedColor] = useState('abyss_black')
  const [selectedWheel, setSelectedWheel] = useState('w22_sport')
  const [monogram, setMonogram]           = useState('')
  const [view, setView]                   = useState('side')
  const [shareMsg, setShareMsg]           = useState('')
  const navigate  = useNavigate()

  const model     = MODELS[selectedModel]
  const color     = CAR_COLORS.find(c => c.id === selectedColor)
  const wheel     = WHEEL_OPTIONS.find(w => w.id === selectedWheel)
  const finalPrice = getDiscountedPrice(model.basePrice, model.discountRate) + (wheel?.price||0)
  const shape     = SIDE_SHAPES[selectedModel]

  const handleShare = () => {
    const text = `VANTAGE ${model.name} / ${color.nameKo} / ${wheel.name} — 나만의 VANTAGE를 구성했습니다!`
    if (navigator.share) {
      navigator.share({ title:'VANTAGE 커스터마이징', text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(text)
      setShareMsg('링크가 복사되었습니다!')
      setTimeout(() => setShareMsg(''), 2000)
    }
  }

  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 8, md: 12 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 } }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>CONFIGURE</Typography>
          <Typography variant="h2" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2 }}>나만의 VANTAGE</Typography>
          <Typography sx={{ color: '#666', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
            색상, 휠, 이니셜 각인까지. 당신만을 위한 ONE-OF-A-KIND를 완성하세요.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* ── 왼쪽 옵션 패널 ── */}
          <Grid item xs={12} md={3.6}>
            {/* 01. 모델 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>01. 모델 선택</Typography>
              {MODELS.map((m, i) => (
                <Box key={m.id} onClick={() => { setSelectedModel(i); setView('side') }}
                  sx={{ p:2, mb:1, border:`1px solid ${selectedModel===i?'#A68966':'#e0e0e0'}`, cursor:'pointer',
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    bgcolor: selectedModel===i?'rgba(166,137,102,0.06)':'transparent',
                    transition:'border-color 0.2s', userSelect:'none', '&:hover':{ borderColor:'rgba(166,137,102,0.6)' } }}>
                  <Typography sx={{ color: selectedModel===i?'#111':'#888', fontSize:'0.875rem', fontWeight: selectedModel===i?600:400 }}>{m.shortName}</Typography>
                  {selectedModel===i&&<CheckIcon sx={{ color:'#A68966', fontSize:'1rem' }}/>}
                </Box>
              ))}
            </Box>

            {/* 02. 색상 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>02. 색상 선택</Typography>
              <Box sx={{ display:'flex', flexWrap:'wrap', gap:1.5, mb:1 }}>
                {CAR_COLORS.map((c) => (
                  <Tooltip key={c.id} title={c.nameKo} placement="top">
                    <Box onClick={() => setSelectedColor(c.id)}
                      sx={{ width:32, height:32, bgcolor:c.hex, border:`2px solid ${selectedColor===c.id?'#A68966':'#e0e0e0'}`,
                        cursor:'pointer', position:'relative', transition:'border-color 0.2s', userSelect:'none' }}>
                      {selectedColor===c.id&&(
                        <Box sx={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <CheckIcon sx={{ color: isLight(c.hex)?'#333':'#fff', fontSize:'0.9rem' }}/>
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
              <Typography sx={{ color:'#666', fontSize:'0.8rem', mt:1 }}>{color?.nameKo}</Typography>
            </Box>

            {/* 03. 휠 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 2 }}>03. 휠 선택</Typography>
              {WHEEL_OPTIONS.map((w) => (
                <Box key={w.id} onClick={() => setSelectedWheel(w.id)}
                  sx={{ p:1.5, mb:1, border:`1px solid ${selectedWheel===w.id?'#A68966':'#e0e0e0'}`, cursor:'pointer',
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    bgcolor: selectedWheel===w.id?'rgba(166,137,102,0.06)':'transparent',
                    transition:'border-color 0.2s', userSelect:'none', '&:hover':{ borderColor:'rgba(166,137,102,0.6)' } }}>
                  <Box>
                    <Typography sx={{ color: selectedWheel===w.id?'#111':'#888', fontSize:'0.85rem', fontWeight: selectedWheel===w.id?600:400 }}>{w.name}</Typography>
                    <Typography sx={{ color:'#A68966', fontSize:'0.75rem' }}>+{formatPrice(w.price)}</Typography>
                  </Box>
                  {selectedWheel===w.id&&<CheckIcon sx={{ color:'#A68966', fontSize:'1rem' }}/>}
                </Box>
              ))}
            </Box>

            {/* 04. 이니셜 — 실시간 반영 */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#A68966', fontSize: '0.75rem', letterSpacing: '0.15em', mb: 0.8 }}>04. 이니셜 각인</Typography>
              <Typography sx={{ color: '#bbb', fontSize: '0.72rem', mb: 1.5 }}>입력 즉시 차량에 반영됩니다</Typography>
              <TextField fullWidth placeholder="이니셜 입력 (최대 4자)" value={monogram}
                onChange={(e) => { if (e.target.value.length<=4) setMonogram(e.target.value.toUpperCase()) }}
                size="small" sx={{ mb:1 }}/>
              {monogram&&(
                <Chip label={`"${monogram}" 각인 적용 중`} onDelete={() => setMonogram('')}
                  sx={{ bgcolor:'rgba(166,137,102,0.08)', color:'#A68966', border:'1px solid rgba(166,137,102,0.3)', borderRadius:0, fontSize:'0.75rem' }}/>
              )}
            </Box>
          </Grid>

          {/* ── 오른쪽 3D 프리뷰 ── */}
          <Grid item xs={12} md={8.4}>
            {/* Studio canvas */}
            <Box sx={{ background: 'linear-gradient(180deg, #1a1e28 0%, #0e1018 55%, #080a10 100%)', border:'1px solid rgba(255,255,255,0.08)', p:{ xs:2, md:3 } }}>
              {/* View selector — slide style */}
              <Box sx={{ display:'flex', justifyContent:'center', mb:3, position:'relative' }}>
                <Box sx={{ display:'flex', border:'1px solid rgba(255,255,255,0.12)', position:'relative' }}>
                  {VIEWS.map(({ key, ko }) => (
                    <Box key={key} onClick={() => setView(key)}
                      sx={{
                        px:{ xs:2.5, md:4 }, py:1.2, cursor:'pointer', userSelect:'none', position:'relative', zIndex:1,
                        transition:'all 0.25s',
                      }}>
                      <Typography sx={{
                        fontSize:'0.78rem', letterSpacing:'0.15em', fontWeight: view===key?600:400,
                        color: view===key?'#fff':'rgba(255,255,255,0.4)',
                        transition:'color 0.25s',
                      }}>{ko}</Typography>
                      {/* Active underline indicator */}
                      <Box sx={{
                        position:'absolute', bottom:0, left:'10%', right:'10%', height:'2px',
                        bgcolor: view===key?'#A68966':'transparent', transition:'all 0.3s',
                      }}/>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Car viewport */}
              <Box sx={{ position:'relative', mb:2 }}>
                {/* Studio spotlight */}
                <Box sx={{
                  position:'absolute', inset:0, pointerEvents:'none',
                  background:'radial-gradient(ellipse at 50% 25%, rgba(255,255,255,0.04) 0%, transparent 65%)',
                }}/>

                {/* Ground gradient */}
                <Box sx={{
                  position:'absolute', bottom:0, left:0, right:0, height:'30%', pointerEvents:'none',
                  background:'linear-gradient(to top, rgba(8,10,16,0.6) 0%, transparent 100%)',
                }}/>

                {/* Colored ground glow */}
                <Box sx={{
                  position:'absolute', bottom:'8%', left:'50%', transform:'translateX(-50%)',
                  width:'60%', height:28,
                  background:`radial-gradient(ellipse, ${color?.hex}30 0%, transparent 70%)`,
                  filter:'blur(10px)', pointerEvents:'none',
                }}/>

                {/* Car SVG */}
                <Box sx={{ px:{ xs:1, md:2 }, py:1, textAlign:'center' }}>
                  {view==='side'&&<SideView shape={shape} c={color?.hex} wid={selectedWheel} mono={monogram}/>}
                  {view==='front'&&<FrontView mi={selectedModel} c={color?.hex} wid={selectedWheel} mono={monogram}/>}
                  {view==='rear'&&<RearView mi={selectedModel} c={color?.hex} mono={monogram}/>}
                </Box>

                {/* Reflection strip */}
                <Box sx={{
                  position:'absolute', bottom:0, left:0, right:0, height:20, pointerEvents:'none',
                  background:'linear-gradient(to bottom, transparent, rgba(255,255,255,0.015))',
                }}/>
              </Box>

              {/* Color indicator strip */}
              <Box sx={{ display:'flex', gap:1, justifyContent:'center', mb:2.5 }}>
                {CAR_COLORS.map(c => (
                  <Box key={c.id} onClick={() => setSelectedColor(c.id)}
                    title={c.nameKo}
                    sx={{ width: selectedColor===c.id?22:14, height: selectedColor===c.id?22:14,
                      bgcolor:c.hex, border:`2px solid ${selectedColor===c.id?'#A68966':'rgba(255,255,255,0.15)'}`,
                      cursor:'pointer', transition:'all 0.2s', userSelect:'none' }}/>
                ))}
              </Box>
            </Box>

            {/* Summary + price */}
            <Box sx={{ bgcolor:'#fff', border:'1px solid #e0e0e0', borderTop:'none', p:{ xs:2, md:3 } }}>
              <Grid container spacing={2} sx={{ mb:2.5 }}>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ color:'#666', fontSize:'0.75rem', letterSpacing:'0.1em', mb:0.5 }}>모델</Typography>
                  <Typography sx={{ color:'#111', fontSize:'0.9rem', fontWeight:500 }}>{model.shortName}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ color:'#666', fontSize:'0.75rem', letterSpacing:'0.1em', mb:0.5 }}>색상</Typography>
                  <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
                    <Box sx={{ width:14, height:14, bgcolor:color?.hex, border:'1px solid #e0e0e0' }}/>
                    <Typography sx={{ color:'#111', fontSize:'0.9rem', fontWeight:500 }}>{color?.nameKo}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ color:'#666', fontSize:'0.75rem', letterSpacing:'0.1em', mb:0.5 }}>휠</Typography>
                  <Typography sx={{ color:'#111', fontSize:'0.9rem', fontWeight:500 }}>{wheel?.name}</Typography>
                </Grid>
              </Grid>

              <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', mb:2.5 }}>
                <Box>
                  <Typography sx={{ color:'#666', fontSize:'0.75rem', letterSpacing:'0.1em', mb:0.5 }}>예상 금액</Typography>
                  <Typography sx={{ color:'#0c121c', fontWeight:700, fontSize:{ xs:'1.5rem', md:'1.8rem' } }}>
                    {formatPrice(finalPrice)}
                  </Typography>
                  <Typography sx={{ color:'#999', fontSize:'0.75rem' }}>부가세 포함 · 옵션 추가 금액 별도</Typography>
                </Box>
                <IconButton onClick={handleShare} sx={{ color:'#666', '&:hover':{ color:'#A68966' }, border:'1px solid #e0e0e0' }}>
                  <ShareIcon fontSize="small"/>
                </IconButton>
              </Box>

              {shareMsg&&<Typography sx={{ color:'#A68966', fontSize:'0.8rem', mb:2 }}>{shareMsg}</Typography>}

              <Box sx={{ display:'flex', gap:2 }}>
                <Button fullWidth variant="contained"
                  onClick={() => navigate('/reservation', { state:{ car:CARS[selectedModel], color, wheel } })}
                  sx={{ bgcolor:'#0c121c', color:'#fff', border:'none', '&:hover':{ bgcolor:'#1e2a3a' }, py:1.8, fontWeight:600 }}>
                  이 구성으로 시승 예약
                </Button>
                <Button fullWidth variant="outlined"
                  onClick={() => navigate('/reservation', { state:{ car:CARS[selectedModel], color, wheel, type:'quote' } })}
                  sx={{ borderColor:'#0c121c', color:'#0c121c', py:1.8, '&:hover':{ bgcolor:'#0c121c', color:'#fff' } }}>
                  견적 문의
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
