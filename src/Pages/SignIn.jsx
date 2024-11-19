import React from 'react'
import RegisterForm from '../Components/RegisterForm'
import Styles from '../CSS/Login.module.css'

function SignIn() {
  return (
    <div className={Styles.LoginPageContainer}>
        <div className={Styles.LoginWrapper}>
        <RegisterForm />
        </div>  
    </div>
  )
}

export default SignIn