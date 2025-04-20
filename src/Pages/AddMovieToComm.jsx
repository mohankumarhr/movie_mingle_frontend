import React, { useEffect, useState } from 'react'
import SearchSection from '../Components/SearchSection'
import axios from 'axios'
import MovieCard from '../Components/MovieCard'
import styles from '../CSS/addMovies.module.css'
import Cookies from 'js-cookie';
import Login from './Login'
import { toast } from 'react-toastify'
import { base_url } from '../data'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import NoMoviePoster from '../assets/images/NoMoviePoster.png'


function AddMovieToComm() {

    const{ id } = useParams();

    const [loader, setLoader] = useState(false)

    const [token] = useState(Cookies.get('token') || "")
    
      const [username, setUsername] = useState(null);
    
      const [serchText, setSearchText] = useState("")
    
      const [searchResult, setSearchResult] = useState([])
    
      const changeSearchText = (value)=>{
        setSearchText(value);
      }

      useEffect(() => {
        setLoader(true)
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
            setSearchResult(res.data.results);
            console.log(res.data);
            setLoader(false)
          })
          .catch(err => {console.error(err); setLoader(false)
          });
        
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
        setLoader(true)
        axios.post(base_url+'/community/addmovietoCommunity',null,{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            communityId : id,
            movie_id : item.id,
            username: username
          }
        })
        .then(response =>{ console.log(response)
          setLoader(false)
          toast.success("Movie added")
        })
        .catch(error => {console.error(error)
          setLoader(false)
          toast.error("Movie already present")
        });
        
      }

      if (!token) {
     return <Login />
    }  

  return (
    <div>
    <SearchSection 
      handleText = {changeSearchText}
    />
   {searchResult.length !== 0&&<div className={styles.addMovieContainer}>
     {searchResult.map((item)=>{
        return <MovieCard 
        title = {item.title}
        url = {item.poster_path != null? `https://image.tmdb.org/t/p/w300${item.poster_path}`:NoMoviePoster}
        handleClick = {handleClick}
        details = {item}
        />
     })
     }
    </div>}
    {searchResult.length === 0 && <p>No movies found</p>}
    {loader&&<Loader />}
  </div>
  )
}

export default AddMovieToComm