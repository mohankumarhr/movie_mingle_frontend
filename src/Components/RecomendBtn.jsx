import React from 'react'
import styles from '../CSS/recomendbth.module.css'
import { Link } from 'react-router-dom'

function RecomendBtn() {
  return (
    <div className={styles.RecomendBtnContainer}>
        <Link to={"/recomend"}>Recomend</Link>
    </div>
  )
}

export default RecomendBtn