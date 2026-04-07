import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Chip,
  Paper,
} from '@mui/material'
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Bookmark as BookmarkIcon,
  Help as HelpIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material'

const navItems = [
  { label: '홈', icon: <HomeIcon />, badge: null },
  { label: '프로필', icon: <PersonIcon />, badge: null },
  { label: '알림', icon: <NotificationsIcon />, badge: 3 },
  { label: '북마크', icon: <BookmarkIcon />, badge: null },
  { label: '설정', icon: <SettingsIcon />, badge: null },
  { label: '도움말', icon: <HelpIcon />, badge: null },
]

const DRAWER_WIDTH = 260

const Section14 = () => {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState('left')
  const [activeItem, setActiveItem] = useState('홈')
  const [selected, setSelected] = useState(null)

  const handleAnchor = (_, value) => {
    if (value) setAnchor(value)
  }

  const handleItemClick = (label) => {
    setActiveItem(label)
    setSelected(label)
    setOpen(false)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 14 — Sidebar
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          사이드바 열기
        </Button>

        <ToggleButtonGroup
          value={anchor}
          exclusive
          onChange={handleAnchor}
          size="small"
        >
          <ToggleButton value="left">왼쪽</ToggleButton>
          <ToggleButton value="right">오른쪽</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          선택된 메뉴
        </Typography>
        {selected ? (
          <Chip label={selected} size="small" color="primary" />
        ) : (
          <Typography variant="body2" sx={{ color: '#bbb' }}>(없음)</Typography>
        )}
      </Paper>

      {/* Drawer */}
      <Drawer
        anchor={anchor}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: DRAWER_WIDTH } } }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            px: 2,
            py: 2,
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.3)' }}>
              U
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                사용자
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                user@example.com
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
            {anchor === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        <Divider />

        {/* 네비게이션 */}
        <List sx={{ pt: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                selected={activeItem === item.label}
                onClick={() => handleItemClick(item.label)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    color="error"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2, mt: 1 }} />

        <Box sx={{ p: 2, mt: 'auto' }}>
          <Typography variant="caption" color="text.disabled">
            v1.0.0 · UI Test
          </Typography>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Section14
