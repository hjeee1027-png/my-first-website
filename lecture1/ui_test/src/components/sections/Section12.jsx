import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  Paper,
  Fade,
  Grow,
  Slide,
} from '@mui/material'
import './Section12.css'

const Section12 = () => {
  const [fade, setFade] = useState(false)
  const [grow, setGrow] = useState(false)
  const [slide, setSlide] = useState(false)
  const [bounce, setBounce] = useState(false)
  const [spin, setSpin] = useState(false)

  const triggerCss = (setter) => {
    setter(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setter(true)))
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 12 — Animation
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>

        {/* Fade */}
        <Box sx={{ flex: '1 1 160px' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Fade
          </Typography>
          <Button variant="outlined" size="small" onClick={() => setFade((v) => !v)} sx={{ mb: 2 }}>
            {fade ? '숨기기' : '보이기'}
          </Button>
          <Box sx={{ minHeight: 70 }}>
            <Fade in={fade} timeout={600}>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: 'primary.main' }}>
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                  Fade In/Out
                </Typography>
              </Paper>
            </Fade>
          </Box>
        </Box>

        {/* Grow */}
        <Box sx={{ flex: '1 1 160px' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Grow
          </Typography>
          <Button variant="outlined" size="small" onClick={() => setGrow((v) => !v)} sx={{ mb: 2 }}>
            {grow ? '숨기기' : '보이기'}
          </Button>
          <Box sx={{ minHeight: 70 }}>
            <Grow in={grow} timeout={500}>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: 'secondary.main' }}>
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                  Grow In/Out
                </Typography>
              </Paper>
            </Grow>
          </Box>
        </Box>

        {/* Slide */}
        <Box sx={{ flex: '1 1 160px', overflow: 'hidden' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Slide
          </Typography>
          <Button variant="outlined" size="small" onClick={() => setSlide((v) => !v)} sx={{ mb: 2 }}>
            {slide ? '숨기기' : '보이기'}
          </Button>
          <Box sx={{ minHeight: 70 }}>
            <Slide in={slide} direction="right" timeout={400}>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: 'success.main' }}>
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                  Slide Right
                </Typography>
              </Paper>
            </Slide>
          </Box>
        </Box>

        {/* Bounce (CSS) */}
        <Box sx={{ flex: '1 1 160px' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Bounce (CSS)
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => triggerCss(setBounce)}
            sx={{ mb: 2 }}
          >
            재생
          </Button>
          <Box sx={{ minHeight: 70 }}>
            <Paper
              elevation={3}
              className={bounce ? 'anim-bounce' : ''}
              sx={{ p: 2, backgroundColor: 'warning.main' }}
            >
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                Bounce!
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Spin (CSS) */}
        <Box sx={{ flex: '1 1 160px' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Spin (CSS)
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => triggerCss(setSpin)}
            sx={{ mb: 2 }}
          >
            재생
          </Button>
          <Box sx={{ minHeight: 70 }}>
            <Paper
              elevation={3}
              className={spin ? 'anim-spin' : ''}
              sx={{ p: 2, backgroundColor: 'error.main', display: 'inline-block' }}
            >
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                Spin!
              </Typography>
            </Paper>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default Section12
