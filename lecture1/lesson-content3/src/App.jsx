import React from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import ProcessSection from './components/ProcessSection'

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
      <ProcessSection />
    </ThemeProvider>
  )
}

export default App
