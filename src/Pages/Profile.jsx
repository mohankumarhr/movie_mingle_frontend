import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import styles from '../CSS/profile.module.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import Login from './Login'
import { base_url } from '../data'
import Loader from '../Components/Loader'

function Profile() {

    const [token] = useState(Cookies.get('token') || "")
    const [userDetails, setUserDetails] = useState({
        id:"",
        username:"",
        email:""
    })
    const [movieDetails, setMovieDetails] = useState([])
    const [editMode, setEditMode] = useState(true)
    const [loader, setLoader] = useState(false)


    const enableEdit = ()=>{
        setEditMode(!editMode)
    }

    const handleChange = (e)=>{
        const {name, value} = e.target
        setUserDetails(
           { ...userDetails,
            [name]:value}
        )
        console.log(userDetails)
    }

    const saveDetails = ()=>{
        // console.log(userDetails)
        setLoader(true)
        axios.post(base_url+'/updateuser', userDetails,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then(responce => console.log(responce.data))
        .catch(error => console.log(error))
        .finally(setLoader(false))
    }

    const handleDelete = (id)=>{
        // console.log(id)
        setLoader(true)
        axios.delete(base_url+'/delete',
        {
            headers: {
                  Authorization: `Bearer ${token}`
            },
            params: {
              id: id
            }
        })
        .then((responce)=>{
                // console.log(responce.data)
                setLoader(false)
                window.location.reload();
        })
        .catch(error => {console.error(error);
          setLoader(false)
        })
    }

    useEffect(()=>{
      setLoader(true)
        axios.get(base_url+'/getuser',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => (setUserDetails(response.data)))
        .catch(error => console.error(error))
        .finally(setLoader(false));
    },[token])

    useEffect(()=>{
        setLoader(true)
        axios.get(base_url+'/moviebyuser',{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            username: userDetails.username
          }
        })
        .then(response => (setMovieDetails(response.data)))
        .catch(error => console.error(error))
        .finally(setLoader(false));
    },[token, userDetails])

  if (!token) {
    return <Login />
  }  

  if (userDetails.username === "") {
    return <Loader />
  }

  return (
    <div className={styles.profileContainer}>
        <NavBar />
        <div className={styles.profileWrapper}>
            <h2>Hi Mohan Kumar HR</h2>
            <div className={styles.personalDetails}>
                <div className={styles.personalDetailsEdit}>
                    <p>Personal Details</p>
                    <button onClick={enableEdit}>{editMode?'Edit':'cancel'}</button>
                </div>
                <div className={styles.userDetails}>
                    <input onChange={handleChange} name='username' value={userDetails.username}  type="text" className={editMode&&styles.inputDisabled}  readOnly={editMode} />
                    <input onChange={handleChange} name='email' value={userDetails.email} type="email" className={editMode&&styles.inputDisabled}  readOnly={editMode} />
                    <button onClick={saveDetails} >Save</button>
                </div>
            </div>
        </div>
        <div className={styles.addedMovieWrapper}>
            <h3>Movie List</h3>
            <table className={styles.addMovieList}>
            <tbody>
                {movieDetails.map((item) => (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td style={{ textAlign: "center" }}>
                    <span
                        onClick={() => handleDelete(item.id)}
                    >
                        <p>Delete</p>
                    </span>
                    </td>
                </tr>
                ))}
                <tr>
                    <td><Link to={"/recomend"}>Add Movie</Link></td>
                </tr>
            </tbody>
            </table>
           
        </div>
        {loader&&<Loader />}
    </div>
  )
}

export default Profile