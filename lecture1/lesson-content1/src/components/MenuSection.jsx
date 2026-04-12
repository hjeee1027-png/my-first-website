import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import MenuCard from './MenuCard'

const menus = [
  {
    id: 1,
    name: '오리지널 떡볶이',
    description: '국물이 진하고 달달한 우리 가게의 시그니처 떡볶이',
    price: 8000,
    spicy: 2,
    tag: '인기',
    emoji: '🍢',
    category: '떡볶이',
  },
  {
    id: 2,
    name: '엽기 떡볶이',
    description: '매운 걸 좋아한다면! 불맛 가득한 극강 매운맛',
    price: 9500,
    spicy: 5,
    tag: null,
    emoji: '🔥',
    category: '떡볶이',
  },
  {
    id: 3,
    name: '로제 떡볶이',
    description: '크리미한 로제 소스가 떡볶이를 부드럽게 감싸는 신메뉴',
    price: 10000,
    spicy: 1,
    tag: '신메뉴',
    emoji: '🍅',
    category: '떡볶이',
  },
  {
    id: 4,
    name: '치즈 떡볶이',
    description: '모짜렐라 치즈가 쭉쭉 늘어나는 아이들도 좋아하는 메뉴',
    price: 10500,
    spicy: 1,
    tag: null,
    emoji: '🧀',
    category: '떡볶이',
  },
  {
    id: 5,
    name: '순대 세트',
    description: '쫄깃한 당면 순대와 고소한 내장 순대 모듬',
    price: 7000,
    spicy: 0,
    tag: '인기',
    emoji: '🥙',
    category: '사이드',
  },
  {
    id: 6,
    name: '튀김 모듬',
    description: '야채, 오징어, 고구마 튀김 한 접시 가득',
    price: 6500,
    spicy: 0,
    tag: null,
    emoji: '🍤',
    category: '사이드',
  },
  {
    id: 7,
    name: '라볶이',
    description: '쫄깃한 라면과 떡볶이의 환상 조합, 국물 맛이 일품',
    price: 9000,
    spicy: 3,
    tag: null,
    emoji: '🍜',
    category: '떡볶이',
  },
  {
    id: 8,
    name: '어묵 꼬치',
    description: '따끈따끈한 국물 어묵, 겨울의 필수 간식',
    price: 1000,
    spicy: 0,
    tag: '인기',
    emoji: '🍡',
    category: '사이드',
  },
]

const categories = ['전체', '떡볶이', '사이드']

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const handleCategory = (_, newCategory) => {
    if (newCategory !== null) setSelectedCategory(newCategory)
  }

  const filteredMenus =
    selectedCategory === '전체'
      ? menus
      : menus.filter((m) => m.category === selectedCategory)

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
            sx={{ color: '#e53935', fontWeight: 700, letterSpacing: 3, fontSize: '0.85rem' }}
          >
            MENU
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, color: '#212121', mt: 1, mb: 2 }}
          >
            떡볶이 메뉴 🍢
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#757575', maxWidth: 480, mx: 'auto' }}
          >
            국물 하나하나 정성껏 끓인 우리 가게만의 특제 소스로 만든 떡볶이를 만나보세요.
          </Typography>
        </Box>

        {/* 카테고리 필터 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategory}
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
            {categories.map((cat) => (
              <ToggleButton key={cat} value={cat}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* 메뉴 카드 그리드 */}
        <Grid container spacing={3}>
          {filteredMenus.map((menu) => (
            <Grid key={menu.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <MenuCard menu={menu} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default MenuSection
