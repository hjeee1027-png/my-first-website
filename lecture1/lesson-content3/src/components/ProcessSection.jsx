import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Divider,
} from '@mui/material'
import ProcessStep from './ProcessStep'

const processes = {
  소스: [
    {
      emoji: '🌶️',
      title: '최상급 고추 선별',
      description: '매해 가을, 국내산 태양초 고추를 직접 산지에서 수매합니다. 색이 선명하고 향이 강한 것만 엄선하여 사용합니다.',
      detail: '고추의 당도와 매운 정도(SHU)를 직접 측정해 품질을 관리합니다.',
      color: '#e53935',
    },
    {
      emoji: '🧅',
      title: '육수 베이스 제조',
      description: '멸치, 다시마, 건새우를 넣고 2시간 이상 천천히 끓여 깊고 진한 육수를 완성합니다. 이 육수가 소스의 기본입니다.',
      detail: '화학 조미료 없이 오직 천연 재료만으로 감칠맛을 살립니다.',
      color: '#f57c00',
    },
    {
      emoji: '🍯',
      title: '특제 소스 배합',
      description: '고추장, 고춧가루, 설탕, 간장을 황금 비율로 배합합니다. 창업 이후 변하지 않은 비밀 레시피입니다.',
      detail: '계절과 날씨에 따라 미세하게 비율을 조정해 항상 일관된 맛을 유지합니다.',
      color: '#c62828',
    },
    {
      emoji: '⏳',
      title: '48시간 숙성',
      description: '배합 후 냉장 숙성 48시간을 거쳐 각 재료의 맛이 완전히 어우러지게 합니다.',
      detail: '숙성 과정에서 소스의 산도와 발효가 균형을 이루어 풍미가 극대화됩니다.',
      color: '#6a1aff',
    },
  ],
  떡: [
    {
      emoji: '🌾',
      title: '국내산 쌀 선별',
      description: '경기미와 강원도산 쌀을 혼합해 사용합니다. 찰기와 쫄깃함의 균형이 좋은 품종만 고집합니다.',
      detail: '매일 아침 쌀의 수분 함량을 측정해 반죽 물의 양을 조절합니다.',
      color: '#43a047',
    },
    {
      emoji: '💧',
      title: '수침 및 분쇄',
      description: '깨끗이 씻은 쌀을 8시간 물에 불린 후 곱게 분쇄합니다. 이 과정이 떡의 부드러움을 결정합니다.',
      detail: '불리는 시간이 짧으면 떡이 딱딱해지고, 너무 길면 쫄깃함이 사라집니다.',
      color: '#0288d1',
    },
    {
      emoji: '🔥',
      title: '스팀 쪄내기',
      description: '분쇄한 쌀 반죽을 고압 스팀으로 균일하게 쪄냅니다. 온도와 압력이 떡의 식감을 좌우합니다.',
      detail: '105°C 고압 스팀을 사용해 내부까지 고르게 익혀 찰진 식감을 만듭니다.',
      color: '#ef6c00',
    },
    {
      emoji: '📏',
      title: '성형 및 커팅',
      description: '뜨거운 떡을 기계로 길게 뽑아낸 뒤 4.5cm 길이로 균일하게 재단합니다.',
      detail: '당일 생산된 떡만 사용하고, 냉동 떡은 절대 사용하지 않습니다.',
      color: '#558b2f',
    },
  ],
  조리: [
    {
      emoji: '🫕',
      title: '철제 팬 예열',
      description: '두꺼운 철제 팬을 중불로 충분히 달군 후 육수를 부어 소스와 함께 끓입니다.',
      detail: '팬의 두께가 열 분포에 영향을 주어 탁한 불맛을 만들어냅니다.',
      color: '#37474f',
    },
    {
      emoji: '🍢',
      title: '떡 & 어묵 투하',
      description: '소스가 끓어오르면 당일 제조한 신선한 떡과 어묵을 넣습니다. 강불에서 빠르게 볶아 불향을 입힙니다.',
      detail: '떡은 소스가 충분히 끓은 뒤 투입해야 소스가 속까지 배어듭니다.',
      color: '#e53935',
    },
    {
      emoji: '👨‍🍳',
      title: '1:1 맞춤 조절',
      description: '주문마다 매운맛 단계(1~5단계)에 맞춰 소스 농도와 양념 비율을 실시간으로 조절합니다.',
      detail: '단순히 소스 양을 늘리는 게 아닌, 고추 종류 자체를 바꿔 매운맛을 차별화합니다.',
      color: '#7b1fa2',
    },
    {
      emoji: '🍽️',
      title: '플레이팅 & 서빙',
      description: '조리 완료 즉시 예열된 그릇에 담아 서빙합니다. 식은 음식은 절대 제공하지 않습니다.',
      detail: '마지막에 참기름 한 방울로 향과 윤기를 더해 완성합니다.',
      color: '#f57c00',
    },
  ],
}

const tabLabels = [
  { label: '소스 제조', key: '소스', emoji: '🌶️' },
  { label: '떡 제조', key: '떡', emoji: '🍡' },
  { label: '조리 과정', key: '조리', emoji: '👨‍🍳' },
]

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  const currentKey = tabLabels[activeTab].key
  const steps = processes[currentKey]

  return (
    <Box
      component="section"
      sx={{ backgroundColor: '#fff8f0', minHeight: '100vh', py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="md">
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: '#e53935', fontWeight: 700, letterSpacing: 3, fontSize: '0.85rem' }}
          >
            HOW WE MAKE IT
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#212121',
              mt: 1,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.8rem' },
            }}
          >
            제조 과정 🍢
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#757575', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
          >
            소스 한 방울, 떡 하나하나에 정성을 담습니다.
            매일 아침 시작되는 우리 가게만의 정직한 제조 과정을 공개합니다.
          </Typography>
        </Box>

        {/* 탭 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#e53935', height: 3, borderRadius: 2 },
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                color: '#9e9e9e',
                px: { xs: 2, md: 4 },
                '&.Mui-selected': { color: '#e53935' },
              },
            }}
          >
            {tabLabels.map((t) => (
              <Tab key={t.key} label={`${t.emoji} ${t.label}`} />
            ))}
          </Tabs>
        </Box>

        {/* 세로 타임라인 라인 */}
        <Box sx={{ position: 'relative' }}>
          {/* 중앙 점선 라인 (데스크톱) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              left: '50%',
              top: 80,
              bottom: 80,
              width: 2,
              backgroundColor: '#ffcdd2',
              transform: 'translateX(-50%)',
              zIndex: 0,
            }}
          />

          {steps.map((step, index) => (
            <ProcessStep
              key={`${currentKey}-${index}`}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </Box>

        <Divider sx={{ mt: 8, mb: 4, borderColor: '#ffcdd2' }} />

        {/* 하단 신뢰 문구 */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{ color: '#9e9e9e', fontSize: '0.95rem', lineHeight: 2 }}
          >
            🏆 2024 서울 분식 대상 수상 &nbsp;|&nbsp; 📋 HACCP 인증 &nbsp;|&nbsp; 🌿 무방부제 &nbsp;|&nbsp; 🇰🇷 국내산 재료 100%
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default ProcessSection
