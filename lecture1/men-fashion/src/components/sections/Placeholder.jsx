import React from 'react'
import { Box, Typography, Divider } from '@mui/material'

const Placeholder = ({ number, height = 300 }) => (
  <Box>
    <Box
      sx={{
        height,
        backgroundColor: number % 2 === 0 ? '#FAF7F2' : '#F0EBE1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          color: '#B8C0CC',
          textTransform: 'uppercase',
        }}
      >
        Section {number}
      </Typography>
      <Typography
        sx={{
          fontSize: '1.1rem',
          color: '#A8B0BC',
          fontWeight: 300,
          letterSpacing: '0.05em',
        }}
      >
        비어있음
      </Typography>
    </Box>
    <Divider sx={{ borderColor: '#D9CFC2' }} />
  </Box>
)

export default Placeholder
