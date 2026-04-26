import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#111111' },
    secondary: { main: '#A68966' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#111111', secondary: '#666666' },
    divider: '#e0e0e0',
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
    body2: { fontSize: '0.875rem', fontWeight: 400, color: '#666666' },
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
          transition: 'all 0.2s ease',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          backgroundColor: '#111111',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#333333' },
        },
        outlined: {
          borderColor: '#111111',
          color: '#111111',
          '&:hover': { backgroundColor: 'transparent', borderColor: '#333333' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': { borderColor: '#e0e0e0' },
            '&:hover fieldset': { borderColor: '#111111' },
            '&.Mui-focused fieldset': { borderColor: '#111111' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#111111' },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#999999',
          fontWeight: 500,
          letterSpacing: '0.05em',
          '&.Mui-selected': { color: '#111111' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: '#111111' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 2 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#e0e0e0' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
  },
  spacing: 8,
  shape: { borderRadius: 0 },
})

export default theme
