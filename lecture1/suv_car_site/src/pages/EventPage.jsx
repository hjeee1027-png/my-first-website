import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { EVENTS } from '../data/mockData'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function EventPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', pt: '72px' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, md: 6 }, py: 6 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#A68966', letterSpacing: '0.3em', display: 'block', mb: 1 }}>PROMOTIONS</Typography>
          <Typography variant="h3" sx={{ color: '#0c121c', fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.875rem' }, mb: 2 }}>
            이벤트 &amp; 프로모션
          </Typography>
          <Typography sx={{ color: '#888', fontSize: '0.9rem' }}>
            VANTAGE의 특별한 혜택을 만나보세요
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {EVENTS.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card
                sx={{
                  bgcolor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 0,
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#A68966' },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="260"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800' }}
                  />
                  {event.badge && (
                    <Chip
                      label={event.badge}
                      size="small"
                      sx={{ position: 'absolute', top: 16, left: 16, bgcolor: '#A68966', color: '#fff', fontWeight: 600, borderRadius: 0, fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ color: '#111', fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Typography sx={{ color: '#A68966', fontSize: '0.9rem', fontWeight: 500, mb: 1.5 }}>
                    {event.subtitle}
                  </Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7, mb: 2.5 }}>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: '0.9rem', color: '#bbb' }} />
                      <Typography sx={{ color: '#888', fontSize: '0.8rem' }}>
                        {event.start_date} ~ {event.end_date}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate('/reservation')}
                      sx={{ borderColor: '#111', color: '#111', fontSize: '0.8rem', py: 0.8, '&:hover': { bgcolor: '#111', color: '#fff' } }}
                    >
                      참여하기
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
