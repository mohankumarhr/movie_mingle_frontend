import React, { useState } from 'react'
import styles from '../CSS/genres.module.css'



function GenresSection() {

    const [SelectedGenres, setSelectedGenres] = useState([])

    

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


 

  return (
    <div className={styles.genresContainer}>
        <h3>Movie Genres</h3>
        <div className={styles.genresWrapper}>
            {genres.map((item)=>{
               return <button id={SelectedGenres.includes(item)&&styles.selectedGenres} onClick={()=>{handleSelect(item)}}>{item}</button>
            })}
        </div>
    </div>
  )
}

export default GenresSection