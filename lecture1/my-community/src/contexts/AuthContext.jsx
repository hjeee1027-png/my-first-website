import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('mynyang_user')
    if (saved) {
      setCurrentUser(JSON.parse(saved))
    }
  }, [])

  const login = (user) => {
    setCurrentUser(user)
    localStorage.setItem('mynyang_user', JSON.stringify(user))
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('mynyang_user')
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
