import React, { useState } from 'react'
import { Box, Typography, Divider } from '@mui/material'

const menuItems = ['홈', '소개', '상품', '연락처', '설정']

const Section17 = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 17 — Flex Navigation
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* 네비게이션 박스 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '60px',
          backgroundColor: '#2d3748',
          px: '24px',
          borderRadius: 1,
          boxSizing: 'border-box',
        }}
      >
        {/* 로고 박스 */}
        <Box>
          <Typography
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '20px',
              letterSpacing: '0.5px',
            }}
          >
            MyWebsite
          </Typography>
        </Box>

        {/* 메뉴들 박스 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {menuItems.map((item) => (
            <Typography
              key={item}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                color: hovered === item ? '#ffffff' : '#a0aec0',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                userSelect: 'none',
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Section17
