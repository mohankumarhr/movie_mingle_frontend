import React from 'react'
import loader from '../assets/loding.gif'
import styles from '../CSS/loader.module.css'

function Loader() {
  return (
    <div className={styles.loaderContainer}>
        <div className={styles.loaderWrapper}>
            <img src={loader} alt=''></img>
        </div>
    </div>
  )
}

export default Loader