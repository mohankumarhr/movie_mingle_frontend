import React from 'react'
import styles from '../CSS/movieCard.module.css'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function MovieCard(props) {
  return (
    <div  className={styles.moviecardContainer}>
        <div className={styles.moviecardWrapper}>
            <div onClick={()=>{props.handleClick(props.details)}} className={styles.imageConatiner}>
                <img src={props.url} alt="" />
            </div>
            <div className={styles.cardTitle}>
                <p onClick={()=>{props.handleClick(props.details)}}>{props.title}</p>
                <div onClick={()=>{props.handleLike(props.details)}} className={styles.likeBtn}>
                  {!props.liked ? <FavoriteBorderOutlinedIcon  className={styles.heartIcon}/>:
                  <FavoriteOutlinedIcon className={styles.likedHeartIcon}/>
                  }
                  {props.totallike}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard