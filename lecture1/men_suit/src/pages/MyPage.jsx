import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { supabase } from '../supabaseClient'
import ProductCard from '../components/ProductCard'
import styles from './MyPage.module.css'

const BASE = '/my-first-website/men_suit/images'

const statusLabels = ['결제완료', '상품준비중', '배송준비중', '배송중', '배송완료']
const statusIcons = ['fa-credit-card', 'fa-box', 'fa-warehouse', 'fa-truck', 'fa-circle-check']

const menuGroups = [
  { label: '나의 주문', items: ['주문/배송 조회', '취소/반품/교환 조회'] },
  { label: '나의 활동', items: ['찜목록', '최근 본 상품', '작성 가능한 리뷰', '작성한 리뷰'] },
  { label: '나의 문의', items: ['1:1 문의', 'FAQ'] },
  { label: '계정 관리', items: ['회원정보 수정', '비밀번호 변경', '로그아웃'] },
]

export default function MyPage() {
  const { user, cart, wishlist, recentViewed, showToast, setUser } = useApp()
  const [orders, setOrders] = useState([])
  const [activeMenu, setActiveMenu] = useState('주문/배송 조회')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    const allLocal = JSON.parse(localStorage.getItem('ms_local_orders') || '[]')
    const localOrders = allLocal.filter(o => o.user_id === user.id)
    supabase.from('ms_orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        const dbOrders = data || []
        const dbTrackingNums = new Set(dbOrders.map(o => o.tracking_number))
        const localOnly = localOrders.filter(o => !dbTrackingNums.has(o.tracking_number))
        const combined = [...dbOrders, ...localOnly].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setOrders(combined)
      })
  }, [user])

  if (!user) {
    return (
      <div className={styles.loginRequired}>
        <i className="fa-regular fa-user"></i>
        <p>로그인이 필요합니다.</p>
        <Link to="/login" className={styles.loginBtn}>로그인</Link>
      </div>
    )
  }

  const statusCounts = [0, 1, 2, 3, 4].map(status =>
    orders.filter(o => o.delivery_status === status).length
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    showToast('로그아웃 되었습니다.')
    navigate('/')
  }

  const handleMenuClick = (item) => {
    if (item === '로그아웃') { handleLogout(); return }
    if (item === '주문/배송 조회') { navigate('/orders'); return }
    setActiveMenu(item)
  }

  const renderContent = () => {
    if (activeMenu === '찜목록') {
      return (
        <div className={styles.wishSection}>
          {wishlist.length === 0 ? (
            <div className={styles.emptySection}>
              <i className="fa-regular fa-heart"></i>
              <p>찜한 상품이 없습니다.</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      )
    }
    if (activeMenu === '최근 본 상품') {
      return (
        <div className={styles.recentSection}>
          {recentViewed.length === 0 ? (
            <div className={styles.emptySection}>
              <i className="fa-regular fa-clock"></i>
              <p>최근 본 상품이 없습니다.</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {recentViewed.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      )
    }
    return (
      <div className={styles.comingSoon}>
        <i className="fa-solid fa-clock-rotate-left"></i>
        <p>준비 중인 기능입니다.</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* 프로필 상단 */}
        <div className={styles.profileCard}>
          <div className={styles.profileLeft}>
            <img src={`${BASE}/icons/img_profile.png`} alt="프로필" className={styles.avatar} />
            <div className={styles.profileInfo}>
              <div className={styles.levelBadge}>
                <img src={`${BASE}/icons/icon-level-welcome.png`} alt="레벨" width="18" />
                <span>WELCOME</span>
              </div>
              <p className={styles.profileName}>{user.user_metadata?.name || user.email?.split('@')[0] || '회원'}님</p>
              <p className={styles.profileEmail}>{user.email}</p>
            </div>
          </div>
          <div className={styles.profileStats}>
            {[
              { label: '포인트', value: '0P', icon: `${BASE}/icons/icon-my-point.png` },
              { label: '쿠폰', value: '0장', icon: `${BASE}/icons/icon-my-coupon.png` },
              { label: '찜목록', value: `${wishlist.length}개`, icon: `${BASE}/icons/icon-my-club.png` },
              { label: '리뷰', value: '0개', icon: `${BASE}/icons/icon-my-review.png` },
            ].map(stat => (
              <div key={stat.label} className={styles.stat}>
                <img src={stat.icon} alt={stat.label} width="28" />
                <p className={styles.statVal}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 주문 현황 */}
        <div className={styles.orderStatus}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>주문/배송 현황</h2>
            <Link to="/orders" className={styles.viewAll}>전체보기 <i className="fa-solid fa-chevron-right"></i></Link>
          </div>
          <div className={styles.statusBar}>
            {statusLabels.map((label, i) => (
              <React.Fragment key={label}>
                <div className={styles.statusStep}>
                  <div className={`${styles.statusIcon} ${statusCounts[i] > 0 ? (i === 0 ? styles.statusActivePoint : styles.statusActive) : ''}`}>
                    <i className={`fa-solid ${statusIcons[i]}`}></i>
                    {statusCounts[i] > 0 && <span className={styles.statusBadge}>{statusCounts[i]}</span>}
                  </div>
                  <p className={styles.statusLabel}>{label}</p>
                </div>
                {i < statusLabels.length - 1 && (
                  <div className={styles.statusArrow}><i className="fa-solid fa-chevron-right"></i></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 최근 주문 */}
        {orders.length > 0 && (
          <div className={styles.recentOrder}>
            <h3 className={styles.recentOrderTitle}>최근 주문</h3>
            {orders.slice(0, 2).map(order => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderInfo}>
                  <span className={styles.orderId}>주문번호: {order.tracking_number}</span>
                  <span className={styles.orderDate}>{new Date(order.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
                <div className={styles.orderDetail}>
                  <span className={styles.orderPrice}>{order.total_price?.toLocaleString()}원</span>
                  <span className={styles.orderStatusLabel}>{statusLabels[order.delivery_status]}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 최근 본 상품 */}
        {recentViewed.length > 0 && (
          <div className={styles.recentProducts}>
            <h3 className={styles.recentProductsTitle}>최근 본 상품</h3>
            <div className={styles.recentGrid}>
              {recentViewed.slice(0, 3).map(p => (
                <Link to={`/products/${p.id}`} key={p.id} className={styles.recentProductCard}>
                  <img src={p.img} alt={p.name} />
                  <p className={styles.recentProductName}>{p.name}</p>
                  <p className={styles.recentProductPrice}>{p.price?.toLocaleString()}원</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div className={styles.main}>
          <aside className={styles.lnb}>
            {menuGroups.map(group => (
              <div key={group.label} className={styles.menuGroup}>
                <h3 className={styles.menuGroupTitle}>{group.label}</h3>
                <ul className={styles.menuList}>
                  {group.items.map(item => (
                    <li key={item}>
                      <button
                        className={`${styles.menuItem} ${activeMenu === item ? styles.menuActive : ''}`}
                        onClick={() => handleMenuClick(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          <div className={styles.content}>
            <h2 className={styles.contentTitle}>{activeMenu}</h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
