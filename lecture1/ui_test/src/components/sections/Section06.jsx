import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Chip,
} from '@mui/material'

const groups = [
  {
    label: '선호 언어',
    name: 'language',
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'go', label: 'Go' },
    ],
  },
  {
    label: '경험 수준',
    name: 'level',
    options: [
      { value: 'beginner', label: '입문자' },
      { value: 'junior', label: '주니어' },
      { value: 'senior', label: '시니어' },
    ],
  },
]

const Section06 = () => {
  const [selected, setSelected] = useState({ language: '', level: '' })

  const handleChange = (name) => (e) => {
    setSelected((prev) => ({ ...prev, [name]: e.target.value }))
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 06 — Radio
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap', mb: 3 }}>
        {groups.map((group) => (
          <FormControl key={group.name}>
            <FormLabel sx={{ fontWeight: 600, mb: 1 }}>{group.label}</FormLabel>
            <RadioGroup value={selected[group.name]} onChange={handleChange(group.name)}>
              {group.options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  control={<Radio color="primary" />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
      </Box>

      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          선택된 옵션
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {groups.map((group) => {
            const found = group.options.find((o) => o.value === selected[group.name])
            return (
              <Box key={group.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">
                  <strong>{group.label}:</strong>
                </Typography>
                {found ? (
                  <Chip label={found.label} size="small" color="primary" />
                ) : (
                  <Typography variant="body2" sx={{ color: '#bbb' }}>
                    (없음)
                  </Typography>
                )}
              </Box>
            )
          })}
        </Box>
      </Paper>
    </Box>
  )
}

export default Section06
