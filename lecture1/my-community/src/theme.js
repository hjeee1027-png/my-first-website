import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD93D',       // 노란색
      contrastText: '#5C3D00',
    },
    secondary: {
      main: '#6BCB77',       // 연두색
      contrastText: '#fff',
    },
    background: {
      default: '#FFFBF0',
      paper: '#ffffff',
    },
    text: {
      primary: '#5C3D00',    // 갈색 베이스
      secondary: '#8B6914',
    },
    error: {
      main: '#FF6B6B',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 700 },
    h2: { fontSize: '1.875rem', fontWeight: 700 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    body1: { fontSize: '1rem', fontWeight: 400 },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(255, 217, 61, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
})

export default theme
