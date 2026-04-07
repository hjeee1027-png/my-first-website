import React, { useState, useRef } from 'react'
import { Box, Typography, Divider, Paper, Chip } from '@mui/material'

const initialItems = [
  { id: 1, label: 'React', color: '#61dafb', bg: '#20232a' },
  { id: 2, label: 'TypeScript', color: '#fff', bg: '#3178c6' },
  { id: 3, label: 'MUI', color: '#fff', bg: '#007fff' },
  { id: 4, label: 'Vite', color: '#fff', bg: '#646cff' },
  { id: 5, label: 'Node.js', color: '#fff', bg: '#3c873a' },
]

const Section10 = () => {
  const [source, setSource] = useState(initialItems)
  const [dropped, setDropped] = useState([])
  const [draggingId, setDraggingId] = useState(null)
  const [overZone, setOverZone] = useState(null) // 'source' | 'drop'
  const dragFrom = useRef(null) // 'source' | 'drop'

  const handleDragStart = (id, from) => {
    setDraggingId(id)
    dragFrom.current = from
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setOverZone(null)
  }

  const handleDrop = (toZone) => {
    if (!draggingId || dragFrom.current === toZone) return

    if (toZone === 'drop') {
      const item = source.find((i) => i.id === draggingId)
      if (!item) return
      setSource((prev) => prev.filter((i) => i.id !== draggingId))
      setDropped((prev) => [...prev, item])
    } else {
      const item = dropped.find((i) => i.id === draggingId)
      if (!item) return
      setDropped((prev) => prev.filter((i) => i.id !== draggingId))
      setSource((prev) => [...prev, item])
    }
  }

  const itemStyle = (id, bg) => ({
    px: 2,
    py: 1.5,
    borderRadius: 1,
    backgroundColor: bg,
    cursor: 'grab',
    opacity: draggingId === id ? 0.4 : 1,
    transform: draggingId === id ? 'scale(0.95)' : 'scale(1)',
    transition: 'opacity 0.15s, transform 0.15s',
    userSelect: 'none',
  })

  const zoneStyle = (zone) => ({
    flex: 1,
    minHeight: 180,
    p: 2,
    border: '2px dashed',
    borderRadius: 2,
    borderColor: overZone === zone ? 'primary.main' : 'grey.300',
    backgroundColor: overZone === zone ? 'primary.50' : 'grey.50',
    transition: 'border-color 0.15s, background-color 0.15s',
  })

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 10 — Drag & Drop
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* 소스 영역 */}
        <Paper
          variant="outlined"
          sx={zoneStyle('source')}
          onDragOver={(e) => { e.preventDefault(); setOverZone('source') }}
          onDragLeave={() => setOverZone(null)}
          onDrop={() => { handleDrop('source'); setOverZone(null) }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
            아이템 목록 ({source.length})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {source.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#bbb', textAlign: 'center', mt: 2 }}>
                모두 이동됨
              </Typography>
            ) : (
              source.map((item) => (
                <Box
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id, 'source')}
                  onDragEnd={handleDragEnd}
                  sx={itemStyle(item.id, item.bg)}
                >
                  <Typography variant="body2" sx={{ color: item.color, fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Paper>

        {/* 드롭 영역 */}
        <Paper
          variant="outlined"
          sx={zoneStyle('drop')}
          onDragOver={(e) => { e.preventDefault(); setOverZone('drop') }}
          onDragLeave={() => setOverZone(null)}
          onDrop={() => { handleDrop('drop'); setOverZone(null) }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
            드롭 영역{' '}
            <Chip
              label={dropped.length}
              size="small"
              color={dropped.length > 0 ? 'primary' : 'default'}
              sx={{ ml: 0.5 }}
            />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {dropped.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#bbb', textAlign: 'center', mt: 2 }}>
                여기에 드래그하세요
              </Typography>
            ) : (
              dropped.map((item) => (
                <Box
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id, 'drop')}
                  onDragEnd={handleDragEnd}
                  sx={itemStyle(item.id, item.bg)}
                >
                  <Typography variant="body2" sx={{ color: item.color, fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Paper>
      </Box>

      <Typography variant="caption" sx={{ mt: 1.5, display: 'block', color: 'text.secondary' }}>
        * 양방향 이동 가능 — 드롭 영역의 아이템을 다시 왼쪽으로 드래그할 수 있습니다.
      </Typography>
    </Box>
  )
}

export default Section10
