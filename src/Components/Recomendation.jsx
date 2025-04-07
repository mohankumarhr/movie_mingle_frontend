import React, { useEffect, useState } from 'react'
import styles from '../CSS/recomendations.module.css'
import MovieCard from './MovieCard'
import axios from 'axios'
import { base_url } from '../data'
import { useNavigate } from 'react-router-dom'
import NoMoviePoster from '../assets/images/NoMoviePoster.png'


function Recomendation() {

  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState([])

  useEffect(()=>{
    async function fetchData() {
      axios
      .get(base_url+"/allmovies")
      .then(responce => setMovieDetails(responce.data))
      .catch(error => console.error(error));
  }
  fetchData()
  },[])
  

  // const moviedetails = [
  //   {
  //       title: "KFG Chapter 1",
  //       url:"https://image.tmdb.org/t/p/w300//ltHlJwvxKv7d0ooCiKSAvfwV9tX.jpg"
  //   },
  //   {
  //       title: "Kantara",
  //       url:"https://image.tmdb.org/t/p/w300//jIsKmkxMzdCZ0Ux1GVSnu8m6Na6.jpg"
  //   }
  // ]   

  const handleClick = (item)=>{
    navigate(`/moviedetails/0/${item.tmdb}/${item.username}`)  
  }


  return (
    <div className={styles.recomendContainer}>
        <div className={styles.recomendWrapper}>
           {movieDetails.map((item)=>{
           return <MovieCard 
            url={item.url != null? `https://image.tmdb.org/t/p/w300/${item.url}`:NoMoviePoster}
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