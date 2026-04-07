import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
]

const variants = ['outlined', 'filled', 'standard']

const Section04 = () => {
  const [values, setValues] = useState({
    outlined: '',
    filled: '',
    standard: '',
  })

  const handleChange = (variant) => (e) => {
    setValues((prev) => ({ ...prev, [variant]: e.target.value }))
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 04 — Dropdown
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 3 }}>
        {variants.map((variant) => (
          <FormControl key={variant} variant={variant} sx={{ minWidth: 200 }}>
            <InputLabel>{variant} 라벨</InputLabel>
            <Select
              value={values[variant]}
              label={`${variant} 라벨`}
              onChange={handleChange(variant)}
            >
              <MenuItem value="">
                <em>선택 안 함</em>
              </MenuItem>
              {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>

      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          실시간 선택값
        </Typography>
        {variants.map((variant) => {
          const selected = options.find((o) => o.value === values[variant])
          return (
            <Typography key={variant} variant="body2">
              <strong>{variant}:</strong>{' '}
              {selected ? selected.label : <span style={{ color: '#bbb' }}>(없음)</span>}
            </Typography>
          )
        })}
      </Paper>
    </Box>
  )
}

export default Section04
