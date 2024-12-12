import React, { useEffect, useState } from 'react'
import styles from '../CSS/LoginForm.module.css'
import styles2 from '../CSS/Login.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import { base_url } from '../data'
import { toast } from 'react-toastify'

function ChangePassword() {

    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    const [otpsend, setOtpSend] = useState(false)

    const [valid, setValid] = useState(false)

    const [confirmpass, setConfirmpass] = useState("")

    const [password, setPassword] = useState({
        username: "",
        password: "",
        otp:"",
    })

    const requestOtp = ()=>{
        if (password.username !== "") {
            setLoader(true)
            axios.get(base_url+'/forgotpassword',{
                params: {
                  username: password.username
                }
              })
              .then(response => {
                console.log(response.data)
                setLoader(false)
                setOtpSend(true)
                toast.success("otp send")
              })
              .catch(error => {console.error(error)
                setLoader(false)
                setOtpSend(false)
                toast.error("otp couldn't send")
              });
        }
    }
   
    const handleChange = (e)=>{
        const {name, value} = e.target
        setPassword({
            ...password,
            [name]:value
        })
    }

    const handleChangeConfirm = (e)=>{
            setConfirmpass(e.target.value)
    }

    const changePassword = ()=>{
        if(valid){
          setLoader(true)
            axios.get(base_url+'/verifyotp',{
                params: password
              })
              .then(response => {
                console.log(response.data)
                setLoader(false)
                toast.success("password changed")
                navigate("/login")
              })
              .catch(error => {console.error(error)
                toast.error("Invalid otp")
                setLoader(false)
              });
        }
    }

    const buttonstyle = {
        cursor: "not-allowed",
        backgroundColor: "#ccc"
    }

    useEffect(()=>{
        if (password.password!=="" && password.password === confirmpass && password.otp !== "") {
            setValid(true)
        }else{
            setValid(false)
        }
        console.log(password)
    },[password, confirmpass])

  return (
    <div className={styles2.LoginPageContainer}>
        <div className={styles2.LoginWrapper}>
       {!otpsend&&<div className={styles.LoginFormContainer} >
                <h3>Reset Password</h3>
                <label >Username</label>
                <input type="text" onChange={handleChange} name='username' value={password.username}/>
                <button className={styles.loginBtn} onClick={requestOtp}>send Otp</button>
                
        </div>}
        {otpsend&&<div className={styles.LoginFormContainer} >
                <label>New Password</label>
                <input type="password" onChange={handleChange} name='password' value={password.password}></input>
                <label >Confirm Password</label>
                <input type="password" onChange={handleChangeConfirm} name='confirmpass' value={confirmpass}/>
                <label >Otp</label>
                <input type="text" onChange={handleChange} name='otp' value={password.otp}/>
                <button className={styles.loginBtn} style={!valid?buttonstyle:{}} onClick={changePassword}>Change Password</button>
                </div>}
        </div>
        {loader&&<Loader />}
    </div>
  )
}

export default ChangePassword