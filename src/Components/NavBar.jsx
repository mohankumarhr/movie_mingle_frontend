import React from 'react'
import styles from '../CSS/navbar.module.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className={styles.navbarContainer}>
        <div className={styles.navbarWrapper}>
            <div className={styles.navbarLogo}>
                <span>Movie Mingle</span>
            </div>
            <div className={styles.navbarMenu}>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li>Genres</li>
                    <li>Recommend</li>
                    <li>Profile</li>
                </ul>
            </div>
            <div className={styles.navbarButtons}>
                <Link to={"/login"} id={styles.loginButton}>Log in</Link>
                <Link to={"/register"}>Sign up</Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar