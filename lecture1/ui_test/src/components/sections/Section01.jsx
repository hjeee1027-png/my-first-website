import React from 'react'
import { Box, Typography, Button, Divider } from '@mui/material'

const variants = ['contained', 'outlined', 'text']
const colors = ['primary', 'secondary', 'error']

const Section01 = () => {
  const handleClick = (variant, color) => {
    alert(`variant: ${variant} / color: ${color}`)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 01 — Button
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {variants.map((variant) => (
        <Box key={variant} sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            variant="{variant}"
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                {color}
              </Button>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Section01
