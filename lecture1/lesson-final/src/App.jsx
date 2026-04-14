import React from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Header from './components/Header'
import Banner from './components/Banner'
import MenuSection from './components/MenuSection'
import ReviewSection from './components/ReviewSection'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'

const theme = createTheme({
  palette: {
    primary: { main: '#e53935' },
    background: { default: '#fff8f0' },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Banner />
      <MenuSection />
      <ReviewSection />
      <ProcessSection />
      <Footer />
    </ThemeProvider>
  )
}

export default App
