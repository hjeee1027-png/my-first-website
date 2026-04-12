import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Collapse,
  Container,
} from '@mui/material'
import { Person as PersonIcon } from '@mui/icons-material'

const NAV_MENUS = [
  {
    label: 'COLLECTION',
    items: ['SS 2026', 'FW 2025', 'Archive', 'Lookbook'],
  },
  {
    label: 'NEW ARRIVALS',
    items: ['Top', 'Outerwear', 'Pants', 'Accessories'],
  },
  {
    label: 'SALE',
    items: ['Up to 30%', 'Up to 50%', 'Clearance', 'Bundle'],
  },
  {
    label: 'ABOUT',
    items: ['Brand Story', 'Craftsmanship', 'Sustainability', 'Contact'],
  },
]

// SVG 텍스트 로고
const Logo = () => (
  <Box component="a" href="/" sx={{ display: 'block', textDecoration: 'none' }}>
    <svg width="110" height="36" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="55" y="26"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="400"
        letterSpacing="6"
        fill="#1B2A4A"
      >
        NORD
      </text>
      <line x1="0" y1="33" x2="110" y2="33" stroke="#D9CFC2" strokeWidth="0.8" />
      <text
        x="55" y="36"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="6"
        letterSpacing="4"
        fill="#8A96A8"
      >
        MAISON
      </text>
    </svg>
  </Box>
)

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null)

  const handleToggle = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label))
  }

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* ── 메인 헤더 바 ── */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E8E8E0',
          height: 72,
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* 왼쪽: 네비게이션 메뉴 */}
          <Box sx={{ display: 'flex', gap: 0, flex: 1 }}>
            {NAV_MENUS.map((menu) => (
              <Button
                key={menu.label}
                disableRipple
                onClick={() => handleToggle(menu.label)}
                sx={{
                  color: openMenu === menu.label ? '#1B2A4A' : '#6B7A90',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: openMenu === menu.label ? 700 : 400,
                  letterSpacing: '0.12em',
                  borderRadius: 0,
                  px: 1.5,
                  py: 0,
                  height: 72,
                  borderBottom: openMenu === menu.label
                    ? '2px solid #1B2A4A'
                    : '2px solid transparent',
                  transition: 'color 0.2s',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#1B2A4A',
                  },
                }}
              >
                {menu.label}
              </Button>
            ))}
          </Box>

          {/* 가운데: 로고 */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Logo />
          </Box>

          {/* 오른쪽: 로그인 */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
            <Button
              disableRipple
              startIcon={<PersonIcon sx={{ fontSize: '1rem !important' }} />}
              sx={{
                color: '#1B2A4A',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                fontWeight: 500,
                borderRadius: 0,
                px: 1.5,
                border: '1px solid #D9CFC2',
                '&:hover': { backgroundColor: '#1B2A4A', color: '#FAF7F2', borderColor: '#1B2A4A' },
                transition: 'all 0.2s',
              }}
            >
              LOGIN
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── 드롭다운 메뉴 ── */}
      <Collapse in={Boolean(openMenu)} timeout={200} unmountOnExit>
        <Box
          sx={{
            backgroundColor: '#1B2A4A',
            borderBottom: '1px solid #2C3E6B',
          }}
        >
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', gap: 6 }}>
              {NAV_MENUS.filter((m) => m.label === openMenu).map((menu) =>
                menu.items.map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href="#"
                    sx={{
                      color: '#E8DCC8',
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em',
                      textDecoration: 'none',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      cursor: 'pointer',
                      transition: 'color 0.15s',
                      '&:hover': { color: '#FFFFFF' },
                    }}
                  >
                    {item}
                  </Typography>
                ))
              )}
            </Box>
          </Container>
        </Box>
      </Collapse>
    </Box>
  )
}

export default Header
