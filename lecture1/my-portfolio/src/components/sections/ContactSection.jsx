import React from 'react'
import { Box, Typography, Container, Divider } from '@mui/material'

const ContactSection = () => (
  <Box sx={{ backgroundColor: '#1B2A4A', py: { xs: 8, md: 12 } }}>
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="caption" sx={{ color: '#E8DCC8', display: 'block', mb: 2 }}>
        Contact
      </Typography>
      <Divider sx={{ borderColor: '#2C3E6B', mb: 5 }} />
      <Typography variant="h3" sx={{ color: '#FAF7F2', mb: 3 }}>
        여기는 Contact 섹션입니다.
      </Typography>
      <Typography variant="body1" sx={{ color: '#A8B4C4' }}>
        연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
      </Typography>
    </Container>
  </Box>
)

export default ContactSection
