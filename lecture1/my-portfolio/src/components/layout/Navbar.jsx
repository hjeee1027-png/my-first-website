import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#FAF7F2',
        borderBottom: '1px solid #D9CFC2',
      }}
    >
      <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: '#1B2A4A',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
          }}
        >
          Portfolio
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {navLinks.map(({ label, to }) => {
            const isActive = pathname === to
            return (
              <Button
                key={to}
                component={Link}
                to={to}
                disableRipple
                sx={{
                  color: isActive ? '#1B2A4A' : '#6B7A90',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  borderBottom: isActive ? '2px solid #1B2A4A' : '2px solid transparent',
                  borderRadius: 0,
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  px: 2,
                  transition: 'color 0.2s',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#1B2A4A',
                  },
                }}
              >
                {label}
              </Button>
            )
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
