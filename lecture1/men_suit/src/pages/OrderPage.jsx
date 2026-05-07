import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { supabase } from '../supabaseClient'
import styles from './OrderPage.module.css'

const statusLabels = ['결제완료', '상품준비중', '배송준비중', '배송중', '배송완료']
const statusIcons = ['fa-credit-card', 'fa-box', 'fa-warehouse', 'fa-truck', 'fa-circle-check']

const periodFilters = ['전체', '3개월', '6개월']

const BASE = '/my-first-website/men_suit/images'

export default function OrderPage() {
  const { user, showToast } = useApp()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [period, setPeriod] = useState('전체')
  const [loading, setLoading] = useState(true)

  // 주문 목록 조회
  useEffect(() => {
    if (!user) return
    setLoading(true)
    let query = supabase.from('ms_orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

    const now = new Date()
    if (period === '3개월') {
      const d = new Date(now); d.setMonth(d.getMonth() - 3)
      query = query.gte('created_at', d.toISOString())
    } else if (period === '6개월') {
      const d = new Date(now); d.setMonth(d.getMonth() - 6)
      query = query.gte('created_at', d.toISOString())
    }

    query.then(({ data }) => {
      if (data) setOrders(data)
      setLoading(false)
    })
  }, [user, period])

  // 실시간 구독: ms_orders 변경 구독
  useEffect(() => {
    if (!user) return
    const channel = supabase
      .channel('ms_orders_changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'ms_orders',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o))
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [user])

  const handleReturnExchange = () => {
    alert('고객센터(1544-0000)로 문의해주세요.\n\n무료 반품/교환: 수령 후 7일 이내\n환불 처리: 3~5 영업일 소요')
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('주문을 취소하시겠습니까?\n취소 후에는 되돌릴 수 없습니다.')) return
    const { error } = await supabase
      .from('ms_orders')
      .update({ payment_status: 'refunded' })
      .eq('id', orderId)
    if (error) {
      showToast('주문 취소 중 오류가 발생했습니다.', 'error')
      return
    }
    showToast('주문이 취소되었습니다.')
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }

  if (!user) {
    return (
      <div className={styles.loginRequired}>
        <p>로그인이 필요합니다.</p>
        <Link to="/login" className={styles.loginBtn}>로그인</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>주문/배송 조회</h1>
            {!loading && (
              <span className={styles.orderCount}>총 {orders.length}건</span>
            )}
          </div>
          <div className={styles.periodFilters}>
            {periodFilters.map(p => (
              <button
                key={p}
                className={`${styles.periodBtn} ${period === p ? styles.periodActive : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>주문 내역을 불러오는 중...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className={styles.empty}>
            <i className="fa-solid fa-box-open"></i>
            <p>주문 내역이 없습니다.</p>
            <Link to="/products" className={styles.shopBtn}>쇼핑하러 가기</Link>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.map(order => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderMeta}>
                  <div className={styles.orderMetaLeft}>
                    <span className={styles.orderDate}>
                      {new Date(order.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className={styles.orderId}>주문번호: {order.tracking_number}</span>
                  </div>
                  <span className={styles.orderPrice}>{order.total_price?.toLocaleString()}원</span>
                </div>

                {/* 주문 상품 정보 */}
                {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                  <div className={styles.orderItemList}>
                    {order.items.map((item, idx) => (
                      <div key={idx} className={styles.orderItem}>
                        {item.img && (
                          <img
                            src={item.img}
                            alt={item.name}
                            className={styles.orderItemImg}
                          />
                        )}
                        <span>{item.name}</span>
                        {item.color && <span className={styles.orderItemOption}>{item.color}</span>}
                        {item.size && <span className={styles.orderItemOption}>{item.size}</span>}
                        <span className={styles.orderItemQty}>×{item.qty}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step Bar */}
                <div className={styles.stepBar}>
                  {statusLabels.map((label, i) => (
                    <React.Fragment key={label}>
                      <div className={`${styles.step} ${i <= order.delivery_status ? styles.stepDone : ''} ${i === order.delivery_status ? styles.stepCurrent : ''}`}>
                        <div className={styles.stepIcon}>
                          <i className={`fa-solid ${statusIcons[i]}`}></i>
                        </div>
                        <p className={styles.stepLabel}>{label}</p>
                      </div>
                      {i < statusLabels.length - 1 && (
                        <div className={`${styles.stepLine} ${i < order.delivery_status ? styles.stepLineDone : ''}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* 배송준비중(2): 예상 배송일 */}
                {order.delivery_status === 2 && (() => {
                  const d = new Date(order.created_at)
                  d.setDate(d.getDate() + 2)
                  const dateStr = d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
                  return (
                    <div className={styles.estimatedDelivery}>
                      <i className="fa-solid fa-calendar-days"></i>
                      <span>예상 배송일: <strong className={styles.estimatedHighlight}>{dateStr}</strong></span>
                    </div>
                  )
                })()}

                {/* 배송중: 운송장 번호 강조 표시 */}
                {order.delivery_status === 3 && order.tracking_number && (
                  <div className={styles.trackingInfo}>
                    <i className="fa-solid fa-truck-fast"></i>
                    <span>송장번호: <strong className={styles.trackingHighlight}>{order.tracking_number}</strong></span>
                    <button className={styles.trackBtn}>배송조회</button>
                  </div>
                )}

                {/* 배송중이 아닌 경우 일반 운송장 표시 */}
                {order.delivery_status !== 3 && order.tracking_number && order.delivery_status > 0 && (
                  <div className={styles.trackingInfo}>
                    <i className="fa-solid fa-truck-fast"></i>
                    <span>송장번호: <strong>{order.tracking_number}</strong></span>
                    <button className={styles.trackBtn}>배송조회</button>
                  </div>
                )}

                {/* 결제완료(0): 주문취소 버튼 */}
                {order.delivery_status === 0 && order.payment_status !== 'refunded' && (
                  <div className={styles.returnWrap}>
                    <button className={styles.cancelBtn} onClick={() => handleCancelOrder(order.id)}>
                      주문 취소
                    </button>
                  </div>
                )}

                {/* 취소된 주문 표시 */}
                {order.payment_status === 'refunded' && (
                  <div className={styles.canceledBadge}>
                    <i className="fa-solid fa-ban"></i> 주문 취소 완료
                  </div>
                )}

                {/* 배송완료(4): 반품/교환/환불 버튼 */}
                {order.delivery_status === 4 && order.payment_status !== 'refunded' && (
                  <div className={styles.returnWrap}>
                    <button className={styles.returnBtn} onClick={handleReturnExchange}>
                      반품 / 교환 / 환불 신청
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
