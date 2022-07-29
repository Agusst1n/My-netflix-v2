import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loading}>
        <FaSpinner size={45} className={styles.spinner}/>
    </div>
  )
}

export default Loading