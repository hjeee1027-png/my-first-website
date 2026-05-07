import React from 'react'
import { Link } from 'react-router-dom'
import { mdPickData } from '../data/products'
import { useApp } from '../App'
import styles from './MDPick.module.css'

export default function MDPick() {
  const { toggleWishlist, isWished, addToCart } = useApp()

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.mainImg}>
            <img src={mdPickData.mainImg} alt="MD PICK 메인" />
          </div>

          <div className={styles.right}>
            <div className={styles.textBlock}>
              <p className={styles.sub}>EDITOR'S CHOICE</p>
              <h2 className={styles.title}>{mdPickData.title}</h2>
              <p className={styles.desc}>{mdPickData.sub}</p>
            </div>

            <ul className={styles.itemList}>
              {mdPickData.items.map(item => (
                <li key={item.id} className={styles.item}>
                  <Link to={`/products/${item.id}`} className={styles.itemImg}>
                    <img src={item.img} alt={item.name} />
                  </Link>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>{item.price.toLocaleString()}원</p>
                  </div>
                  <div className={styles.itemActions}>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className={`${styles.actionBtn} ${isWished(item.id) ? styles.wished : ''}`}
                    >
                      <i className={`${isWished(item.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                    </button>
                    <button onClick={() => addToCart(item)} className={styles.cartBtn}>
                      <i className="fa-solid fa-bag-shopping"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/products" className={styles.viewAll}>
              전체 보기 <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
