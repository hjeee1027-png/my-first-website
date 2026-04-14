import React from 'react'
import { Box, Card, CardContent, Typography, Avatar, Rating, Chip } from '@mui/material'

const ReviewCard = ({ review }) => {
  const { name, avatar, date, rating, text, menu, verified } = review

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1.5px solid #ffe0b2',
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(229,57,53,0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* 따옴표 아이콘 */}
        <Typography sx={{ color: '#ffccbc', fontSize: 32, mb: 1, lineHeight: 1 }}>"</Typography>

        {/* 별점 */}
        <Rating
          value={rating}
          readOnly
          precision={0.5}
          size="small"
          sx={{ color: '#ff7043', mb: 1.5 }}
        />

        {/* 리뷰 내용 */}
        <Typography
          variant="body2"
          sx={{ color: '#424242', lineHeight: 1.8, mb: 2.5, minHeight: 80 }}
        >
          {text}
        </Typography>

        {/* 주문 메뉴 태그 */}
        <Chip
          label={`주문: ${menu}`}
          size="small"
          sx={{
            backgroundColor: '#fff3e0',
            color: '#e64a19',
            fontWeight: 600,
            fontSize: '0.72rem',
            mb: 2.5,
          }}
        />

        {/* 구분선 */}
        <Box sx={{ borderTop: '1px solid #f5e6d8', pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* 아바타 */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#ffccbc',
                fontSize: '1.2rem',
              }}
            >
              {avatar}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: '#212121' }}
                >
                  {name}
                </Typography>
                {verified && (
                  <Chip
                    label="인증"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.65rem',
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      fontWeight: 700,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
                {date}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
