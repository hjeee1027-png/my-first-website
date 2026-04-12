import React from 'react'
import { Box } from '@mui/material'
import Header from './components/layout/Header'
import Placeholder from './components/sections/Placeholder'

const App = () => (
  <Box sx={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
    <Header />
    <Placeholder number={1} height={400} />
    <Placeholder number={2} height={360} />
    <Placeholder number={3} height={360} />
    <Placeholder number={4} height={360} />
  </Box>
)

export default App
