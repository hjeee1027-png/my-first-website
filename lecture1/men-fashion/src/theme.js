import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary:    { main: '#1B2A4A', contrastText: '#FFFFFF' },
    secondary:  { main: '#E8DCC8', contrastText: '#1B2A4A' },
    background: { default: '#FAF7F2', paper: '#F0EBE1' },
    text: {
      primary:   '#1B2A4A',
      secondary: '#6B7A90',
      disabled:  '#B8C0CC',
    },
    divider: '#D9CFC2',
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: '#FAF7F2' } },
    },
  },
})

export default theme
