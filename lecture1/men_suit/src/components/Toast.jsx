import React from 'react'
import styles from './Toast.module.css'

export default function Toast({ message, type = 'success' }) {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <i className={`fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
      <span>{message}</span>
    </div>
  )
}
