# 8DIVISION 컬러 팔레트 분석

> 분석 대상: 8DIVISION 패션 이커머스 웹사이트
> 분석 일자: 2026-04-08

---

## 메인 컬러 분석

- **Primary Color**: `#111111` — 브랜드명·제목·버튼 텍스트 전반에 사용되는 거의 검정에 가까운 다크 컬러
- **Secondary Color**: `#FFFFFF` — 배경 전체를 지배하는 순백색
- **Accent Color**: `#E8362A` — 내비게이션의 "세일" 항목에만 사용된 강렬한 레드

---

## 전체 컬러 팔레트

### Background
| 역할 | Hex | RGB |
|---|---|---|
| 메인 배경 | `#FFFFFF` | rgb(255, 255, 255) |
| 섹션 배경 (서브) | `#F8F8F8` | rgb(248, 248, 248) |
| 히어로 이미지 (딥 네이비) | `#1A2D42` | rgb(26, 45, 66) |
| 히어로 이미지 (최어두운 영역) | `#0D1621` | rgb(13, 22, 33) |

### Text Colors
| 역할 | Hex | RGB |
|---|---|---|
| 헤드라인 / 제품명 | `#111111` | rgb(17, 17, 17) |
| 레이블 (ARCHIVE, EDITORIAL) | `#888888` | rgb(136, 136, 136) |
| 서브 텍스트 / 보조 안내 | `#555555` | rgb(85, 85, 85) |

### Border / Outline
| 역할 | Hex | RGB |
|---|---|---|
| 버튼 테두리 (확인하기) | `#D0D0D0` | rgb(208, 208, 208) |
| 섹션 구분선 | `#E8E8E8` | rgb(232, 232, 232) |

### Interactive
| 역할 | Hex | RGB |
|---|---|---|
| 세일 네비 링크 | `#E8362A` | rgb(232, 54, 42) |
| 버튼 텍스트 | `#111111` | rgb(17, 17, 17) |
| 버튼 배경 | `#FFFFFF` | rgb(255, 255, 255) |
| 버튼 호버 배경 | `#111111` | rgb(17, 17, 17) |
| 버튼 호버 텍스트 | `#FFFFFF` | rgb(255, 255, 255) |

---

## 컬러 사용 비율

| 색상 | 비율 | 사용 목적 |
|---|---|---|
| `#FFFFFF` | ~60% | 전체 배경, 버튼 fill, 카드 배경 |
| `#111111` | ~25% | 텍스트, 브랜드명, 제목, 버튼 텍스트 |
| `#555555` ~ `#888888` | ~10% | 보조 레이블, 설명 텍스트, 메타 정보 |
| `#E8362A` | ~3% | 세일 단 하나의 네비 항목 |
| `#1A2D42` 계열 | ~2% | 히어로 이미지 배경 |

---

## 컬러 사용 가이드

### Primary (`#111111`)
- 모든 제목(H1 ~ H4)에 사용
- 브랜드 로고 텍스트
- 기본 네비게이션 링크
- 아웃라인 버튼의 텍스트 및 테두리
- **절대 배경색으로 쓰지 않음** (소량 사용 원칙)

### Secondary (`#FFFFFF`)
- 페이지 전체 배경
- 카드 컴포넌트 배경
- 버튼 기본 fill
- 다크 배경 위의 텍스트 색상으로 반전 사용 가능

### Accent (`#E8362A`)
- **단 하나의 요소에만 사용** (세일, 할인, 긴급 공지 등)
- 남용 금지 — 많이 쓸수록 효과 감소
- 배지(Badge), 태그(Tag), 특정 링크에만 제한적으로 사용

### Gray Scale (`#888888`, `#555555`, `#D0D0D0`, `#E8E8E8`)
- `#888888`: 카테고리 레이블(ARCHIVE, EDITORIAL 등 보조 분류)
- `#555555`: 상품 설명, 날짜, 위치 등 2차 정보
- `#D0D0D0`: 버튼, 입력 필드 테두리
- `#E8E8E8`: 콘텐츠 영역 간 구분선(Divider)

---

## 반응형 고려사항

### 다크모드 대응
```js
// theme.js 다크모드 포함 설정
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary:    { main: '#111111' },
          secondary:  { main: '#E8362A' },
          background: { default: '#FFFFFF', paper: '#F8F8F8' },
          text: {
            primary:   '#111111',
            secondary: '#888888',
          },
          divider: '#E8E8E8',
        }
      : {
          primary:    { main: '#FFFFFF' },
          secondary:  { main: '#E8362A' },
          background: { default: '#111111', paper: '#1C1C1C' },
          text: {
            primary:   '#FFFFFF',
            secondary: '#AAAAAA',
          },
          divider: '#333333',
        }
    ),
  },
})
```

### 화면 크기별 적용 원칙
| 화면 | 고려사항 |
|---|---|
| Mobile (< 600px) | 버튼 전체 너비, 텍스트 크기 축소, 네비 햄버거 메뉴로 전환 |
| Tablet (600 ~ 960px) | 2열 그리드, 히어로 이미지 높이 조정 |
| Desktop (> 960px) | 현재 레이아웃 기준 — 양 옆 여백 최대 1440px 제한 |

### 접근성 (WCAG 기준)
| 조합 | 대비비 | 등급 |
|---|---|---|
| `#111111` on `#FFFFFF` | 18.1:1 | AAA |
| `#555555` on `#FFFFFF` | 7.4:1 | AAA |
| `#888888` on `#FFFFFF` | 3.5:1 | AA (대형 텍스트) |
| `#FFFFFF` on `#E8362A` | 4.6:1 | AA |

> `#888888`은 일반 본문(14px 이하)에 단독 사용 시 접근성 기준 미달 — 반드시 보조 텍스트로만 활용

---

## 바로 쓸 수 있는 MUI 테마 코드

```js
// src/theme.js
import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary:    { main: '#111111', contrastText: '#FFFFFF' },
    secondary:  { main: '#E8362A', contrastText: '#FFFFFF' },
    background: { default: '#FFFFFF', paper: '#F8F8F8' },
    text: {
      primary:   '#111111',
      secondary: '#888888',
      disabled:  '#D0D0D0',
    },
    divider: '#E8E8E8',
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderColor: '#D0D0D0',
          color: '#111111',
          textTransform: 'none',
          letterSpacing: '0.05em',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#111111',
            color: '#FFFFFF',
            borderColor: '#111111',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#E8E8E8' },
      },
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: { color: '#111111', fontWeight: 400, letterSpacing: '-0.02em' },
    h2: { color: '#111111', fontWeight: 400, letterSpacing: '-0.01em' },
    caption: { color: '#888888', letterSpacing: '0.08em', textTransform: 'uppercase' },
  },
})

export default theme
```

---

## 디자인 특징 요약

**전체 키워드: 무채색 미니멀리즘 + 단 하나의 충격적 포인트**

| 특징 | 설명 |
|---|---|
| 블랙 & 화이트 베이스 | 색을 거의 쓰지 않아 제품 이미지가 곧 색상이 되는 구조 |
| 레드 원 포인트 | `#E8362A`를 "세일"에만 써서 클릭 유도하면서 전체 톤 유지 |
| 아웃라인 버튼 | 배경 없이 테두리만 있는 버튼 → 고급스러운 에디토리얼 느낌 |
| 대문자 + 자간 | 레이블에 `text-transform: uppercase` + 넓은 `letter-spacing` 적용 |
| 브랜드 분위기 | 럭셔리 패션 에디토리얼 — 조용하지만 자신감 있는 프리미엄 무드 |
