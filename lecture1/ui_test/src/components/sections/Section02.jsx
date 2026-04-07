import React, { useState } from 'react'
import { Box, Typography, TextField, Divider, Paper } from '@mui/material'

const variants = ['standard', 'outlined', 'filled']

const Section02 = () => {
  const [values, setValues] = useState({
    standard: '',
    outlined: '',
    filled: '',
  })

  const handleChange = (variant) => (e) => {
    setValues((prev) => ({ ...prev, [variant]: e.target.value }))
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 02 — Input
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 3 }}>
        {variants.map((variant) => (
          <TextField
            key={variant}
            variant={variant}
            label={`${variant} 라벨`}
            placeholder={`${variant} 입력...`}
            value={values[variant]}
            onChange={handleChange(variant)}
            sx={{ minWidth: 220 }}
          />
        ))}
      </Box>

      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          실시간 입력값
        </Typography>
        {variants.map((variant) => (
          <Typography key={variant} variant="body2">
            <strong>{variant}:</strong>{' '}
            {values[variant] || <span style={{ color: '#bbb' }}>(없음)</span>}
          </Typography>
        ))}
      </Paper>
    </Box>
  )
}

export default Section02
