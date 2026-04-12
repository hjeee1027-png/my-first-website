import React from 'react'
import { Box, Typography } from '@mui/material'
import Footer from './components/Footer'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 푸터 미리보기용 공간 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          py: 10,
        }}
      >
        <Typography variant="h6" sx={{ color: '#bbb' }}>
          ↓ 푸터 영역
        </Typography>
      </Box>

      <Footer />
    </Box>
  )
}

export default App
