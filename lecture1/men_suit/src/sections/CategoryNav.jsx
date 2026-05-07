import React from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryIcons } from '../data/products'
import styles from './CategoryNav.module.css'

export default function CategoryNav() {
  const navigate = useNavigate()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ul className={styles.list}>
          {categoryIcons.map((cat) => (
            <li
              key={cat.id}
              className={styles.item}
              onClick={() => navigate(`/products?category=${cat.id}`)}
            >
              <div className={styles.iconWrap}>
                <img src={cat.img} alt={cat.label} className={styles.icon} />
              </div>
              <span className={styles.label}>{cat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
