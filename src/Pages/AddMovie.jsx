import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import SearchSection from '../Components/SearchSection'
import axios from 'axios'
import MovieCard from '../Components/MovieCard'
import styles from '../CSS/addMovies.module.css'

function AddMovie() {

  const [serchText, setSearchText] = useState("")

  const [searchResult, setSearchResult] = useState([])

  const changeSearchText = (value)=>{
    setSearchText(value);
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {query: serchText, include_adult: 'false', language: 'en-US', page: '1'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjQ4NTcyYWUzOTUxODBlOTdlN2JhODFkNzZmODAwNiIsIm5iZiI6MTczMTk5NzQ1OS4xOTIzMTU4LCJzdWIiOiI2NThhZTZhNjRkYTNkNDY2NDQ0MTJhNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3RAf8ycJ00SRTGbSo3mNIT91yE1ZdlusVTs8whmp-dM'
      }
    };
    
    axios
      .request(options)
      .then((res)=>{
        return (setSearchResult(res.data.results),
        console.log(res.data) )
      })
      .catch(err => console.error(err));
    
  }, [serchText])
  

  const handleClick = (item)=>{
    console.log(item)
  }

  return (
    <div>
      <NavBar />
      <SearchSection 
        handleText = {changeSearchText}
      />
     {searchResult.length !== 0&&<div className={styles.addMovieContainer}>
       {searchResult.map((item)=>{
          return <MovieCard 
          title = {item.title}
          url = {item.poster_path != null? `https://image.tmdb.org/t/p/w300${item.poster_path}`:"https://image.tmdb.org/t/p/w300/43ZvmTzIJ0tTzgLG8sDOfg9roLF.jpg"}
          handleClick = {handleClick}
          details = {item}
          />
       })
       }
      </div>}
      {searchResult.length === 0 && <p>No movies found</p>}
    </div>
  )
}

export default AddMovie