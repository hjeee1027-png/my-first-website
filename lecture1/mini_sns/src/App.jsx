import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import PostListPage from './pages/PostListPage'
import PostDetailPage from './pages/PostDetailPage'
import PostWritePage from './pages/PostWritePage'
import MyPage from './pages/MyPage'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress sx={{ color: '#427AB5' }} />
    </Box>
  )
  return user ? children : <Navigate to="/login" replace />
}

const AppRoutes = () => {
  const { user, loading } = useAuth()
  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress sx={{ color: '#427AB5' }} />
    </Box>
  )
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><Layout><MainPage /></Layout></ProtectedRoute>} />
      <Route path="/posts" element={<ProtectedRoute><Layout><PostListPage /></Layout></ProtectedRoute>} />
      <Route path="/posts/write" element={<ProtectedRoute><Layout><PostWritePage /></Layout></ProtectedRoute>} />
      <Route path="/posts/:id" element={<ProtectedRoute><Layout><PostDetailPage /></Layout></ProtectedRoute>} />
      <Route path="/mypage" element={<ProtectedRoute><Layout><MyPage /></Layout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter basename="/my-first-website/mini_sns">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
