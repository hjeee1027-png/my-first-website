import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { allProducts, newArrivalProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import PaymentModal from '../components/PaymentModal'
import { supabase } from '../supabaseClient'
import styles from './CartPage.module.css'

const combined = [...new Map([...newArrivalProducts, ...allProducts].map(p => [p.id, p])).values()]

export default function CartPage() {
  const { cart, removeFromCart, updateCartQty, user, showToast, recentViewed, toggleWishlist, isWished } = useApp()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(() => cart.map(i => i.cartId))
  const [showPayment, setShowPayment] = useState(false)

  const totalPrice = cart
    .filter(i => selected.includes(i.cartId))
    .reduce((sum, i) => sum + i.price * i.qty, 0)

  const delivery = totalPrice >= 50000 ? 0 : 3000

  const toggleSelect = (cartId) => {
    setSelected(prev => prev.includes(cartId)
      ? prev.filter(id => id !== cartId)
      : [...prev, cartId])
  }

  const toggleAll = () => {
    if (selected.length === cart.length) setSelected([])
    else setSelected(cart.map(i => i.cartId))
  }

  const handleCheckoutOpen = () => {
    if (selected.length === 0) { showToast('상품을 선택해주세요.', 'error'); return }
    if (!user) { showToast('로그인이 필요합니다.', 'error'); navigate('/login'); return }
    setShowPayment(true)
  }

  const handlePaymentSuccess = async () => {
    await supabase.from('ms_users').upsert(
      { id: user.id, email: user.email, name: user.user_metadata?.name || null },
      { onConflict: 'id' }
    )

    const selectedItems = cart.filter(i => selected.includes(i.cartId))
    const trackingNumber = 'ZZ' + Date.now()
    const orderData = {
      user_id: user.id,
      total_price: totalPrice + delivery,
      payment_status: 'paid',
      delivery_status: 2,
      tracking_number: trackingNumber,
      items: selectedItems.map(i => ({
        id: i.id, name: i.name, qty: i.qty, price: i.price,
        color: i.color, size: i.size, img: i.img,
      })),
    }

    // localStorage에 먼저 저장 (DB 실패 시에도 주문내역 보장)
    const localOrder = { ...orderData, id: `local_${trackingNumber}`, created_at: new Date().toISOString() }
    const localPrev = JSON.parse(localStorage.getItem('ms_local_orders') || '[]')
    localStorage.setItem('ms_local_orders', JSON.stringify([localOrder, ...localPrev].slice(0, 100)))

    let { error } = await supabase.from('ms_orders').insert(orderData)
    if (error) {
      const { items, ...fallback } = orderData
      const res2 = await supabase.from('ms_orders').insert(fallback)
      if (res2.error) console.warn('주문 DB 저장 실패:', res2.error.message)
    }
    selected.forEach(id => removeFromCart(id))
    setShowPayment(false)
    showToast('결제가 완료되었습니다!')
    navigate('/orders')
  }

  const recommended = combined.filter(p => !cart.find(c => c.id === p.id)).slice(0, 4)

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.pageTitle}>장바구니</h1>
          <div className={styles.empty}>
            <i className="fa-solid fa-bag-shopping"></i>
            <p>장바구니가 비어있습니다.</p>
            <p className={styles.emptySub}>쇼핑을 계속해보세요!</p>
            <Link to="/products" className={styles.shopBtn}>쇼핑 계속하기</Link>
          </div>

          {recommended.length > 0 && (
            <div className={styles.recommend}>
              <h2 className={styles.recTitle}>이런 상품 어떠세요?</h2>
              <div className={styles.recGrid}>
                {recommended.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>장바구니</h1>
          <p className={styles.policy}>
            <i className="fa-solid fa-circle-info"></i>
            장바구니 상품은 30일간 보관 후 자동 삭제됩니다.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.itemsWrap}>
            <div className={styles.tableHeader}>
              <label className={styles.checkLabel}>
                <input type="checkbox"
                  checked={selected.length === cart.length}
                  onChange={toggleAll} />
                전체선택 ({selected.length}/{cart.length})
              </label>
              <button
                onClick={() => selected.forEach(id => removeFromCart(id))}
                className={styles.deleteSelected}
              >
                선택 삭제
              </button>
            </div>

            <ul className={styles.itemList}>
              {cart.map(item => (
                <li key={item.cartId} className={styles.item}>
                  <label className={styles.check}>
                    <input type="checkbox"
                      checked={selected.includes(item.cartId)}
                      onChange={() => toggleSelect(item.cartId)} />
                  </label>
                  <Link to={`/products/${item.id}`} className={styles.itemImg}>
                    <img src={item.img} alt={item.name} />
                  </Link>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemOption}>
                      컬러: {item.color || '-'} / 사이즈: {item.size || '-'}
                    </p>
                    <div className={styles.qtyWrap}>
                      <button onClick={() => updateCartQty(item.cartId, Math.max(1, item.qty - 1))} className={styles.qtyBtn}>−</button>
                      <span className={styles.qty}>{item.qty}</span>
                      <button onClick={() => updateCartQty(item.cartId, item.qty + 1)} className={styles.qtyBtn}>+</button>
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    {(item.price * item.qty).toLocaleString()}원
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} className={styles.deleteBtn}>
                    <img src="/my-first-website/men_suit/images/icons/icon-x__black.png" alt="삭제" width="16" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>주문 요약</h2>
            <div className={styles.summaryRow}>
              <span>상품 금액</span><span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className={styles.summaryRow}>
              <span>배송비</span>
              <span>{delivery === 0 ? '무료' : `${delivery.toLocaleString()}원`}</span>
            </div>
            {delivery > 0 && (
              <p className={styles.freeShipping}>
                {(50000 - totalPrice).toLocaleString()}원 더 담으면 무료배송!
              </p>
            )}
            <div className={styles.summaryDivider}></div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>결제 금액</span>
              <span>{(totalPrice + delivery).toLocaleString()}원</span>
            </div>
            <button onClick={handleCheckoutOpen} className={styles.checkoutBtn}>
              결제하기 ({selected.length}개)
            </button>
            <Link to="/products" className={styles.continueShopping}>쇼핑 계속하기</Link>
          </div>
        </div>

        <div className={styles.recommend}>
          <h2 className={styles.recTitle}>이런 상품 어떠세요?</h2>
          <div className={styles.recGrid}>
            {(recentViewed.length > 0 ? recentViewed : recommended).slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          totalAmount={totalPrice + delivery}
          itemCount={selected.length}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
