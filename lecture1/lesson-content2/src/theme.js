import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#e53935',
    },
    secondary: {
      main: '#ff7043',
    },
    background: {
      default: '#fff8f0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
    },
  },
  spacing: 8,
})

export default theme
