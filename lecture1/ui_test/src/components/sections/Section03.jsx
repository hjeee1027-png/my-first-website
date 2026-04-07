import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  AppBar,
  Toolbar,
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
import { Menu as MenuIcon } from '@mui/icons-material'

const menuItems = ['홈', '소개', '서비스', '연락처']

const Section03 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleMenuClick = (menu) => {
    alert(`메뉴 클릭: ${menu}`)
    setDrawerOpen(false)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 03 — Navigation
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* AppBar 미리보기 */}
      <Box sx={{ borderRadius: 1, overflow: 'hidden', boxShadow: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              MyApp
            </Typography>

            {/* 데스크톱 메뉴 */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((menu) => (
                  <Button
                    key={menu}
                    color="inherit"
                    onClick={() => handleMenuClick(menu)}
                  >
                    {menu}
                  </Button>
                ))}
              </Box>
            )}

            {/* 모바일 햄버거 */}
            {isMobile && (
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* 모바일 Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 220 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              MyApp
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {menuItems.map((menu) => (
              <ListItem key={menu} disablePadding>
                <ListItemButton onClick={() => handleMenuClick(menu)}>
                  <ListItemText primary={menu} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Typography variant="caption" sx={{ mt: 1.5, display: 'block', color: 'text.secondary' }}>
        * 브라우저 너비 600px 미만에서 햄버거 메뉴로 전환됩니다.
      </Typography>
    </Box>
  )
}

export default Section03
