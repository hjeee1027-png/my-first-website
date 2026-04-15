import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Models from './components/Models'
import Performance from './components/Performance'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Hero />
      <Models />
      <Performance />
      <Gallery />
      <Contact />
      <Footer />
    </ThemeProvider>
  )
}

export default App
