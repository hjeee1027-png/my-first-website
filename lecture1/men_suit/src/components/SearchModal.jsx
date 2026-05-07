import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { popularKeywords } from '../data/products'
import styles from './SearchModal.module.css'

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('')
  const [recent, setRecent] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ms_search_recent') || '[]')
    setRecent(saved)
    setTimeout(() => inputRef.current?.focus(), 100)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const doSearch = (kw) => {
    if (!kw.trim()) return
    const savedRaw = JSON.parse(localStorage.getItem('ms_search_recent') || '[]')
    const allSearches = JSON.parse(localStorage.getItem('ms_search_all') || '{}')
    allSearches[kw] = (allSearches[kw] || 0) + 1
    localStorage.setItem('ms_search_all', JSON.stringify(allSearches))
    const updated = [kw, ...savedRaw.filter(k => k !== kw)].slice(0, 10)
    localStorage.setItem('ms_search_recent', JSON.stringify(updated))
    onClose()
    navigate(`/products?q=${encodeURIComponent(kw)}`)
  }

  const deleteRecent = (kw, e) => {
    e.stopPropagation()
    const updated = recent.filter(k => k !== kw)
    setRecent(updated)
    localStorage.setItem('ms_search_recent', JSON.stringify(updated))
  }

  const clearAll = () => {
    setRecent([])
    localStorage.removeItem('ms_search_recent')
  }

  const allSearches = JSON.parse(localStorage.getItem('ms_search_all') || '{}')
  const topSearches = Object.entries(allSearches)
    .sort(([,a],[,b]) => b - a)
    .filter(([,cnt]) => cnt >= 1)
    .slice(0, 8)
    .map(([kw]) => kw)
  const popularList = topSearches.length >= 3 ? topSearches : popularKeywords

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.searchBar}>
          <input
            ref={inputRef}
            type="text"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch(query)}
            className={styles.input}
          />
          <button onClick={() => doSearch(query)} className={styles.searchBtn}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button onClick={onClose} className={styles.closeBtn}>
            <img src="/my-first-website/men_suit/images/icons/icon-x__black.png" alt="닫기" width="20" />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.col}>
            <div className={styles.colHeader}>
              <h4>최근 검색어</h4>
              {recent.length > 0 && <button onClick={clearAll} className={styles.clearBtn}>전체 삭제</button>}
            </div>
            {recent.length === 0 ? (
              <p className={styles.empty}>최근 검색어가 없습니다.</p>
            ) : (
              <ul className={styles.list}>
                {recent.map(kw => (
                  <li key={kw} onClick={() => doSearch(kw)} className={styles.listItem}>
                    <i className="fa-regular fa-clock"></i>
                    <span>{kw}</span>
                    <button onClick={e => deleteRecent(kw, e)} className={styles.delBtn}>
                      <img src="/my-first-website/men_suit/images/icons/icon-x__black.png" alt="삭제" width="12" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.col}>
            <div className={styles.colHeader}>
              <h4>인기 검색어</h4>
            </div>
            <ul className={styles.list}>
              {popularList.map((kw, i) => (
                <li key={kw} onClick={() => doSearch(kw)} className={styles.listItem}>
                  <span className={`${styles.rank} ${i < 3 ? styles.rankTop : ''}`}>{i + 1}</span>
                  <span>{kw}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
