# 코드 컨벤션

## 파일 네이밍
- 컴포넌트: PascalCase (예: UserProfile.jsx)
- 유틸리티: camelCase (예: formatDate.js)
- 스타일: camelCase (예: theme.js)

## 컴포넌트 구조
```jsx
// 임포트 순서: React → MUI → 로컬
import React from 'react'
import { Box, Typography } from '@mui/material'
import LocalComponent from './LocalComponent'

const ComponentName = () => {
  return (
    <Box>
      <Typography>내용</Typography>
    </Box>
  )
}

export default ComponentName
```

## 규칙
- 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- Props는 구조 분해 할당 사용
- 상태 관리는 useState, useReducer 활용
- 부수 효과는 useEffect 사용
- MUI sx prop으로 스타일링 권장
