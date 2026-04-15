import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Hero = () => {
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: 700,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: 'scale(1.05)',
          transition: 'transform 8s ease',
          '&.loaded': { transform: 'scale(1)' },
          filter: 'brightness(0.35)',
        }}
        className={loaded ? 'loaded' : ''}
      />

      {/* Gradient Overlays */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to top, #080808 0%, transparent 100%)',
        }}
      />

      {/* Gold Line Accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, #c9a227 40%, transparent 100%)',
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            maxWidth: 680,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
          }}
        >
          {/* Eyebrow */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
            }}
          >
            <Box sx={{ width: 40, height: 1, background: '#c9a227' }} />
            <Typography
              sx={{
                color: '#c9a227',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              2025 Collection
            </Typography>
          </Box>

          {/* Main Heading */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem', lg: '6rem' },
              fontWeight: 800,
              lineHeight: 1.0,
              mb: 1,
              color: '#fff',
              textTransform: 'uppercase',
            }}
          >
            Drive
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem', lg: '6rem' },
              fontWeight: 800,
              lineHeight: 1.0,
              mb: 4,
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #c9a227 0%, #f0c847 50%, #c9a227 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}
          >
            The Future.
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: '#8a8a8a',
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 400,
              lineHeight: 1.8,
              mb: 5,
              maxWidth: 480,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease 0.9s',
            }}
          >
            Experience the pinnacle of automotive engineering.
            Raw power meets refined elegance in every curve,
            every line, every moment behind the wheel.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 1.1s, transform 0.8s ease 1.1s',
            }}
          >
            <Button
              variant="contained"
              onClick={() => document.querySelector('#models')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                background: 'linear-gradient(135deg, #c9a227, #f0c847)',
                color: '#000',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                px: 4,
                py: 1.8,
                borderRadius: 0,
                boxShadow: '0 0 30px rgba(201,162,39,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f0c847, #c9a227)',
                  boxShadow: '0 0 50px rgba(201,162,39,0.5)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Explore Models
            </Button>
            <Button
              variant="outlined"
              onClick={() => document.querySelector('#performance')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                px: 4,
                py: 1.8,
                borderRadius: 0,
                '&:hover': {
                  borderColor: '#c9a227',
                  color: '#c9a227',
                  background: 'transparent',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Performance
            </Button>
          </Box>
        </Box>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            opacity: loaded ? 0.6 : 0,
            transition: 'opacity 1s ease 1.5s',
            cursor: 'pointer',
            '&:hover': { opacity: 1 },
          }}
          onClick={() => document.querySelector('#models')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#aaa', textTransform: 'uppercase' }}>
            Scroll
          </Typography>
          <Box
            sx={{
              width: 1,
              height: 50,
              background: 'linear-gradient(to bottom, rgba(201,162,39,0.8), transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </Box>
      </Container>

      {/* Bottom Stats Bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: { xs: 'none', md: 'flex' },
          gap: 0,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease 1.3s',
        }}
      >
        {[
          { value: '720', unit: 'HP', label: 'Peak Power' },
          { value: '2.9', unit: 's', label: '0-100 km/h' },
          { value: '330', unit: 'km/h', label: 'Top Speed' },
        ].map((stat, i) => (
          <Box
            key={i}
            sx={{
              width: 130,
              p: 2.5,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              borderTop: '2px solid rgba(201,162,39,0.4)',
              borderLeft: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
              <Typography sx={{ color: '#c9a227', fontWeight: 800, fontSize: '1.6rem', lineHeight: 1 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ color: '#c9a227', fontWeight: 600, fontSize: '0.75rem' }}>
                {stat.unit}
              </Typography>
            </Box>
            <Typography sx={{ color: '#666', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', mt: 0.5 }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Hero
