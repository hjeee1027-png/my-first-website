import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const BASE = '/my-first-website/men_suit/images'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src={`${BASE}/icons/site-brand__dimmed.png`} alt="ZIOZIA" width="140" />
            <p className={styles.brandDesc}>
              절제된 실루엣과 미니멀한 디자인으로<br />
              비즈니스와 캐주얼의 경계를 허무는 브랜드
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>CUSTOMER</h4>
              <ul>
                <li><Link to="#">공지사항</Link></li>
                <li><Link to="#">FAQ</Link></li>
                <li><Link to="#">1:1 문의</Link></li>
                <li><Link to="#">반품/교환 신청</Link></li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h4>BRAND</h4>
              <ul>
                <li><Link to="#">브랜드 스토리</Link></li>
                <li><Link to="#">매장 찾기</Link></li>
                <li><Link to="#">룩북</Link></li>
                <li><Link to="#">채용 정보</Link></li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h4>MY PAGE</h4>
              <ul>
                <li><Link to="/mypage">주문/배송조회</Link></li>
                <li><Link to="/mypage">찜목록</Link></li>
                <li><Link to="/mypage">포인트</Link></li>
                <li><Link to="/mypage">쿠폰</Link></li>
              </ul>
            </div>
          </div>

          <div className={styles.social}>
            <h4>FOLLOW US</h4>
            <div className={styles.socialIcons}>
              <a href="#" target="_blank" rel="noreferrer">
                <img src={`${BASE}/icons/icon-footer-instagram.png`} alt="Instagram" width="28" />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <img src={`${BASE}/icons/icon-footer-youtube.png`} alt="YouTube" width="28" />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <img src={`${BASE}/icons/icon-footer-kakaoch.png`} alt="KakaoChannel" width="28" />
              </a>
            </div>
            <div className={styles.csInfo}>
              <p className={styles.csTitle}>고객센터</p>
              <p className={styles.csTel}>1544-0000</p>
              <p className={styles.csHours}>평일 09:00 ~ 18:00 (주말·공휴일 휴무)</p>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <div className={styles.companyInfo}>
            <p>상호: (주)지오지아 | 대표이사: 홍길동 | 사업자등록번호: 123-45-67890</p>
            <p>주소: 서울특별시 강남구 테헤란로 123, ZIOZIA 빌딩</p>
            <p>통신판매업신고번호: 제2024-서울강남-1234호 | 개인정보보호책임자: 김개인</p>
          </div>
          <div className={styles.copyright}>
            <p>© 2026 ZIOZIA. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
