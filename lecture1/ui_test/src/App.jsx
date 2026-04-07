import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import '@fontsource/roboto'
import './styles/global.css'

// ✅ 섹션 임포트 목록 (순차적으로 추가)
import Section01 from './components/sections/Section01'
import Section02 from './components/sections/Section02'
import Section03 from './components/sections/Section03'
import Section04 from './components/sections/Section04'
import Section05 from './components/sections/Section05'
import Section06 from './components/sections/Section06'
import Section07 from './components/sections/Section07'
import Section08 from './components/sections/Section08'
import Section09 from './components/sections/Section09'
import Section10 from './components/sections/Section10'
import Section11 from './components/sections/Section11'
import Section12 from './components/sections/Section12'
import Section13 from './components/sections/Section13'
import Section14 from './components/sections/Section14'
import Section15 from './components/sections/Section15'
import Section16 from './components/sections/Section16'
import Section17 from './components/sections/Section17'

const App = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          UI 컴포넌트 테스트
        </Typography>

        {/* ✅ 섹션을 아래에 순서대로 추가 */}
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
        <Section06 />
        <Section07 />
        <Section08 />
        <Section09 />
        <Section10 />
        <Section11 />
        <Section12 />
        <Section13 />
        <Section14 />
        <Section15 />
        <Section16 />
        <Section17 />

      </Container>
    </Box>
  )
}

export default App
