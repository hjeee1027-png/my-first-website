import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Slider,
  Paper,
} from '@mui/material'

const marks = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
]

const sliders = [
  { label: '기본 슬라이더', color: 'primary' },
  { label: '보조 색상', color: 'secondary' },
  { label: '범위 슬라이더', color: 'primary', range: true },
]

const Section07 = () => {
  const [values, setValues] = useState({
    primary: 30,
    secondary: 60,
    range: [20, 70],
  })

  const handleChange = (key) => (_, newValue) => {
    setValues((prev) => ({ ...prev, [key]: newValue }))
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 07 — Slider
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 2, mb: 3 }}>
        {/* 기본 슬라이더 */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            기본 슬라이더 (primary)
          </Typography>
          <Slider
            value={values.primary}
            onChange={handleChange('primary')}
            min={0}
            max={100}
            marks={marks}
            valueLabelDisplay="auto"
            color="primary"
          />
        </Box>

        {/* 보조 색상 */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            보조 색상 (secondary)
          </Typography>
          <Slider
            value={values.secondary}
            onChange={handleChange('secondary')}
            min={0}
            max={100}
            marks={marks}
            valueLabelDisplay="auto"
            color="secondary"
          />
        </Box>

        {/* 범위 슬라이더 */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            범위 슬라이더 (range)
          </Typography>
          <Slider
            value={values.range}
            onChange={handleChange('range')}
            min={0}
            max={100}
            marks={marks}
            valueLabelDisplay="auto"
            color="primary"
          />
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          실시간 값
        </Typography>
        <Typography variant="body2">
          <strong>기본:</strong> {values.primary}
        </Typography>
        <Typography variant="body2">
          <strong>보조:</strong> {values.secondary}
        </Typography>
        <Typography variant="body2">
          <strong>범위:</strong> {values.range[0]} ~ {values.range[1]}
          &nbsp;(간격: {values.range[1] - values.range[0]})
        </Typography>
      </Paper>
    </Box>
  )
}

export default Section07
