import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navItems = [
  { label: 'Models', href: '#models' },
  { label: 'Performance', href: '#performance' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setDrawerOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(8,8,8,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,162,39,0.2)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 3, md: 6 } }}>
          {/* Logo */}
          <Box
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              letterSpacing: '0.15em',
              cursor: 'pointer',
              color: '#c9a227',
              textTransform: 'uppercase',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            APEX<Box component="span" sx={{ color: '#fff', ml: 0.5 }}>AUTO</Box>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  color: '#aaa',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 6,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: '1px',
                    background: '#c9a227',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    color: '#fff',
                    background: 'transparent',
                    '&::after': { width: '60%' },
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              onClick={() => handleNavClick('#contact')}
              variant="outlined"
              sx={{
                ml: 2,
                borderColor: '#c9a227',
                color: '#c9a227',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
                px: 3,
                py: 1,
                borderRadius: 0,
                '&:hover': {
                  background: '#c9a227',
                  color: '#000',
                  borderColor: '#c9a227',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Book a Test Drive
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#c9a227' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: '#0a0a0a',
            width: 260,
            borderLeft: '1px solid rgba(201,162,39,0.2)',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <IconButton sx={{ color: '#aaa' }} onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ gap: 1 }}>
            {[...navItems, { label: 'Book a Test Drive', href: '#contact' }].map((item) => (
              <ListItem
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  cursor: 'pointer',
                  color: '#aaa',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  py: 1.5,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  '&:hover': { color: '#c9a227' },
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
