import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, Container } from '@mui/material'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    label: 'Night Drive',
    span: 2,
  },
  {
    src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
    label: 'GT Edition',
    span: 1,
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    label: 'Detail',
    span: 1,
  },
  {
    src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&q=80',
    label: 'Sport Edition',
    span: 1,
  },
  {
    src: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    label: 'Electric Series',
    span: 2,
  },
]

const GalleryItem = ({ img, index, visible }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        gridColumn: { xs: 'span 1', md: `span ${img.span}` },
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: img.span === 2 ? '16/9' : '4/3',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      <Box
        component="img"
        src={img.src}
        alt={img.label}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.7s ease',
          filter: hovered ? 'brightness(0.6)' : 'brightness(0.45)',
        }}
      />

      {/* Hover overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'
            : 'transparent',
          transition: 'background 0.4s ease',
        }}
      />

      {/* Gold corner accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: hovered ? 40 : 0,
          height: 2,
          background: '#c9a227',
          transition: 'width 0.4s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2,
          height: hovered ? 40 : 0,
          background: '#c9a227',
          transition: 'height 0.4s ease',
        }}
      />

      {/* Label */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 20,
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {img.label}
      </Typography>
    </Box>
  )
}

const Gallery = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      id="gallery"
      sx={{ py: { xs: 10, md: 16 }, background: '#080808' }}
      ref={ref}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }}>
        {/* Section Header */}
        <Box
          sx={{
            mb: { xs: 6, md: 8 },
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ width: 40, height: 1, background: '#c9a227' }} />
            <Typography sx={{ color: '#c9a227', fontSize: '0.7rem', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase' }}>
              Gallery
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
            }}
          >
            Every Angle,<br />
            <Box component="span" sx={{ color: '#c9a227' }}>Perfection.</Box>
          </Typography>
        </Box>

        {/* Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 1.5,
          }}
        >
          {images.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} visible={visible} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Gallery
