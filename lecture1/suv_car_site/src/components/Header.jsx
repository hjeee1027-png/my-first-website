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
          bgcolor: scrolled ? 'rgba(255,255,255,0.60)' : '#ffffff',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: '1px solid #e8e0d6',
          transition: 'all 0.3s ease',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ position: 'relative', width: '100%', px: { xs: 2, md: 4 }, minHeight: { xs: 56, md: 72 } }}>
          {/* 왼쪽 메뉴 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#0c121c',
                    fontSize: '17px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    px: 1,
                    py: 0.5,
                    minWidth: 'auto',
                    borderRadius: 0,
                    '&:hover': { bgcolor: 'transparent', color: '#96795a' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* 가운데 로고 */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto',
            }}
          >
            <Typography
              component={Link}
              to="/"
              sx={{
                color: '#0c121c',
                fontWeight: 900,
                letterSpacing: '0.35em',
                textDecoration: 'none',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontFamily: '"Roboto", sans-serif',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1,
              }}
            >
              VANTAGE
            </Typography>
          </Box>

          {/* 오른쪽 아이콘 */}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } }}>
            {searchOpen ? (
              <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', px: 1 }}>
                <InputBase
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="차량명 검색..."
                  sx={{ color: '#111', fontSize: '0.875rem', width: 150 }}
                />
                <IconButton size="small" onClick={() => setSearchOpen(false)} sx={{ color: '#999', p: 0.5 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#555', '&:hover': { color: '#0c121c' } }}>
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
                  color: '#666',
                  fontSize: '0.75rem',
                  '.MuiSelect-icon': { color: '#999' },
                  '&:hover .MuiSelect-select': { color: '#0c121c' },
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
              sx={{ color: '#555', '&:hover': { color: '#0c121c' } }}
            >
              <PersonOutlineIcon fontSize="small" />
            </IconButton>

            {user && !isMobile && (
              <Button
                onClick={handleLogout}
                sx={{ color: '#999', fontSize: '0.75rem', minWidth: 'auto', px: 1, '&:hover': { color: '#0c121c', bgcolor: 'transparent' } }}
              >
                로그아웃
              </Button>
            )}

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#555' }}>
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
        PaperProps={{ sx: { width: 260, bgcolor: '#fff', color: '#111' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.3em', color: '#0c121c', fontSize: '1rem' }}>VANTAGE</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#666' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#e0e0e0' }} />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ sx: { color: '#A68966', letterSpacing: '0.08em', fontSize: '0.9rem' } }} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: '#e0e0e0', my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton component={Link} to={user ? '/mypage' : '/login'} onClick={() => setDrawerOpen(false)} sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}>
              <ListItemText primary={user ? '마이페이지' : '로그인'} primaryTypographyProps={{ sx: { color: '#0c121c', fontWeight: 600, letterSpacing: '0.08em' } }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
