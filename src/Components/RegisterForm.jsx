import React, { useState } from 'react'
import axios from 'axios'
import styles from '../CSS/LoginForm.module.css'

function RegisterForm() {
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
        const response = await axios.post("http://localhost:8080/register", RegisterDetails)
        console.log("response", response.data)
        
    } catch (error) {
        console.log("error", error)
    }
}

  return (
    <div>
        <div className={styles.LoginFormContainer} >
                <h3>Sign In</h3>
                <label>UserName</label>
                <input type="text" onChange={handleChange} name='username' value={RegisterDetails.username}></input>
                <label >Pasword</label>
                <input type="password" onChange={handleChange} name='password' value={RegisterDetails.password}/>
                <label >Email</label>
                <input type="email" onChange={handleChange} placeholder='example@gmail.com' name='email' value={RegisterDetails.email}/>
                <button onClick={handleRegister}>Sign In</button>
        </div>
    </div>
  )
    
}

export default RegisterForm