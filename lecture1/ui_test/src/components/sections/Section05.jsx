import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Chip,
} from '@mui/material'

const items = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
]

const Section05 = () => {
  const [checked, setChecked] = useState([])

  const isAllChecked = checked.length === items.length
  const isIndeterminate = checked.length > 0 && checked.length < items.length

  const handleAll = () => {
    setChecked(isAllChecked ? [] : items.map((item) => item.value))
  }

  const handleItem = (value) => {
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 05 — Checkbox
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <FormGroup sx={{ mb: 3 }}>
        {/* 전체 선택 */}
        <FormControlLabel
          label={
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              전체 선택
            </Typography>
          }
          control={
            <Checkbox
              checked={isAllChecked}
              indeterminate={isIndeterminate}
              onChange={handleAll}
              color="primary"
            />
          }
        />
        <Divider sx={{ my: 1 }} />

        {/* 개별 항목 */}
        {items.map((item) => (
          <FormControlLabel
            key={item.value}
            label={item.label}
            control={
              <Checkbox
                checked={checked.includes(item.value)}
                onChange={() => handleItem(item.value)}
                color="primary"
              />
            }
          />
        ))}
      </FormGroup>

      {/* 선택 결과 */}
      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          선택된 항목{' '}
          <Chip
            label={`${checked.length} / ${items.length}`}
            size="small"
            color={checked.length === 0 ? 'default' : 'primary'}
            sx={{ ml: 0.5 }}
          />
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {checked.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#bbb' }}>
              (없음)
            </Typography>
          ) : (
            items
              .filter((item) => checked.includes(item.value))
              .map((item) => (
                <Chip key={item.value} label={item.label} size="small" variant="outlined" />
              ))
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default Section05
