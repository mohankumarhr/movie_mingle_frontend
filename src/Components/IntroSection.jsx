import React from 'react'
import styles from '../CSS/introSection.module.css'
import introImage from '../assets/introImage.png'
import { Link } from 'react-router-dom'

function IntroSection() {
  return (
    <div className={styles.introContainer}>
        <div className={styles.introWrapper}>
            <div className={styles.IntroLeftSection}>
                <p>Discover Films Through<br />Friends, Not Just Feeds.</p>
                <Link to={"/community"}>Explore Commmunities</Link>
            </div>
            <div className={styles.IntroRightSection}>
                <img src={introImage} alt="img" />
            </div>
        </div>

    </div>
  )
}

export default IntroSection