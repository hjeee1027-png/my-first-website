import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import PopupConsent from './components/PopupConsent'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'
import ReservationPage from './pages/ReservationPage'
import ShowroomPage from './pages/ShowroomPage'
import MyPage from './pages/MyPage'
import BrandPage from './pages/BrandPage'
import EventPage from './pages/EventPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import { Box } from '@mui/material'

export default function App() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('vantage_popup_dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => setShowPopup(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handlePopupClose = (neverShow) => {
    setShowPopup(false)
    if (neverShow) localStorage.setItem('vantage_popup_dismissed', 'true')
  }

  return (
    <BrowserRouter basename="/my-first-website/suv_car_site">
      <Box sx={{ minHeight: '100vh', bgcolor: '#0B0B0B', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/showroom" element={<ShowroomPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
          </Routes>
        </Box>
        <Footer />
        {showPopup && <PopupConsent onClose={handlePopupClose} />}
      </Box>
    </BrowserRouter>
  )
}
