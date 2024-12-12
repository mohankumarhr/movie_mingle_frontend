import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import SearchSection from '../Components/SearchSection'
import axios from 'axios'
import MovieCard from '../Components/MovieCard'
import styles from '../CSS/addMovies.module.css'
import Cookies from 'js-cookie';
import Login from './Login'
import { toast } from 'react-toastify'
import { base_url } from '../data'

function AddMovie() {


  const [token] = useState(Cookies.get('token') || "")

  const [username, setUsername] = useState(null);

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
        Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
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


  useEffect(()=>{
    console.log(token)
    axios.get(base_url+'/getuser',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => (setUsername(response.data.username)))
    .catch(error => console.error(error));
  },[token])
  

 
  const handleClick = (item)=>{

    const movieDetails = {
      tmdb_id: item.id,
      title: item.title,
      url: item.poster_path
    }
    console.log(item)
    console.log(username)
    console.log(token)
    axios.post(base_url+'/addmovie',movieDetails,{
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        username: username
      }
    })
    .then(response =>{ console.log(response)
      toast.success("Movie added")
    })
    .catch(error => {console.error(error)
      toast.error("Movie already present")
    });
    
  }

  if (!token) {
     return <Login />
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