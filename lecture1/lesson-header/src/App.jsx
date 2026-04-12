import React from 'react'
import { Box, Typography } from '@mui/material'
import Header from './components/Header'

const App = () => {
  return (
    <Box>
      <Header />

      {/* 헤더 아래 임시 콘텐츠 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4">🍽️</Typography>
        <Typography variant="h6" sx={{ color: '#bbb' }}>
          페이지 콘텐츠가 여기에 들어갑니다
        </Typography>
      </Box>
    </Box>
  )
}

export default App
