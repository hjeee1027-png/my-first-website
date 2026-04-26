import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton,
  Select, MenuItem, InputBase, Drawer, List, ListItem,
  ListItemButton, ListItemText, Divider, useMediaQuery
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../hooks/useAuth'
import { signOut } from '../utils/supabase'

const NAV_ITEMS = [
  { label: '전체모델', path: '/search' },
  { label: '차량구매', path: '/search' },
  { label: '이벤트', path: '/events' },
  { label: '시승예약', path: '/reservation' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('KR')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = async () => {
    try { await signOut() } catch {}
    navigate('/')
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(11,11,11,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(166,137,102,0.2)' : 'none',
          transition: 'all 0.4s ease',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ maxWidth: '100%', width: '100%', px: { xs: 2, md: 4 }, minHeight: { xs: 56, md: 72 } }}>
          {/* 왼쪽 메뉴 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3, mr: 4 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    px: 1,
                    py: 0.5,
                    minWidth: 'auto',
                    borderRadius: 0,
                    borderBottom: '1px solid transparent',
                    '&:hover': {
                      bgcolor: 'transparent',
                      borderBottom: '1px solid #A68966',
                      color: '#A68966',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* 가운데 로고 */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography
              component={Link}
              to="/"
              variant="h5"
              sx={{
                color: '#fff',
                fontWeight: 900,
                letterSpacing: '0.35em',
                textDecoration: 'none',
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                fontFamily: '"Roboto", sans-serif',
                textTransform: 'uppercase',
                '&:hover': { color: '#A68966' },
                transition: 'color 0.3s',
              }}
            >
              VANTAGE
            </Typography>
          </Box>

          {/* 오른쪽 아이콘 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } }}>
            {searchOpen ? (
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.1)', px: 2, borderBottom: '1px solid #A68966' }}>
                <InputBase
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="차량명 검색..."
                  sx={{ color: '#fff', fontSize: '0.875rem', width: 160 }}
                />
                <IconButton size="small" onClick={() => setSearchOpen(false)} sx={{ color: '#fff', p: 0.5 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#fff', '&:hover': { color: '#A68966' } }}>
                <SearchIcon fontSize="small" />
              </IconButton>
            )}

            {!isMobile && (
              <Select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                variant="standard"
                disableUnderline
                sx={{
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  '.MuiSelect-icon': { color: '#fff' },
                  '&:hover': { color: '#A68966' },
                }}
              >
                <MenuItem value="KR">KR</MenuItem>
                <MenuItem value="EN">EN</MenuItem>
                <MenuItem value="JP">JP</MenuItem>
                <MenuItem value="CN">CN</MenuItem>
              </Select>
            )}

            <IconButton
              component={Link}
              to={user ? '/mypage' : '/login'}
              sx={{ color: '#fff', '&:hover': { color: '#A68966' } }}
            >
              <PersonOutlineIcon fontSize="small" />
            </IconButton>

            {user && !isMobile && (
              <Button
                onClick={handleLogout}
                sx={{ color: '#4A4A4A', fontSize: '0.75rem', minWidth: 'auto', px: 1, '&:hover': { color: '#A68966' } }}
              >
                로그아웃
              </Button>
            )}

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#fff' }}>
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
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: '#0c121c', color: '#fff' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.3em', color: '#A68966' }}>VANTAGE</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#4A4A4A' }} />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{ '&:hover': { bgcolor: 'rgba(166,137,102,0.1)' } }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ sx: { color: '#fff', letterSpacing: '0.08em' } }} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: '#4A4A4A', my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton component={Link} to={user ? '/mypage' : '/login'} onClick={() => setDrawerOpen(false)} sx={{ '&:hover': { bgcolor: 'rgba(166,137,102,0.1)' } }}>
              <ListItemText primary={user ? '마이페이지' : '로그인'} primaryTypographyProps={{ sx: { color: '#A68966', letterSpacing: '0.08em' } }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* 헤더 높이만큼 여백 (투명 헤더 대응) */}
      <Box sx={{ height: { xs: 0, md: 0 } }} />
    </>
  )
}
