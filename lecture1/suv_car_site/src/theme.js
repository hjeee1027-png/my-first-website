import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0c121c' },
    secondary: { main: '#A68966' },
    background: { default: '#0B0B0B', paper: '#1a1f2e' },
    text: { primary: '#FFFFFF', secondary: '#4A4A4A' },
    divider: '#4A4A4A',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '0.05em' },
    h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '0.03em' },
    h3: { fontSize: '1.875rem', fontWeight: 500, letterSpacing: '0.02em' },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1.125rem', fontWeight: 500 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400, color: '#969696' },
    button: { fontSize: '0.9375rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 32px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          transition: 'all 0.3s ease',
        },
        contained: {
          backgroundColor: '#0c121c',
          color: '#FFFFFF',
          border: '1px solid #A68966',
          '&:hover': { backgroundColor: '#A68966', color: '#0B0B0B' },
        },
        outlined: {
          borderColor: '#A68966',
          color: '#A68966',
          '&:hover': { backgroundColor: '#A68966', color: '#0B0B0B', borderColor: '#A68966' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': { borderColor: '#4A4A4A' },
            '&:hover fieldset': { borderColor: '#A68966' },
            '&.Mui-focused fieldset': { borderColor: '#A68966' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#A68966' },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#4A4A4A',
          fontWeight: 500,
          letterSpacing: '0.05em',
          '&.Mui-selected': { color: '#A68966' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: '#A68966' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 2 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#4A4A4A' },
      },
    },
  },
  spacing: 8,
  shape: { borderRadius: 0 },
})

export default theme
