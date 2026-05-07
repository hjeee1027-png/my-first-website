import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { newArrivalProducts } from '../data/products'
import styles from './NewArrival.module.css'

const tabFilters = ['ALL', 'OUTER', 'TOP', 'SUIT', 'PANTS', 'SHIRT', 'KNIT']

const categoryMap = {
  ALL: null,
  OUTER: 'OUTER',
  TOP: ['KNIT', 'SHIRT'],
  SUIT: 'SUIT',
  PANTS: 'PANTS',
  SHIRT: 'SHIRT',
  KNIT: 'KNIT',
}

export default function NewArrival() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [activeFilter, setActiveFilter] = useState('ALL')

  const getFiltered = () => {
    const cat = categoryMap[activeFilter]
    if (!cat) return newArrivalProducts
    if (Array.isArray(cat)) return newArrivalProducts.filter(p => cat.includes(p.category))
    return newArrivalProducts.filter(p => p.category === cat)
  }

  const filtered = getFiltered()

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Arrival</h2>
          <div className={styles.tabs}>
            {tabFilters.map((f, i) => (
              <button
                key={f}
                className={`${styles.tab} ${activeFilter === f ? styles.tabActive : ''} ${i === 0 ? styles.tabFirst : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length > 8 && (
          <div className={styles.moreWrap}>
            <button className={styles.moreBtn}>더보기 +</button>
          </div>
        )}
      </div>
    </section>
  )
}
