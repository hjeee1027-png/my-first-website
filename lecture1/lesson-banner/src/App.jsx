import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import Banner from './components/Banner'

const App = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#111' }}>
        <Banner />
      </Box>
    </>
  )
}

export default App
