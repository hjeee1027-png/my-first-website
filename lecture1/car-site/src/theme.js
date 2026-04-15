import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c9a227',
      light: '#f0c847',
      dark: '#9a7a1a',
    },
    secondary: {
      main: '#e0e0e0',
    },
    background: {
      default: '#080808',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8a8a8a',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          padding: '12px 32px',
        },
      },
    },
  },
})

export default theme
