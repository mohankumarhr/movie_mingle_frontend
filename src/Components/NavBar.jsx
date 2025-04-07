import React, { useEffect, useRef, useState } from 'react'
import styles from '../CSS/navbar.module.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import BackgroundLetterAvatars from './Avathar'
import MenuIcon from '@mui/icons-material/Menu';
import { base_url } from '../data'

function NavBar() {

const [showMenu, setMenu] = useState(false)
const [token] = useState(Cookies.get('token') || null)
const [username, setUsername] = useState(null);
const menuRef = useRef(null);

useEffect(()=>{
    console.log(token)
    axios.get(base_url+'/getuser',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => (setUsername(response.data.username)))
    .catch(error => console.error(error));
  },[token])


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  const handleAvatar = ()=>{
    console.log("hi");
  }

  const hadleLogout = ()=>{
    Cookies.remove('token');
    window.location.reload();
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
    }
};

  const menutoggle = ()=>{
    setMenu(true)
  }

  return (
    <div className={styles.navbarContainer}>
        <div className={styles.navbarWrapper}>
          <div onClick={menutoggle} className={`${styles.menuIcon}`}>
          <MenuIcon />
          </div>
            <div className={styles.navbarLogo}>
                <span>Movie Mingle</span>
            </div>
            <div  ref={menuRef} className={`${styles.navbarMenu} ${showMenu?styles.displayMenu:""}`}>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/recomend"}>Recommend</Link></li>
                    {token&&<li><Link to={"/profile"}>Profile</Link></li>}
                    <li><Link to={"/community"}>Community</Link></li>
                    <li><Link to={"/"}>About</Link></li>
                </ul>
            </div>
            {!token&&<div className={styles.navbarButtons}>
                <Link to={"/login"} id={styles.loginButton}>Log in</Link>
                <Link to={"/register"} id={styles.signupbtn} >Sign up</Link>
            </div>}
            {token&&<div  className={styles.navbarAvatar}>
                <div onClick ={handleAvatar}>
                {username&&<BackgroundLetterAvatars 
                    name = {username}
                />}
                </div>
                <div className={styles.avatarDropdown}>
                    <li onClick={hadleLogout}>Log out</li>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default NavBar