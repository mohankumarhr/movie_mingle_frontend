import React, { useEffect, useState } from 'react'
import styles from '../CSS/recomendations.module.css'
import MovieCard from './MovieCard'
import axios from 'axios'
import { base_url } from '../data'
import { useNavigate } from 'react-router-dom'
import NoMoviePoster from '../assets/images/NoMoviePoster.png'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Loader from './Loader'


function Recomendation() {

  const navigate = useNavigate();
  const [token] = useState(Cookies.get('token') || "")
  const [username, setUsername] = useState("")
  const [movieDetails, setMovieDetails] = useState([])
  const[triggerfeatchData, setTriggerFeatchdata] = useState(true);
  const [loader, setLoader] = useState(false)


  useEffect(()=>{
    async function fetchData() {
      axios
      .get(base_url+"/allmovies")
      .then(responce => {
        const sortedMovies = responce.data.sort(
          (a, b) => b.liked_users.length - a.liked_users.length
        );
        setMovieDetails(sortedMovies);
        console.log(sortedMovies);
      }  

    )
      .catch(error => console.error(error));
  }
  fetchData()
  },[triggerfeatchData])
  

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

  const handleLike = (item)=>{
    // console.log(item)
    if (username === "") {
      return
    }
    setLoader(true)
    if (item["liked_users"].indexOf(username) === -1) {
      axios.post(`${base_url}/likemovie`,null,
        {
              params: {
              id : item.id,
              username : username
              },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then(response => {console.log(response);
        setTriggerFeatchdata(!triggerfeatchData)
      })
      .catch(error => {console.error(error);
        toast.error("something went wrong")
      });
    }else {
      axios.post(`${base_url}/dislikemovie`,null,
        {
              params: {
                id : item.id,
                username : username
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then(response => {console.log(response);
        
         setTriggerFeatchdata(!triggerfeatchData)
      })
      .catch(error => {console.error(error);
        toast.error("something went wrong")
      });
    }
    setLoader(false)
  }

  useEffect(()=>{
    console.log(token)
    axios.get(base_url+'/getuser',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {setUsername(response.data.username);})
    .catch(error => console.error(error));
  },[token])

  return (
    <div className={styles.recomendContainer}>
        <div className={styles.recomendWrapper}>
           {movieDetails.map((item)=>{
           return <MovieCard 
            url={item.url != null? `https://image.tmdb.org/t/p/w300/${item.url}`:NoMoviePoster}
            title = {item.title}
            handleClick = {handleClick}
            details = {item}
            handleLike = {handleLike}
            liked = {
              item["liked_users"].indexOf(username) !== -1
           }
           totallike = {item["liked_users"].length}
        />
           })}
        </div>
        {loader&&<Loader />}
    </div>
  )
}

export default Recomendation