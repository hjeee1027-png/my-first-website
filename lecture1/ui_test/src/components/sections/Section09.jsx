import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
} from '@mui/material'

const cards = [
  {
    id: 1,
    title: 'React',
    description: '사용자 인터페이스를 만들기 위한 JavaScript 라이브러리. 컴포넌트 기반 구조로 재사용성이 높습니다.',
    category: 'Frontend',
    color: '#61dafb',
    bg: '#20232a',
  },
  {
    id: 2,
    title: 'TypeScript',
    description: 'JavaScript의 정적 타입 슈퍼셋. 타입 안정성과 IDE 지원을 통해 대규모 프로젝트에 적합합니다.',
    category: 'Language',
    color: '#fff',
    bg: '#3178c6',
  },
  {
    id: 3,
    title: 'MUI',
    description: 'Material Design을 기반으로 한 React UI 컴포넌트 라이브러리. 빠른 UI 개발을 지원합니다.',
    category: 'UI Library',
    color: '#fff',
    bg: '#007fff',
  },
  {
    id: 4,
    title: 'Vite',
    description: '차세대 프론트엔드 빌드 도구. 빠른 HMR과 최적화된 빌드 성능을 제공합니다.',
    category: 'Build Tool',
    color: '#fff',
    bg: '#646cff',
  },
]

const Section09 = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 09 — Card
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <Card
              elevation={hovered === card.id ? 8 : 2}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'elevation 0.2s, transform 0.2s',
                transform: hovered === card.id ? 'translateY(-4px)' : 'none',
              }}
            >
              <CardMedia
                sx={{
                  height: 100,
                  backgroundColor: card.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" sx={{ color: card.color, fontWeight: 700 }}>
                  {card.title}
                </Typography>
              </CardMedia>

              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Chip label={card.category} size="small" variant="outlined" color="primary" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="small" variant="contained">자세히</Button>
                <Button size="small" color="inherit">공유</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Section09
