import React, { useState } from 'react'
import axios from 'axios'
import styles from '../CSS/LoginForm.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { base_url } from '../data'

function RegisterForm() {

    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();

    const [RegisterDetails, setRegisterDetails] = useState({
        username: "",
        password: "",
        email:""
    })


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRegisterDetails({
            ...RegisterDetails,
            [name]: value
        })
    }

    const handleRegister = async ()=>{
        console.log("RegisterDetails",RegisterDetails)
    try {
        setLoader(true)
        const response = await axios.post(base_url+"/register", RegisterDetails)
        console.log("response", response.data)
        setLoader(false)
        navigate(`/verifymail/${RegisterDetails.email}/${RegisterDetails.username}`)
        
    } catch (error) {
        setLoader(false)
        console.log("error", error)
    }
}

  return (
    <div>
        <div className={styles.LoginFormContainer} >
                <h3>Sign In</h3>
                <label>UserName</label>
                <input type="text" onChange={handleChange} name='username' value={RegisterDetails.username}></input>
                <label >Password</label>
                <input type="password" onChange={handleChange} name='password' value={RegisterDetails.password}/>
                <label >Email</label>
                <input type="email" onChange={handleChange} placeholder='example@gmail.com' name='email' value={RegisterDetails.email}/>
                <button className={styles.loginBtn} onClick={handleRegister}>Sign In</button>
                <p>Already have account <Link to={"/login"}>log in</Link></p>
        </div>
        {loader&&<Loader />}
    </div>
  )
    
}

export default RegisterForm