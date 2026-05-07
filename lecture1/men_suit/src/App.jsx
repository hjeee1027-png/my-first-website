import React, { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import MyPage from './pages/MyPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import { supabase } from './supabaseClient'

export const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

export default function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [toast, setToast] = useState(null)
  const [recentViewed, setRecentViewed] = useState([])
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('ms_cart')
    if (saved) setCart(JSON.parse(saved))
    const savedWish = localStorage.getItem('ms_wish')
    if (savedWish) setWishlist(JSON.parse(savedWish))
    const savedRecent = localStorage.getItem('ms_recent')
    if (savedRecent) setRecentViewed(JSON.parse(savedRecent))
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const addToCart = (product, options = {}) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id && i.color === options.color && i.size === options.size)
      let next
      if (exists) {
        next = prev.map(i => i.id === product.id && i.color === options.color && i.size === options.size
          ? { ...i, qty: i.qty + (options.qty || 1) } : i)
      } else {
        next = [...prev, { ...product, ...options, qty: options.qty || 1, cartId: Date.now() }]
      }
      localStorage.setItem('ms_cart', JSON.stringify(next))
      return next
    })
    showToast('장바구니에 담았습니다.')
  }

  const removeFromCart = (cartId) => {
    setCart(prev => {
      const next = prev.filter(i => i.cartId !== cartId)
      localStorage.setItem('ms_cart', JSON.stringify(next))
      return next
    })
  }

  const updateCartQty = (cartId, qty) => {
    setCart(prev => {
      const next = prev.map(i => i.cartId === cartId ? { ...i, qty } : i)
      localStorage.setItem('ms_cart', JSON.stringify(next))
      return next
    })
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id)
      const next = exists ? prev.filter(i => i.id !== product.id) : [...prev, product]
      localStorage.setItem('ms_wish', JSON.stringify(next))
      if (!exists) {
        showToast('찜목록에 추가했습니다.', 'success')
        if (user) {
          supabase.from('ms_wishlist').insert({ user_id: user.id, product_id: product.id }).then(() => {})
          supabase.from('ms_products').update({ wish_count: (product.wish_count || 0) + 1 }).eq('id', product.id).then(() => {})
        }
      }
      return next
    })
  }

  const isWished = (id) => wishlist.some(i => i.id === id)

  const addRecentViewed = (product) => {
    setRecentViewed(prev => {
      const filtered = prev.filter(i => i.id !== product.id)
      const next = [product, ...filtered].slice(0, 10)
      localStorage.setItem('ms_recent', JSON.stringify(next))
      return next
    })
  }

  const logEvent = async (eventType, targetId, metadata = {}) => {
    if (!user) return
    try {
      await supabase.from('ms_user_logs').insert({
        user_id: user.id,
        event_type: eventType,
        target_id: String(targetId),
        metadata
      })
    } catch (_) {}
  }

  const noHeaderFooterPaths = []
  const hideFooter = noHeaderFooterPaths.includes(location.pathname)

  return (
    <AppContext.Provider value={{
      user, setUser, cart, addToCart, removeFromCart, updateCartQty,
      wishlist, toggleWishlist, isWished,
      recentViewed, addRecentViewed,
      showToast, logEvent
    }}>
      <Header />
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </AppContext.Provider>
  )
}
