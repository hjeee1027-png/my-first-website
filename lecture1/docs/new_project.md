# 새 프로젝트 시작 가이드

## 템플릿 복사
```bash
cp -r _template_settings <새프로젝트명>
cd <새프로젝트명>
npm install
npm run dev
```

## 프로젝트 구조
```
프로젝트명/
├── src/
│   ├── components/    # 재사용 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── hooks/         # 커스텀 훅
│   ├── utils/         # 유틸리티 함수
│   ├── theme.js       # MUI 테마 설정
│   ├── main.jsx       # 엔트리 포인트
│   └── App.jsx        # 루트 컴포넌트
├── public/
├── package.json
└── vite.config.js
```

## 포함된 패키지
- react + react-dom
- react-router-dom
- @mui/material + @emotion/react + @emotion/styled
- @mui/icons-material
- @fontsource/roboto

## 시작 후 할 일
1. App.jsx에서 라우터 설정
2. pages/ 디렉토리에 페이지 추가
3. theme.js에서 색상 커스터마이즈
