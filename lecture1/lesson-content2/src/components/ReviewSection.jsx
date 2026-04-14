import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Rating,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import ReviewCard from './ReviewCard'

const reviews = [
  {
    id: 1,
    name: '김민지',
    avatar: '😊',
    date: '2026.04.10',
    rating: 5,
    text: '진짜 너무 맛있어요! 오리지널 떡볶이 국물이 진해서 자꾸 생각나요. 친구들이랑 자주 올 것 같아요. 사장님도 너무 친절하시고 양도 푸짐해서 가성비 최고입니다!',
    menu: '오리지널 떡볶이',
    verified: true,
    filter: '전체',
  },
  {
    id: 2,
    name: '이준호',
    avatar: '🙂',
    date: '2026.04.08',
    rating: 4.5,
    text: '엽기 떡볶이 완전 매운데 중독성 있어요. 처음엔 힘들었는데 나중엔 국물 다 마셨습니다 ㅋㅋ 다음엔 친구 데려와야겠어요.',
    menu: '엽기 떡볶이',
    verified: true,
    filter: '떡볶이',
  },
  {
    id: 3,
    name: '박소연',
    avatar: '😄',
    date: '2026.04.07',
    rating: 5,
    text: '로제 떡볶이가 이렇게 맛있을 줄 몰랐어요. 크리미하면서 매콤한 맛의 조화가 완벽해요. 혼밥하기도 좋고 분위기도 아늑해서 자주 들를 것 같아요.',
    menu: '로제 떡볶이',
    verified: true,
    filter: '떡볶이',
  },
  {
    id: 4,
    name: '최현우',
    avatar: '😎',
    date: '2026.04.05',
    rating: 4,
    text: '순대 세트 양이 정말 많아요. 혼자 먹기엔 좀 많을 수도? 튀김이랑 같이 시켜서 나눠먹기 딱 좋아요. 국물 서비스도 무제한이라 좋았어요.',
    menu: '순대 세트',
    verified: false,
    filter: '사이드',
  },
  {
    id: 5,
    name: '정유나',
    avatar: '🥰',
    date: '2026.04.03',
    rating: 5,
    text: '치즈 떡볶이 치즈 늘어나는 게 너무 귀엽고 맛있어요! 사진 찍기도 너무 좋아요. 인스타에 올렸더니 친구들이 어디냐고 난리났어요 ㅎㅎ',
    menu: '치즈 떡볶이',
    verified: true,
    filter: '떡볶이',
  },
  {
    id: 6,
    name: '강태양',
    avatar: '😋',
    date: '2026.04.01',
    rating: 4.5,
    text: '어묵 꼬치가 1000원인데 이 퀄리티면 진짜 가성비 갑이에요. 국물도 같이 주는데 따뜻하고 시원해서 날씨 추울 때 딱이에요.',
    menu: '어묵 꼬치',
    verified: true,
    filter: '사이드',
  },
]

// 별점 분포 데이터
const ratingDistribution = [
  { stars: 5, count: 842 },
  { stars: 4, count: 276 },
  { stars: 3, count: 89 },
  { stars: 2, count: 23 },
  { stars: 1, count: 10 },
]
const totalReviews = ratingDistribution.reduce((sum, r) => sum + r.count, 0)

const filters = ['전체', '떡볶이', '사이드']

const ReviewSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체')

  const handleFilter = (_, newFilter) => {
    if (newFilter !== null) setSelectedFilter(newFilter)
  }

  const filteredReviews =
    selectedFilter === '전체'
      ? reviews
      : reviews.filter((r) => r.filter === selectedFilter)

  return (
    <Box
      component="section"
      sx={{ backgroundColor: '#fff8f0', py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="lg">
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#e53935',
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: '0.85rem',
            }}
          >
            REVIEWS
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, color: '#212121', mt: 1, mb: 2 }}
          >
            고객 리뷰 ⭐
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#757575', maxWidth: 480, mx: 'auto' }}
          >
            직접 드셔보신 고객님들의 생생한 후기를 확인해보세요.
          </Typography>
        </Box>

        {/* 통계 요약 카드 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mb: 7,
            p: { xs: 3, md: 4 },
            backgroundColor: '#fff',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(229,57,53,0.08)',
            border: '1.5px solid #ffe0b2',
          }}
        >
          {/* 평균 별점 */}
          <Box
            sx={{
              flex: '0 0 auto',
              textAlign: 'center',
              px: { xs: 0, md: 4 },
              borderRight: { xs: 'none', md: '1.5px solid #f5e6d8' },
              pb: { xs: 3, md: 0 },
              borderBottom: { xs: '1.5px solid #f5e6d8', md: 'none' },
            }}
          >
            <Typography
              sx={{ fontSize: '4rem', fontWeight: 900, color: '#e53935', lineHeight: 1 }}
            >
              4.8
            </Typography>
            <Rating
              value={4.8}
              readOnly
              precision={0.1}
              sx={{ color: '#ff7043', mt: 0.5 }}
            />
            <Typography variant="body2" sx={{ color: '#9e9e9e', mt: 0.5 }}>
              5점 만점
            </Typography>
          </Box>

          {/* 별점 분포 바 */}
          <Box sx={{ flex: 1, px: { xs: 0, md: 4 } }}>
            {ratingDistribution.map(({ stars, count }) => (
              <Box
                key={stars}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, minWidth: 28 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#424242' }}>
                    {stars}⭐
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(count / totalReviews) * 100}
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#f5e6d8',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#ff7043',
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#9e9e9e', minWidth: 32 }}>
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* 통계 숫자 */}
          <Box
            sx={{
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              justifyContent: 'center',
              gap: { xs: 4, md: 2 },
              px: { xs: 0, md: 4 },
              borderLeft: { xs: 'none', md: '1.5px solid #f5e6d8' },
              pt: { xs: 3, md: 0 },
              borderTop: { xs: '1.5px solid #f5e6d8', md: 'none' },
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 28 }}>👥</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#212121' }}>
                1,240+
              </Typography>
              <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
                총 리뷰
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 28 }}>👍</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#212121' }}>
                98%
              </Typography>
              <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
                만족도
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 필터 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <ToggleButtonGroup
            value={selectedFilter}
            exclusive
            onChange={handleFilter}
            sx={{
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1,
                borderRadius: '24px !important',
                border: '1.5px solid #e53935 !important',
                mx: 0.5,
                color: '#e53935',
                fontWeight: 600,
                '&.Mui-selected': {
                  backgroundColor: '#e53935',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#c62828' },
                },
                '&:hover': { backgroundColor: '#ffebee' },
              },
            }}
          >
            {filters.map((f) => (
              <ToggleButton key={f} value={f}>
                {f}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* 리뷰 카드 그리드 */}
        <Grid container spacing={3}>
          {filteredReviews.map((review) => (
            <Grid key={review.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ReviewSection
