import React, { useState } from 'react'
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Avatar, Box, Divider,
} from '@mui/material'
import {
  Menu as MenuIcon, Home, Article, Person, Logout, SportsEsports,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { profile } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const menuItems = [
    { text: '홈', icon: <Home />, path: '/' },
    { text: '게시물', icon: <Article />, path: '/posts' },
    { text: '마이페이지', icon: <Person />, path: '/mypage' },
  ]

  return (
    <Box className="mobile-container">
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'linear-gradient(90deg, #427AB5, #5B93D3)',
          width: '100%',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56 }}>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SportsEsports sx={{ color: '#FFEF91' }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, color: '#FFEF91', letterSpacing: 2, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              겜뷰
            </Typography>
          </Box>

          <IconButton onClick={() => navigate('/mypage')}>
            <Avatar
              src={profile?.avatar_url || ''}
              sx={{ width: 34, height: 34, bgcolor: '#FFEF91', color: '#427AB5', fontSize: 14, fontWeight: 700 }}
            >
              {profile?.display_name?.[0]?.toUpperCase() || '?'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 3, background: 'linear-gradient(135deg, #427AB5, #5B93D3)', color: 'white' }}>
            <Avatar
              src={profile?.avatar_url || ''}
              sx={{ width: 56, height: 56, bgcolor: '#FFEF91', color: '#427AB5', fontWeight: 700, mb: 1 }}
            >
              {profile?.display_name?.[0]?.toUpperCase() || '?'}
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {profile?.display_name || '게임러'}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              @{profile?.username || ''}
            </Typography>
          </Box>

          <List sx={{ flex: 1 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.path}
                onClick={() => { navigate(item.path); setDrawerOpen(false) }}
                sx={{
                  cursor: 'pointer',
                  bgcolor: location.pathname === item.path ? 'rgba(66,122,181,0.1)' : 'transparent',
                  borderRadius: 2,
                  mx: 1,
                  '&:hover': { bgcolor: 'rgba(66,122,181,0.08)' },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? '#427AB5' : 'text.secondary', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 700 : 400,
                    color: location.pathname === item.path ? '#427AB5' : 'text.primary',
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider />
          <List>
            <ListItem
              onClick={handleLogout}
              sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' } }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}><Logout color="error" /></ListItemIcon>
              <ListItemText primary="로그아웃" primaryTypographyProps={{ color: 'error' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ pb: 2 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
