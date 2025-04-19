import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import styles from '../CSS/movieDetails.module.css';
import { base_url } from '../data'
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';


function MovieDetails() {

const navigate = useNavigate();  

const [token] = useState(Cookies.get('token') || "")
const [username, setUsername] = useState("")
const [loader, setLoader] = useState(false)
const{commid, id, recomendeduser } = useParams();
const [movieDetails, setmovieDetails] = useState({})
const [owner , setOwner] = useState();

const removeMovie = ()=>{
  axios.post(`${base_url}/community/removemovie`,null,
    {
          params: {
          communityId: commid,
          movie_id: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then(response => {console.log(response);
    navigate("/community")
  })
  .catch(error => {console.error(error);
    toast.error("couldn't remove movie")
  });
}

useEffect(()=>{

    async function fetchDta() {
      setLoader(false)
        axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
              accept: 'application/json',
              Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
            }
          }).then(reponse => {setmovieDetails(reponse.data); setLoader(false)})
          .catch(error => {console.log(error); setLoader(false)})
          
    }
    fetchDta();
})
    

  useEffect(()  => {
    axios.get(base_url+'/community/getdetails', {
      params: {
        communityId: commid
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      setOwner(response.data.owner.username);
    })
    .catch(error => {
      console.error("There was an error fetching the community details!", error);
    });
  }, [commid, token]);

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
    <div className={styles.movieDetailsSection}>
        <NavBar />
        <div className={styles.movieDetailsCont}>
            <div className={styles.movieDetailsWrap}>
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`} alt="movie poster" />
                <div className={styles.detailsContainer}>
                    <div className={styles.leftCont}>
                        <img src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`} alt="movie poster" />
                    </div>
                    <div className={styles.rightCont}>
                            <p><span>Title : </span>{movieDetails.title}</p>
                            <p><span>Original Title : </span>{movieDetails.original_title}</p>
                            <p><span>Overview : </span>{movieDetails.overview}</p>
                            <p><span>Release Date : </span>{movieDetails.release_date}</p>
                            <p><span>Genres : </span>
                            {movieDetails.genres&&movieDetails.genres.map((item)=>{
                                    return <> {item.name}, </>
                            })}
                            </p>
                            <p><span>runtime : </span>{movieDetails.runtime} min</p>
                            <p><span>Production Companies : </span>
                            {movieDetails.production_companies&&movieDetails.production_companies.map((item)=>{
                                    return <> {item.name}, </>
                            })}
                            </p>
                            <p><span>Spoken Languages : </span>
                            {movieDetails.spoken_languages&&movieDetails.spoken_languages.map((item)=>{
                                    return <> {item.english_name}, </>
                            })}
                            </p>
                            <p><span>Tagline : </span>{movieDetails.tagline}</p>
                    </div>
                </div>
            </div>
            <div className={styles.recomenderAction}>
                {recomendeduser !== username?<p> <span>Recomended by</span> {recomendeduser}</p>:
                <button onClick={removeMovie}>remove</button>
                }{recomendeduser !== username && owner === username && <button onClick={removeMovie}>Remove</button>}
            </div>
        </div>
        {loader&&<Loader />}
    </div>
  )
}

export default MovieDetails