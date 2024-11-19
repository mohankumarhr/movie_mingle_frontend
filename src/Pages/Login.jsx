import React from 'react'
import LoginForm from '../Components/LoginForm'
import Styles from '../CSS/Login.module.css'

function Login() {
  return (
    <div className={Styles.LoginPageContainer}>
        <div className={Styles.LoginWrapper}>
        <LoginForm />
        </div>
       
    </div>
  )
}

export default Login