import React, { useState } from 'react'
import styles from '../CSS/emailVerify.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Components/Loader';
import { base_url } from '../data';
import { toast } from 'react-toastify';

function EmailVerify() {

  const [loader, setLoader] = useState(false)
  const { email,username } = useParams();

  const resendVerification = ()=>{
    setLoader(true)
    axios.get(base_url+'/resendverification',{
      params: {
        username: username
      }
    })
    .then(response => {console.log(response.data)
      toast.success("mail sent")
      setLoader(false)
    })
    .catch(error => {console.error(error)
      toast.error("couldn't send mail")
      setLoader(false)
    });
  }

  return (
    <div className={styles.emailVerifyContainer}>
        <div className={styles.emailVerifyWrapper}>
            <p>Verification email has send to {email}</p>
            <Link onClick={resendVerification}>Resend mail</Link>
        </div>
        {loader&&<Loader />}
    </div>
  )
}

export default EmailVerify