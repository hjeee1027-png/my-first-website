import React from 'react'
import { Box, Typography, Container, Divider } from '@mui/material'

const ProjectsPage = () => (
  <Box sx={{ backgroundColor: '#FAF7F2', py: { xs: 8, md: 14 }, minHeight: '80vh' }}>
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="caption" sx={{ color: '#8A96A8', display: 'block', mb: 2 }}>
        Projects
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Typography variant="h2" sx={{ color: '#1B2A4A', mb: 4 }}>
        Projects 페이지
      </Typography>
      <Typography variant="body1" sx={{ color: '#6B7A90' }}>
        Projects 페이지가 개발될 공간입니다.
        포트폴리오 작품들이 들어갈 예정입니다.
      </Typography>
    </Container>
  </Box>
)

export default ProjectsPage
