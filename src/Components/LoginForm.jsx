import React, { useState } from 'react'
import styles from '../CSS/LoginForm.module.css'
import axios from 'axios'
import Cookies from 'js-cookie';

function LoginForm() {

  const [LoginDetails, setLoginDetails] = useState({
    username : "",
    password : ""
  })  

  const  handleChange = (e)=>{
        const {name, value} = e.target
        setLoginDetails({
            ...LoginDetails,
            [name]: value
        }
        )
        console.log(LoginDetails)
  }

  const handleLogin = async ()=>{

    console.log("logindetails",LoginDetails)
    try {

        const response = await axios.post("http://localhost:8080/login", LoginDetails)
        console.log("response", response.data.response.token)
        Cookies.set('token', response.data.response.token);
        
    } catch (error) {
        console.log("error", error)
    }
    
    

    setLoginDetails({
        username:"",
        password:""
    })
  }

  return (
    <div>

        <div className={styles.LoginFormContainer} >
                <h3>Login</h3>
                <label>UserName</label>
                <input type="text" onChange={handleChange} name='username' value={LoginDetails.username}></input>
                <label >Pasword</label>
                <input type="password" onChange={handleChange} name='password' value={LoginDetails.password}/>
                <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  )
}

export default LoginForm