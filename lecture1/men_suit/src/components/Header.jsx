import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { supabase } from '../supabaseClient'
import SearchModal from './SearchModal'
import styles from './Header.module.css'

const BASE = '/my-first-website/men_suit/images'

const navItems = [
  { label: 'NEW', path: '/products?category=NEW' },
  { label: 'BEST', path: '/products?category=BEST' },
  { label: 'SUIT', path: '/products?category=SUIT' },
  { label: 'OUTER', path: '/products?category=OUTER' },
  { label: 'TOP', path: '/products?category=TOP' },
  { label: 'PANTS', path: '/products?category=PANTS' },
  { label: 'ACC', path: '/products?category=ACC' },
  { label: 'SALE', path: '/products?category=SALE' },
]

export default function Header() {
  const { user, cart, setUser, showToast } = useApp()
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    showToast('로그아웃 되었습니다.')
    navigate('/')
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.topBar}>
          <div className={styles.inner}>
            <nav className={styles.topNav}>
              <span>MEMBER</span>
              <span>STORE</span>
              <span>CS CENTER</span>
            </nav>
          </div>
        </div>

        <div className={styles.mainBar}>
          <div className={styles.inner}>
            <Link to="/" className={styles.logo}>
              <img src={`${BASE}/icons/site-brand.png`} alt="ZIOZIA" width="185" height="27" />
            </Link>

            <nav className={styles.gnb}>
              {navItems.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`${styles.gnbItem} ${i === 0 ? styles.gnbFirst : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.utils}>
              <button onClick={() => setSearchOpen(true)} className={styles.utilBtn} title="검색">
                <img src={`${BASE}/icons/icon-header-search__black.png`} alt="검색" width="24" height="24" />
              </button>
              <Link to="/mypage" className={styles.utilBtn} title="마이페이지">
                <img src={`${BASE}/icons/icon-header-account__black.png`} alt="마이페이지" width="24" height="24" />
              </Link>
              <Link to="/cart" className={styles.utilBtn} title="장바구니">
                <span className={styles.cartWrap}>
                  <img src={`${BASE}/icons/icon-header-bag__black.png`} alt="장바구니" width="24" height="24" />
                  {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                </span>
              </Link>
              {user ? (
                <button onClick={handleLogout} className={styles.utilBtn} title="로그아웃">
                  <img src={`${BASE}/icons/icon-header-signout__black.png`} alt="로그아웃" width="24" height="24" />
                </button>
              ) : (
                <Link to="/login" className={styles.loginLink}>LOGIN</Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={styles.headerSpacer} />

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  )
}
