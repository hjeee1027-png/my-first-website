import React from 'react'
import { Box, Typography, Container, Button, Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const ProjectsSection = () => (
  <Box sx={{ backgroundColor: '#FAF7F2', py: { xs: 8, md: 12 } }}>
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="caption" sx={{ color: '#8A96A8', display: 'block', mb: 2 }}>
        Projects
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Typography variant="h3" sx={{ color: '#1B2A4A', mb: 3 }}>
        여기는 Projects 섹션입니다.
      </Typography>
      <Typography variant="body1" sx={{ color: '#6B7A90', mb: 6 }}>
        대표작 썸네일 3–4개와 '더 보기' 버튼이 들어갈 예정입니다.
      </Typography>
      <Button component={Link} to="/projects" sx={{ px: 5, py: 1.5 }}>
        더 보기
      </Button>
    </Container>
  </Box>
)

export default ProjectsSection
