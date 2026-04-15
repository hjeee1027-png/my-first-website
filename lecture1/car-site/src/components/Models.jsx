import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, Container, Grid, Button, Chip } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SpeedIcon from '@mui/icons-material/Speed'
import BoltIcon from '@mui/icons-material/Bolt'
import TimelapseIcon from '@mui/icons-material/Timelapse'

const models = [
  {
    id: 1,
    name: 'APEX GT',
    subtitle: 'Grand Tourer',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    specs: { hp: '580 HP', speed: '0-100 in 3.4s', top: '295 km/h' },
    price: '₩ 185,000,000',
    color: '#c9a227',
    description: 'The perfect harmony between raw performance and daily comfort.',
  },
  {
    id: 2,
    name: 'APEX R',
    subtitle: 'Sport Edition',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80',
    specs: { hp: '720 HP', speed: '0-100 in 2.9s', top: '330 km/h' },
    price: '₩ 245,000,000',
    color: '#e53935',
    description: 'Engineered for those who refuse to compromise on speed.',
  },
  {
    id: 3,
    name: 'APEX E',
    subtitle: 'Electric Series',
    tag: 'EV',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    specs: { hp: '850 HP', speed: '0-100 in 2.4s', top: '320 km/h' },
    price: '₩ 285,000,000',
    color: '#00e5ff',
    description: 'The future of performance, powered by pure electricity.',
  },
]

const ModelCard = ({ model, index }) => {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          background: '#0e0e0e',
          border: hovered ? `1px solid ${model.color}` : '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${model.color}22` : '0 10px 30px rgba(0,0,0,0.4)',
        }}
      >
        {/* Tag */}
        <Chip
          label={model.tag}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2,
            background: model.color,
            color: '#000',
            fontWeight: 700,
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            borderRadius: 0,
            height: 22,
          }}
        />

        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            height: 220,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={model.image}
            alt={model.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s ease',
              filter: 'brightness(0.8)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 60%)',
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: model.color, fontSize: '0.65rem', letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase', mb: 0.5 }}>
            {model.subtitle}
          </Typography>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '0.05em', mb: 1.5, textTransform: 'uppercase' }}>
            {model.name}
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.7, mb: 2.5 }}>
            {model.description}
          </Typography>

          {/* Specs */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {[
              { icon: <BoltIcon sx={{ fontSize: 14 }} />, value: model.specs.hp },
              { icon: <TimelapseIcon sx={{ fontSize: 14 }} />, value: model.specs.speed },
              { icon: <SpeedIcon sx={{ fontSize: 14 }} />, value: model.specs.top },
            ].map((spec, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#777', fontSize: '0.7rem' }}>
                <Box sx={{ color: model.color }}>{spec.icon}</Box>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 500 }}>{spec.value}</Typography>
              </Box>
            ))}
          </Box>

          {/* Price & CTA */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ color: '#555', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Starting from</Typography>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', mt: 0.3 }}>{model.price}</Typography>
            </Box>
            <Button
              endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                color: model.color,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                fontWeight: 700,
                textTransform: 'uppercase',
                px: 0,
                '&:hover': { background: 'transparent', opacity: 0.7 },
              }}
            >
              Configure
            </Button>
          </Box>
        </Box>

        {/* Bottom accent line */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: hovered ? '100%' : '0%',
            background: `linear-gradient(to right, ${model.color}, transparent)`,
            transition: 'width 0.5s ease',
          }}
        />
      </Box>
    </Box>
  )
}

const Models = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const titleRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Box id="models" sx={{ py: { xs: 10, md: 16 }, background: '#080808' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }}>
        {/* Section Header */}
        <Box
          ref={titleRef}
          sx={{
            mb: { xs: 6, md: 10 },
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ width: 40, height: 1, background: '#c9a227' }} />
            <Typography sx={{ color: '#c9a227', fontSize: '0.7rem', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase' }}>
              Our Lineup
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              color: '#fff',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
              textTransform: 'uppercase',
              lineHeight: 1.1,
              maxWidth: 500,
            }}
          >
            Choose Your<br />
            <Box component="span" sx={{ color: '#c9a227' }}>Weapon.</Box>
          </Typography>
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={3}>
          {models.map((model, index) => (
            <Grid item xs={12} md={4} key={model.id}>
              <ModelCard model={model} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Models
