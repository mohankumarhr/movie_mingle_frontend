import React from 'react'
import styles from '../CSS/movieCard.module.css'

function MovieCard(props) {
  return (
    <div onClick={()=>{props.handleClick(props.details)}} className={styles.moviecardContainer}>
        <div className={styles.moviecardWrapper}>
            <div className={styles.imageConatiner}>
                <img src={props.url} alt="" />
            </div>
            <div className={styles.cardTitle}>
                <p>{props.title}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard