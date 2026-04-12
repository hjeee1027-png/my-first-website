import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const navItems = [
  { label: '메뉴', href: '#menu' },
  { label: '오늘의 특선', href: '#special' },
  { label: '예약', href: '#reservation' },
  { label: '매장 안내', href: '#location' },
]

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev)
  }

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#fff',
          color: '#2d2d2d',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* 로고 영역 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon sx={{ color: '#e53935', fontSize: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                color: '#e53935',
                letterSpacing: '-0.5px',
              }}
            >
              맛있는 식탁
            </Typography>
          </Box>

          {/* 데스크톱 네비게이션 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: '#2d2d2d',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    px: 2,
                    '&:hover': {
                      color: '#e53935',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* 우측 아이콘 영역 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton sx={{ color: '#2d2d2d' }}>
              <SearchIcon />
            </IconButton>
            <IconButton sx={{ color: '#2d2d2d' }}>
              <ShoppingCartIcon />
            </IconButton>
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: '#2d2d2d' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 모바일 드로어 */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { width: 240 } }}
      >
        <Box sx={{ pt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              pb: 2,
              borderBottom: '1px solid #eee',
            }}
          >
            <RestaurantIcon sx={{ color: '#e53935' }} />
            <Typography sx={{ fontWeight: 700, color: '#e53935' }}>
              맛있는 식탁
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  href={item.href}
                  onClick={handleDrawerToggle}
                  sx={{
                    '&:hover': { color: '#e53935' },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
