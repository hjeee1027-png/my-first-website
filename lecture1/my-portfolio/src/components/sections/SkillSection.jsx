import React from 'react'
import { Box, Typography, Container, Divider } from '@mui/material'

const SkillSection = () => (
  <Box sx={{ backgroundColor: '#F0EBE1', py: { xs: 8, md: 12 } }}>
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="caption" sx={{ color: '#8A96A8', display: 'block', mb: 2 }}>
        Skill Tree
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Typography variant="h3" sx={{ color: '#1B2A4A', mb: 3 }}>
        여기는 Skill Tree 섹션입니다.
      </Typography>
      <Typography variant="body1" sx={{ color: '#6B7A90' }}>
        기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
      </Typography>
    </Container>
  </Box>
)

export default SkillSection
