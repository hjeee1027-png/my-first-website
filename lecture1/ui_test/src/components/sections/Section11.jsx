import React, { useRef, useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Paper,
  Chip,
  Fab,
  Tooltip,
} from '@mui/material'
import { KeyboardArrowUp as ArrowUpIcon } from '@mui/icons-material'

const posts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `포스트 ${i + 1}`,
  content: [
    'React는 컴포넌트 기반 UI 라이브러리입니다.',
    'MUI는 Material Design을 React로 구현합니다.',
    'Vite는 빠른 개발 서버와 빌드 도구입니다.',
    'TypeScript로 타입 안전한 코드를 작성하세요.',
    'useState로 컴포넌트 상태를 관리합니다.',
  ][i % 5],
  tag: ['Frontend', 'UI', 'Build', 'Language', 'React'][i % 5],
}))

const Section11 = () => {
  const scrollRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)

  const handleScroll = () => {
    setScrollTop(scrollRef.current?.scrollTop ?? 0)
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showTopBtn = scrollTop > 80

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 11 — Scroll
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ position: 'relative' }}>
        {/* 스크롤 컨테이너 */}
        <Paper
          variant="outlined"
          ref={scrollRef}
          onScroll={handleScroll}
          sx={{
            height: 300,
            overflowY: 'scroll',
            p: 2,
            backgroundColor: 'grey.50',
            scrollbarWidth: 'thin',
          }}
        >
          {posts.map((post) => (
            <Paper
              key={post.id}
              elevation={1}
              sx={{ p: 2, mb: 2, '&:last-child': { mb: 0 } }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {post.title}
                </Typography>
                <Chip label={post.tag} size="small" variant="outlined" color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </Paper>
          ))}
        </Paper>

        {/* 스크롤 위치 표시 */}
        <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            스크롤 위치: <strong>{Math.round(scrollTop)}px</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            전체 {posts.length}개 항목
          </Typography>
        </Box>

        {/* Top 버튼 */}
        <Tooltip title="맨 위로" placement="left">
          <Fab
            size="small"
            color="primary"
            onClick={scrollToTop}
            sx={{
              position: 'absolute',
              bottom: 36,
              right: 12,
              opacity: showTopBtn ? 1 : 0,
              transform: showTopBtn ? 'scale(1)' : 'scale(0.6)',
              transition: 'opacity 0.2s, transform 0.2s',
              pointerEvents: showTopBtn ? 'auto' : 'none',
            }}
          >
            <ArrowUpIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Section11
