import React from 'react'
import { Box, Typography, Container, Divider } from '@mui/material'

const AboutPage = () => (
  <Box sx={{ backgroundColor: '#FAF7F2', py: { xs: 8, md: 14 }, minHeight: '80vh' }}>
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="caption" sx={{ color: '#8A96A8', display: 'block', mb: 2 }}>
        About Me
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Typography variant="h2" sx={{ color: '#1B2A4A', mb: 4 }}>
        About Me 페이지
      </Typography>
      <Typography variant="body1" sx={{ color: '#6B7A90' }}>
        About Me 페이지가 개발될 공간입니다.
        상세한 자기소개가 들어갈 예정입니다.
      </Typography>
    </Container>
  </Box>
)

export default AboutPage
