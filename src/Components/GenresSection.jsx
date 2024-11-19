import React, { useState } from 'react'
import styles from '../CSS/genres.module.css'
import axios from 'axios';
import Cookies from 'js-cookie';

function GenresSection() {

    const [SelectedGenres, setSelectedGenres] = useState([])

    const [token] = useState(Cookies.get('token') || "")

    const genres = [
        "All",
        "Horror",
        "Action",
        "Drama",
        "Thriller",
        "Science fiction",
        "Comedy",
        "Romance",
        "Adventure",
        "Fantasy",
        "Documentary",
        "Romantic comedy",
        "Musical",
        "Animation",
        "Historical drama",
        "Fiction",
        "Mystery",
        "Noir"
    ]

  const handleSelect = (item)=>{
    const modefiedList = [...SelectedGenres]
    let index = modefiedList.indexOf(item)
    if (index === -1) {
        modefiedList.push(item)
    }else{
        modefiedList.splice(index,1)
    }
    setSelectedGenres(modefiedList)
    console.log(SelectedGenres)
  }  


  const handleClick = ()=>{
    console.log("hi")
    console.log(token)
    axios.get('http://localhost:8080/',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
  }

  return (
    <div className={styles.genresContainer}>
        <h3 onClick={handleClick}>Movie Genres</h3>
        <div className={styles.genresWrapper}>
            {genres.map((item)=>{
               return <button id={SelectedGenres.includes(item)&&styles.selectedGenres} onClick={()=>{handleSelect(item)}}>{item}</button>
            })}
        </div>
    </div>
  )
}

export default GenresSection