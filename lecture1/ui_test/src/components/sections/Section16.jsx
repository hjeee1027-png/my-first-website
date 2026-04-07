import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Paper,
} from '@mui/material'
import {
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
} from '@mui/icons-material'

const slides = [
  { id: 1, label: 'React',      sub: 'UI 라이브러리',      bg: '#20232a', color: '#61dafb' },
  { id: 2, label: 'TypeScript', sub: '정적 타입 언어',       bg: '#3178c6', color: '#fff' },
  { id: 3, label: 'MUI',        sub: 'Material UI',        bg: '#007fff', color: '#fff' },
  { id: 4, label: 'Vite',       sub: '빌드 도구',           bg: '#646cff', color: '#fff' },
  { id: 5, label: 'Node.js',    sub: '서버 런타임',          bg: '#3c873a', color: '#fff' },
]

const Section16 = () => {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(null)   // 'left' | 'right' — 마지막 스와이프 방향

  const prev = () => {
    setDir('right')
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }

  const next = () => {
    setDir('left')
    setIndex((i) => (i + 1) % slides.length)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: true,          // 마우스 드래그도 스와이프로 감지
    preventScrollOnSwipe: true,
  })

  const current = slides[index]

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 16 — Swipe
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* 슬라이더 */}
      <Box
        {...handlers}
        sx={{ position: 'relative', userSelect: 'none', touchAction: 'pan-y' }}
      >
        <Paper
          elevation={4}
          sx={{
            height: 220,
            backgroundColor: current.bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <Typography variant="h3" sx={{ color: current.color, fontWeight: 700, lineHeight: 1.1 }}>
            {current.label}
          </Typography>
          <Typography variant="body1" sx={{ color: current.color, opacity: 0.75, mt: 1 }}>
            {current.sub}
          </Typography>
        </Paper>

        {/* 이전 버튼 */}
        <IconButton
          onClick={prev}
          sx={{
            position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.85)',
            '&:hover': { backgroundColor: '#fff' },
          }}
        >
          <PrevIcon />
        </IconButton>

        {/* 다음 버튼 */}
        <IconButton
          onClick={next}
          sx={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.85)',
            '&:hover': { backgroundColor: '#fff' },
          }}
        >
          <NextIcon />
        </IconButton>
      </Box>

      {/* 인디케이터 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {slides.map((s, i) => (
          <Box
            key={s.id}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 24 : 8,
              height: 8,
              borderRadius: 99,
              backgroundColor: i === index ? 'primary.main' : 'grey.400',
              cursor: 'pointer',
              transition: 'width 0.25s, background-color 0.25s',
            }}
          />
        ))}
      </Box>

      {/* 상태 표시 */}
      <Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: 'grey.50' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2">
            <strong>현재 슬라이드:</strong> {index + 1} / {slides.length} — {current.label}
          </Typography>
          <Typography variant="body2">
            <strong>마지막 방향:</strong>{' '}
            {dir === 'left' ? '← 왼쪽 스와이프' : dir === 'right' ? '→ 오른쪽 스와이프' : '-'}
          </Typography>
        </Box>
      </Paper>

      <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
        * 터치 또는 마우스 드래그로 슬라이드를 넘길 수 있습니다.
      </Typography>
    </Box>
  )
}

export default Section16
