import React from 'react'
import styles from '../CSS/recomendations.module.css'
import MovieCard from './MovieCard'

function Recomendation() {

  const moviedetails = [
    {
        title: "KFG Chapter 1",
        url:"https://image.tmdb.org/t/p/w300//ltHlJwvxKv7d0ooCiKSAvfwV9tX.jpg"
    },
    {
        title: "Kantara",
        url:"https://image.tmdb.org/t/p/w300//jIsKmkxMzdCZ0Ux1GVSnu8m6Na6.jpg"
    }
  ]   

  const handleClick = (item)=>{
    console.log("in side recomendation",item)
  }


  return (
    <div className={styles.recomendContainer}>
        <div className={styles.recomendWrapper}>
           {moviedetails.map((item)=>{
           return <MovieCard 
            url={item.url}
            title = {item.title}
            handleClick = {handleClick}
            details = {item}
        />
           })}
        </div>
    </div>
  )
}

export default Recomendation