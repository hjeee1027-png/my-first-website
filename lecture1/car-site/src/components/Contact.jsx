import React, { useState, useEffect, useRef } from 'react'
import {
  Box, Typography, Container, Grid, TextField, Button,
  MenuItem, Select, FormControl, InputLabel,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    color: '#fff',
    fontSize: '0.85rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(201,162,39,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#c9a227', borderWidth: 1 },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    fontSize: '0.82rem',
    '&.Mui-focused': { color: '#c9a227' },
  },
  '& .MuiSelect-icon': { color: '#666' },
}

const contactInfo = [
  { icon: <PhoneIcon sx={{ fontSize: 18 }} />, label: 'Phone', value: '+82 02-1234-5678' },
  { icon: <EmailIcon sx={{ fontSize: 18 }} />, label: 'Email', value: 'sales@apexauto.kr' },
  { icon: <LocationOnIcon sx={{ fontSize: 18 }} />, label: 'Showroom', value: 'Seoul, Gangnam-gu' },
]

const Contact = () => {
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', model: '', message: '' })
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 10, md: 16 },
        background: 'linear-gradient(180deg, #080808 0%, #0a0a0a 100%)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
      ref={ref}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }}>
          {/* Left: Info */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 40, height: 1, background: '#c9a227' }} />
                <Typography sx={{ color: '#c9a227', fontSize: '0.7rem', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase' }}>
                  Contact
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  mb: 3,
                }}
              >
                Book a<br />
                <Box component="span" sx={{ color: '#c9a227' }}>Test Drive.</Box>
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.8, mb: 5 }}>
                Experience the pinnacle of performance firsthand.
                Schedule your private test drive today and feel the difference.
              </Typography>

              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {contactInfo.map((info) => (
                  <Box key={info.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(201,162,39,0.3)',
                        color: '#c9a227',
                        flexShrink: 0,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#555', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {info.label}
                      </Typography>
                      <Typography sx={{ color: '#ccc', fontSize: '0.85rem', fontWeight: 500 }}>
                        {info.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right: Form */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
              }}
            >
              {submitted ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 400,
                    border: '1px solid rgba(201,162,39,0.3)',
                    background: '#0e0e0e',
                    textAlign: 'center',
                    p: 4,
                  }}
                >
                  <Box sx={{ width: 60, height: 1, background: '#c9a227', mb: 4 }} />
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, textTransform: 'uppercase', mb: 2, fontSize: '1.6rem' }}>
                    Request Received
                  </Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.8, maxWidth: 340 }}>
                    Our specialist will contact you within 24 hours to confirm your test drive appointment.
                  </Typography>
                </Box>
              ) : (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    p: { xs: 3, md: 5 },
                    background: '#0e0e0e',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        sx={inputSx}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        sx={inputSx}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        sx={inputSx}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={inputSx}>
                        <InputLabel>Preferred Model</InputLabel>
                        <Select
                          name="model"
                          value={form.model}
                          onChange={handleChange}
                          label="Preferred Model"
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 0,
                                '& .MuiMenuItem-root': {
                                  fontSize: '0.85rem',
                                  color: '#aaa',
                                  '&:hover': { color: '#fff', background: 'rgba(201,162,39,0.08)' },
                                },
                              },
                            },
                          }}
                        >
                          <MenuItem value="APEX GT">APEX GT — Grand Tourer</MenuItem>
                          <MenuItem value="APEX R">APEX R — Sport Edition</MenuItem>
                          <MenuItem value="APEX E">APEX E — Electric Series</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message (optional)"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={inputSx}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        fullWidth
                        sx={{
                          background: 'linear-gradient(135deg, #c9a227, #f0c847)',
                          color: '#000',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          letterSpacing: '0.15em',
                          py: 2,
                          borderRadius: 0,
                          boxShadow: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #f0c847, #c9a227)',
                            boxShadow: '0 0 30px rgba(201,162,39,0.3)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Submit Request
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Contact
