import { createTheme } from '@mui/material/styles'

// 짙은 남색 + 베이지 팔레트
const NAVY   = '#1B2A4A'
const NAVY_L = '#2C3E6B'
const BEIGE  = '#E8DCC8'
const BG     = '#FAF7F2'
const BG_ALT = '#F0EBE1'
const BORDER = '#D9CFC2'

const theme = createTheme({
  palette: {
    primary:    { main: NAVY,  contrastText: '#FFFFFF' },
    secondary:  { main: BEIGE, contrastText: NAVY },
    background: { default: BG, paper: BG_ALT },
    text: {
      primary:   NAVY,
      secondary: '#6B7A90',
      disabled:  '#B8C0CC',
    },
    divider: BORDER,
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: { color: NAVY, fontWeight: 300, letterSpacing: '-0.02em' },
    h2: { color: NAVY, fontWeight: 300, letterSpacing: '-0.01em' },
    h3: { color: NAVY, fontWeight: 300 },
    h4: { color: NAVY, fontWeight: 500 },
    body1: { color: '#3A4A60', lineHeight: 1.8 },
    caption: { color: '#8A96A8', letterSpacing: '0.1em', textTransform: 'uppercase' },
  },
  spacing: 8,
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          borderRadius: 2,
          borderColor: NAVY,
          color: NAVY,
          textTransform: 'none',
          letterSpacing: '0.05em',
          fontWeight: 500,
          px: 3,
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: NAVY,
            color: '#FFFFFF',
            borderColor: NAVY,
          },
        },
        contained: {
          backgroundColor: NAVY,
          color: '#FFFFFF',
          '&:hover': { backgroundColor: NAVY_L },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: BG, color: NAVY },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: BORDER },
      },
    },
  },
})

export default theme
