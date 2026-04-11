import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PostListPage from './pages/PostListPage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<PrivateRoute><PostListPage /></PrivateRoute>} />
      <Route path="/post/:id" element={<PrivateRoute><PostDetailPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
