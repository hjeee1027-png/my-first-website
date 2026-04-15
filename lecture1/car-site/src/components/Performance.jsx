import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, Container, Grid, LinearProgress } from '@mui/material'
import SpeedIcon from '@mui/icons-material/Speed'
import BoltIcon from '@mui/icons-material/Bolt'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import SettingsIcon from '@mui/icons-material/Settings'

const stats = [
  { label: 'Horsepower', value: 720, max: 900, unit: 'HP', color: '#c9a227' },
  { label: 'Torque', value: 850, max: 1000, unit: 'Nm', color: '#e53935' },
  { label: 'Top Speed', value: 330, max: 400, unit: 'km/h', color: '#00e5ff' },
  { label: 'Efficiency', value: 92, max: 100, unit: '%', color: '#69f0ae' },
]

const features = [
  {
    icon: <BoltIcon sx={{ fontSize: 28 }} />,
    title: 'Twin-Turbo V8',
    desc: '4.0L hand-assembled engine delivering explosive acceleration from a dead stop.',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 28 }} />,
    title: 'Active Aero',
    desc: 'Dynamic aerodynamics that adjust in real-time for maximum downforce and stability.',
  },
  {
    icon: <ThermostatIcon sx={{ fontSize: 28 }} />,
    title: 'Thermal Management',
    desc: 'Advanced cooling system maintaining optimal temperatures under extreme conditions.',
  },
  {
    icon: <SettingsIcon sx={{ fontSize: 28 }} />,
    title: 'Drive Modes',
    desc: 'Seven configurable drive modes from Comfort to Race Track, tuned to perfection.',
  },
]

const StatBar = ({ stat, visible }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setProgress((stat.value / stat.max) * 100)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [visible, stat])

  return (
    <Box sx={{ mb: 3.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ color: '#aaa', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
          {stat.label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography sx={{ color: stat.color, fontWeight: 800, fontSize: '1.1rem' }}>
            {stat.value}
          </Typography>
          <Typography sx={{ color: '#555', fontSize: '0.7rem' }}>{stat.unit}</Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 3,
          borderRadius: 0,
          backgroundColor: 'rgba(255,255,255,0.06)',
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(to right, ${stat.color}88, ${stat.color})`,
            borderRadius: 0,
            transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      />
    </Box>
  )
}

const Performance = () => {
  const [visible, setVisible] = useState(false)
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
      id="performance"
      sx={{
        py: { xs: 10, md: 16 },
        background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: -200,
          transform: 'translateY(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }} ref={ref}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          {/* Left: Stats */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 40, height: 1, background: '#c9a227' }} />
                <Typography sx={{ color: '#c9a227', fontSize: '0.7rem', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase' }}>
                  Under The Hood
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
                  mb: 5,
                }}
              >
                Pure<br />
                <Box component="span" sx={{ color: '#c9a227' }}>Performance.</Box>
              </Typography>

              {stats.map((stat) => (
                <StatBar key={stat.label} stat={stat} visible={visible} />
              ))}
            </Box>
          </Grid>

          {/* Right: Feature Cards */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {features.map((feat, i) => (
                <Grid item xs={12} sm={6} key={feat.title}>
                  <Box
                    sx={{
                      p: 3,
                      background: '#0e0e0e',
                      border: '1px solid rgba(255,255,255,0.05)',
                      height: '100%',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(30px)',
                      transition: `opacity 0.7s ease ${0.2 + i * 0.12}s, transform 0.7s ease ${0.2 + i * 0.12}s`,
                      '&:hover': {
                        borderColor: 'rgba(201,162,39,0.3)',
                        background: '#111',
                      },
                      transition: `opacity 0.7s ease ${0.2 + i * 0.12}s, transform 0.7s ease ${0.2 + i * 0.12}s, border-color 0.3s ease, background 0.3s ease`,
                    }}
                  >
                    <Box sx={{ color: '#c9a227', mb: 2 }}>{feat.icon}</Box>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', mb: 1.5 }}>
                      {feat.title}
                    </Typography>
                    <Typography sx={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.7 }}>
                      {feat.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Performance
