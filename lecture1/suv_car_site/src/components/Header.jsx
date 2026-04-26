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
          bgcolor: scrolled ? 'rgba(11,11,11,0.92)' : '#0B0B0B',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
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
                    color: '#A68966',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    px: 1,
                    py: 0.5,
                    minWidth: 'auto',
                    borderRadius: 0,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: '#c4a882',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* 가운데 로고 - absolute로 완전 중앙 정렬 */}
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
                color: '#fff',
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
              <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.3)', px: 1 }}>
                <InputBase
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="차량명 검색..."
                  sx={{ color: '#fff', fontSize: '0.875rem', width: 150 }}
                />
                <IconButton size="small" onClick={() => setSearchOpen(false)} sx={{ color: 'rgba(255,255,255,0.5)', p: 0.5 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setSearchOpen(true)} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff' } }}>
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
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.75rem',
                  '.MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
                  '&:hover .MuiSelect-select': { color: '#fff' },
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
              sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff' } }}
            >
              <PersonOutlineIcon fontSize="small" />
            </IconButton>

            {user && !isMobile && (
              <Button
                onClick={handleLogout}
                sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', minWidth: 'auto', px: 1, '&:hover': { color: '#fff', bgcolor: 'transparent' } }}
              >
                로그아웃
              </Button>
            )}

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
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
        PaperProps={{ sx: { width: 260, bgcolor: '#0B0B0B', color: '#fff' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.3em', color: '#fff', fontSize: '1rem' }}>VANTAGE</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', fontSize: '0.9rem' } }} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton component={Link} to={user ? '/mypage' : '/login'} onClick={() => setDrawerOpen(false)} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
              <ListItemText primary={user ? '마이페이지' : '로그인'} primaryTypographyProps={{ sx: { color: '#A68966', letterSpacing: '0.08em' } }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
