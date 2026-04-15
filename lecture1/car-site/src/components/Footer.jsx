import React from 'react'
import { Box, Typography, Container, Grid, IconButton, Divider } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import XIcon from '@mui/icons-material/X'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const footerLinks = [
  {
    title: 'Models',
    links: ['APEX GT', 'APEX R', 'APEX E', 'Special Editions'],
  },
  {
    title: 'Experience',
    links: ['Test Drive', 'Configurator', 'Showrooms', 'Events'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Heritage', 'Careers', 'Press'],
  },
]

const socials = [
  { icon: <InstagramIcon sx={{ fontSize: 18 }} />, label: 'Instagram' },
  { icon: <YouTubeIcon sx={{ fontSize: 18 }} />, label: 'YouTube' },
  { icon: <XIcon sx={{ fontSize: 18 }} />, label: 'X' },
  { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, label: 'LinkedIn' },
]

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        pt: { xs: 8, md: 10 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }}>
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  letterSpacing: '0.15em',
                  color: '#c9a227',
                  textTransform: 'uppercase',
                  mb: 0.5,
                }}
              >
                APEX<Box component="span" sx={{ color: '#fff', ml: 0.5 }}>AUTO</Box>
              </Typography>
              <Box sx={{ width: 30, height: 2, background: '#c9a227', mb: 2.5 }} />
            </Box>
            <Typography sx={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.9, mb: 4, maxWidth: 280 }}>
              Engineering the future of automotive excellence.
              Where raw power meets refined craftsmanship.
            </Typography>
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socials.map((s) => (
                <IconButton
                  key={s.label}
                  aria-label={s.label}
                  sx={{
                    color: '#444',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 0,
                    width: 38,
                    height: 38,
                    '&:hover': {
                      color: '#c9a227',
                      borderColor: 'rgba(201,162,39,0.4)',
                      background: 'rgba(201,162,39,0.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <Grid item xs={6} sm={4} md={2.5} key={col.title}>
              <Typography
                sx={{
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  mb: 3,
                }}
              >
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {col.links.map((link) => (
                  <Typography
                    key={link}
                    sx={{
                      color: '#555',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      '&:hover': { color: '#c9a227' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 5 }} />

        {/* Bottom Bar */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ color: '#333', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            © 2025 APEX AUTO. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map((item) => (
              <Typography
                key={item}
                sx={{
                  color: '#333',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  '&:hover': { color: '#c9a227' },
                  transition: 'color 0.2s ease',
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
