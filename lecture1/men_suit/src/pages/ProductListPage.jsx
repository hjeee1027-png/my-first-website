import React, { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { allProducts, newArrivalProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useApp } from '../App'
import styles from './ProductListPage.module.css'

const sortOptions = [
  { value: 'new', label: '신상품순' },
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
  { value: 'discount', label: '할인율순' },
]

const filterOptions = ['ALL', 'OUTER', 'SUIT', 'SHIRT', 'KNIT', 'PANTS', 'ACC']

export default function ProductListPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'ALL'

  const [sort, setSort] = useState('new')
  const [filter, setFilter] = useState(category !== 'ALL' && category !== 'NEW' && category !== 'BEST' && category !== 'SALE' ? category : 'ALL')

  const combined = [...new Map([...newArrivalProducts, ...allProducts].map(p => [p.id, p])).values()]

  const filtered = useMemo(() => {
    let list = combined
    if (query) {
      list = list.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    }
    if (category === 'SALE') {
      list = list.filter(p => p.discount > 0)
    }
    if (filter !== 'ALL') {
      list = list.filter(p => p.category === filter)
    }
    switch (sort) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price)
      case 'discount': return [...list].sort((a, b) => b.discount - a.discount)
      default: return list
    }
  }, [query, category, filter, sort])

  const pageTitle = query ? `"${query}" 검색 결과` : category !== 'ALL' ? category : '전체 상품'

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{pageTitle}</h1>
          <p className={styles.count}>{filtered.length}개 상품</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            {filterOptions.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={styles.sortWrap}>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <i className="fa-regular fa-face-frown"></i>
            <p>검색 결과가 없습니다.</p>
            <p className={styles.emptySub}>다른 키워드로 검색해보세요.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
