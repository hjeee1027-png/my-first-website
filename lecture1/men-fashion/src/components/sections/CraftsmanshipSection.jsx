import React from 'react'
import { Box, Typography, Button } from '@mui/material'

const STATS = [
  ['30+', '년의 장인 정신'],
  ['100%', '천연 소재'],
  ['핸드', '피니싱'],
]

const CraftsmanshipSection = () => (
  <Box sx={{ backgroundColor: '#1B2A4A', overflow: 'hidden' }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: { xs: 'auto', md: 560 },
        maxWidth: 1280,
        mx: 'auto',
      }}
    >
      {/* 왼쪽: 이미지 */}
      <Box
        sx={{
          flex: '0 0 50%',
          minHeight: { xs: 340, md: 'auto' },
          backgroundImage:
            'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(27,42,74,0) 60%, rgba(27,42,74,0.6) 100%)',
          },
        }}
      />

      {/* 오른쪽: 텍스트 */}
      <Box
        sx={{
          flex: '0 0 50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 4, md: 9 },
          py: { xs: 7, md: 10 },
        }}
      >
        <Typography
          sx={{
            fontSize: '0.62rem',
            letterSpacing: '0.3em',
            color: '#8A96A8',
            mb: 2.5,
            textTransform: 'uppercase',
          }}
        >
          — 장인 정신
        </Typography>

        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: { xs: '1.8rem', md: '2.4rem' },
            fontWeight: 400,
            color: '#F0EBE1',
            lineHeight: 1.25,
            mb: 3.5,
            letterSpacing: '0.01em',
          }}
        >
          의도를 담아<br />만든 옷
        </Typography>

        <Typography
          sx={{
            fontSize: '0.88rem',
            color: '#7A8A9E',
            lineHeight: 2.1,
            mb: 5,
            maxWidth: 420,
          }}
        >
          노르 메종의 모든 의류는 하나의 실에서 시작됩니다.
          수백 년의 전통 기법과 현대적 패턴 엔지니어링의 정밀함이 만나
          당신의 이야기와 함께 나이 드는 옷을 만들어냅니다.
        </Typography>

        {/* 통계 */}
        <Box sx={{ display: 'flex', gap: 5, mb: 5.5 }}>
          {STATS.map(([num, label]) => (
            <Box key={label}>
              <Typography
                sx={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: '1.5rem',
                  color: '#E8DCC8',
                  mb: 0.5,
                  letterSpacing: '0.02em',
                }}
              >
                {num}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  color: '#5A6A7E',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          disableRipple
          sx={{
            alignSelf: 'flex-start',
            color: '#E8DCC8',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            borderBottom: '1px solid #4A5C7A',
            borderRadius: 0,
            pb: 0.5,
            px: 0,
            minWidth: 0,
            '&:hover': {
              backgroundColor: 'transparent',
              borderBottomColor: '#E8DCC8',
            },
            transition: 'border-color 0.2s',
          }}
        >
          브랜드 스토리 보기 →
        </Button>
      </Box>
    </Box>
  </Box>
)

export default CraftsmanshipSection
