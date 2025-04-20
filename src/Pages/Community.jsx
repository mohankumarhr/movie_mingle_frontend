import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import CommunityList from '../Components/CommunityList'
import styles from '../CSS/community.module.css'
import Cookies from 'js-cookie';
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'
import MovieCard from '../Components/MovieCard'
import axios from 'axios'
import { base_url } from '../data'
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
import Login from './Login';

function Community() {

  const [token] = useState(Cookies.get('token') || "")
  const [username, setUsername] = useState("")
  // const [userId, setUserId] = useState("");
  const navigate  = useNavigate();
  const [loader, setLoader] = useState(false)
  const[displayWindow, setDisplayWin] = useState(false);
  const[displayJoinWin, setJoinWin] = useState(false);
  const[commuitydeatils, setCommuityDetails] = useState({});
  const[communityActive, setCommunityActive] = useState();
  const[moviesList, setMoviesList] = useState([]);
  const[movieresponce , setMovieResponce] = useState([]);
  const[commName, setCommName] = useState("");
  const[commId, setCommId] = useState("");
  const[triggerfeatchData, setTriggerFeatchdata] = useState(true);


  // ****************************** for create window ******************************

  const handleCommName = (e)=>{
    setCommName(e.target.value)
  }

  const OpenCreteWindow = ()=>{
    setDisplayWin(true);
  }

  const CreateCommunity = async()=>{
 
    if (commName !== "") {
      console.log(commName)
      setCommName("")
      setDisplayWin(false);

      axios.post(`${base_url}/community/create`,null,
      {
            params: {
            name: commName,
            ownerName: username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => {console.log(response);
      window.location.reload();
    })
    .catch(error => {console.error(error);
      toast.error("something went wrong")
    });

    }
  }

  const CloseCreteWindow = ()=>{
      setCommName("")
      setDisplayWin(false);
  }

  // ********************* for join window ************************
  const handleCommId = (e)=>{
    setCommId(e.target.value)
  }

  const OpenJoinWindow = ()=>{
    setJoinWin(true);
  }

  const JoinCommunity = ()=>{
    if (commId !== "") {
    
      setCommId("")
      setJoinWin(false);

      axios.post(`${base_url}/community/addmember`,null,
      {
            params: {
            communityId: commId,
            userName: username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => {console.log(response);
      window.location.reload();
    })
    .catch(error => {console.error(error);
      toast.error("something went wrong")
    });

    }
  }

  const CloseJoinWindow = ()=>{
    console.log(commId)
    setCommId("")
    setJoinWin(false);
}

// **********************************************************************

const handleActiveCommunity = (id)=>{
  setCommunityActive(id);
}

const handleClick = (item)=>{
    navigate(`/moviedetails/${communityActive}/${item.id}/${movieresponce[item.id]["added_by"]}`)
}

const handleLike = (item)=>{
  // console.log(item)
  setLoader(true)
  if (movieresponce[item.id]["linked_user"].indexOf(username) === -1) {
    axios.post(`${base_url}/community/likemovie`,null,
      {
            params: {
            communityId: communityActive,
            movie_id: item.id,
            username: username
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
    axios.post(`${base_url}/community/dislikemovie`,null,
      {
            params: {
            communityId: communityActive,
            movie_id: item.id,
            username: username
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




useEffect(() => {
  const scrollPosition = window.scrollY;
  async function fetchData() {
    setLoader(true)
    try {
    
      const response = await axios.get(`${base_url}/community/getdetails?communityId=${communityActive}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("unSorted Movies:", response.data.movies);
      setMovieResponce(response.data.movies)
      const sortedMovies = Object.entries(response.data.movies) // Convert object to array of [key, value] pairs
      .sort(([, movieA], [, movieB]) => {
        const aLikes = movieA.linked_user ? movieA.linked_user.length : 0; // Get length of linked_user array
        const bLikes = movieB.linked_user ? movieB.linked_user.length : 0; // Get length of linked_user array
        return bLikes - aLikes; // Sort by the number of likes (descending)
      })
      
   

    // Now you have the sorted movies object in sortedMovies
    setCommuityDetails(response.data);
    
    console.log("Sorted Movies:", sortedMovies);
      setMoviesList([])
      // Extract movie IDs and fetch details for each one
      const movieIds = sortedMovies.map(([movieId, movie]) => movieId);
      const movieRequests = movieIds.map(movieId => 
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_AUTHORIZATION_KEY
          }
        })
      );

      // Execute all movie requests in parallel
      const movieResponses = await Promise.all(movieRequests);
      const movieDetails = movieResponses.map(res => res.data);
      setMoviesList(prevMoviesList => {
        const uniqueMovies = new Map(); // Using Map to maintain order
        [...prevMoviesList, ...movieDetails].forEach(movie => uniqueMovies.set(movie.id, movie));
        return Array.from(uniqueMovies.values()); // Convert back to array
      });
    
    
      console.log("Movie Details:", movieDetails); 
      // console.log("movie List", moviesList)
      
    } catch (error) {
      console.error(error);
    } finally{
      setLoader(false);
    }
  }

  
    fetchData();
    
    window.scrollTo(0, scrollPosition);
   
  
}, [communityActive, token, triggerfeatchData]);

  if (!token) {
    return <Login />
  }

  return (
    <div>
        <NavBar />
        <div className={styles.communityBody}>
            {displayWindow&&<div className={styles.CommunityCreateWind}>
              <div className={styles.CommunityCreateWrap}>
                <CloseIcon onClick={CloseCreteWindow} className={styles.closeBtn} />
                <label>Community Name</label>
                <input onChange={handleCommName} value={commName} type="text" />
                <button onClick={CreateCommunity}>Create</button>
              </div>
            </div>}
            {displayJoinWin&&<div className={styles.CommunityCreateWind}>
              <div className={styles.CommunityCreateWrap}>
                <CloseIcon onClick={CloseJoinWindow} className={styles.closeBtn} />
                <label>Community ID</label>
                <input onChange={handleCommId} value={commId} type="text" />
                <button onClick={JoinCommunity}>Join</button>
              </div>
            </div>}
            <div className={styles.communitList}>
              <CommunityList 
                handleCreteWindow = {OpenCreteWindow}
                handleJoinWindow = {OpenJoinWindow}
                handleActiveCommunity = {handleActiveCommunity}
              />
            </div>
            <div className={styles.communityMovies}>
              {communityActive?<div className={styles.communityWrapper}>
                <div className={styles.communityHeader}>
                  <p>{commuitydeatils.name} #{commuitydeatils.id}</p>
                  <button onClick={()=>{navigate(`/addmovietocomm/${communityActive}`)}} className={styles.commAddMovieBtn}>Add Movie</button>
                </div>
                {moviesList.length !== 0&&<div className={styles.MovieListContainer}>
                       {moviesList.map((item)=>{
                          return <MovieCard 
                          title = {item.title}
                          url = {item.poster_path != null? `https://image.tmdb.org/t/p/w300${item.poster_path}`:"https://image.tmdb.org/t/p/w300/43ZvmTzIJ0tTzgLG8sDOfg9roLF.jpg"}
                          handleClick = {handleClick}
                          handleLike = {handleLike}
                          details = {item}
                          liked = {
                             movieresponce[item.id]["linked_user"].indexOf(username) !== -1
                          }
                          totallike = {movieresponce[item.id]["linked_user"].length}
                          />
                       })
                       }
                      </div>}
                      {moviesList.length === 0 && <p className={styles.movieNotAdded}>movies Not Added</p>}
              </div>:<div className={styles.welcomeToComm}><h4>Welcome to moviemingle community page</h4>
               <p>Here you can Create or join the Community</p>
              </div>}
            </div>
        </div>
        {loader&&<Loader />}
    </div>
  )
}

export default Community