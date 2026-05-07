import React from 'react'
import { Box } from '@mui/material'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import NewArrivalsSection from './components/sections/NewArrivalsSection'
import CraftsmanshipSection from './components/sections/CraftsmanshipSection'
import BestPicksSection from './components/sections/BestPicksSection'

const App = () => (
  <Box sx={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
    <Header />
    <HeroSection />
    <NewArrivalsSection />
    <CraftsmanshipSection />
    <BestPicksSection />
    <Footer />
  </Box>
)

export default App
