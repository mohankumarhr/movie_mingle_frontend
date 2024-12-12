import React, { useState } from 'react'
import styles from '../CSS/LoginForm.module.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { base_url } from '../data';

function LoginForm() {

  const [loader, setLoader] = useState(false)

  const navigate = useNavigate();
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
        setLoader(true)
        const response = await axios.post(base_url+"/login", LoginDetails)
        console.log("response", response.data.response)
        if (response.data.response.emailVerified) {
          Cookies.set('token', response.data.response.token, { expires: 1/24 })
          toast.success("logied in")
          setLoader(false)
          navigate('/')
        }else{
          setLoader(false)
          toast.error("email not verified")
          navigate(`/verifymail/${"registered mail"}/${LoginDetails.username}`)
        }
        
    } catch (error) {
      setLoader(false)
      toast.error("Incorect username or password")
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
                <Link to={"/forgotpassword"}>Forgot Password</Link>
                <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
                <p>don't have account <Link to={"/register"}>sign up</Link></p>
        </div>
        {loader&&<Loader />}
    </div>
  )
}

export default LoginForm