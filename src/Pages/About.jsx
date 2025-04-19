import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import styles from '../CSS/about.module.css'
import about_1 from '../assets/images/about_1.png'
import aboutDev from '../assets/images/aboutDev.png'
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom'
import axios from 'axios'

function About() {

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwwfU3Gl2ni1qgqTrtZFVwx5eaU7nF0cVxiRVUFsdnoBxmb81VU-W7PHsI8KhVijxKC6A/exec"
    try {
      await axios.post(scriptURL, form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error!', error);
    }
  };

  return (
    <div>
        <NavBar />
        <div className={styles.aboutContainer}>
          <div className={styles.aboutWrapper}>
            <h3>Welcome To MovieMingle</h3>
            <div className={styles.aboutDescWrapper}>
              <div className={styles.aboutDesctext}>
                <h1 className={styles.aboutTitle}>About MovieMingle</h1>
                <p className={styles.aboutDescription}>
                <strong>MovieMingle</strong> is more than just a movie recommendation tool — it's a social space where people
                        come together to share their love for cinema. At its heart, MovieMingle lets users create vibrant
                        communities and groups where they can recommend, discuss, and celebrate their favorite films with
                        like-minded peers.
                        <br /><br />
                        This project is incredibly close to my heart. As someone who’s always been fascinated by how stories connect us,
                        I wanted to build a platform that sparks conversations, friendships, and shared experiences — all through movies.
                        MovieMingle was born from the belief that the best movie recommendations don’t come from algorithms alone,
                        but from the people who know us best. Whether you're hyping up a hidden gem or organizing a community watch night,
                        MovieMingle is here to make those moments unforgettable.
                  </p>
                  <h2 className={styles.sectionTitle}>🎯 Our Mission</h2>
                  <p>
                  Our goal is to transform movie discovery into a shared experience — fun, meaningful, and deeply personal. With an intuitive interface and a focus on community-driven recommendations, MovieMingle empowers users to explore films together, spark discussions, and uncover hidden gems through the voices of their peers. Because the best movie nights start with a great suggestion from someone who gets you.
                  </p>
              </div>
              <div className={styles.aboutImage}>
                <img src={about_1} alt="" />
              </div>
            </div>
              
              <div className={styles.teckStackSection}>
                <h2 className={styles.teckStackSectionTitle}>⚙️ Tech Stack</h2>
                <div className={styles.techGrid}>
                  <div className={styles.techItem}>
                    <h4>Frontend</h4>
                    <p>
                      Built using <strong>React.js</strong> for a responsive and dynamic UI. Styling is handled with <strong>CSS Modules</strong> to keep styles modular and scoped.
                    </p>
                  </div>
                  <div className={styles.techItem}>
                    <h4>Backend</h4>
                    <p>
                      Developed with <strong>Spring Boot</strong>, managing business logic and serving data through RESTful APIs.
                    </p>
                  </div>
                  <div className={styles.techItem}>
                    <h4>Database</h4>
                    <p>
                      Uses <strong>MySQL</strong> for structured data storage of users, communities, and movie metadata.
                    </p>
                  </div>
                  <div className={styles.techItem}>
                    <h4>REST API</h4>
                    <p>
                      Clean, scalable <strong>RESTful APIs</strong> connect the frontend and backend, enabling efficient communication between user actions and server responses.
                    </p>
                  </div>
                  <div className={styles.techItem}>
                    <h4>Authentication</h4>
                    <p>
                      Secured using <strong>JWT (JSON Web Tokens)</strong> and <strong>Spring Security</strong> for robust, stateless user authentication and protected endpoints.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.meetDeveSection}>
              <h2 className={styles.sectionTitle}>Meet the Developer</h2>
             
              <div className={styles.aboutDev}>
                  <div className={styles.meetDevImage}>
                    <img src={aboutDev} alt="" />
                  </div>
                <div className={styles.developerCard}>
                <p>
                  Hi! I'm <strong>Mohan Kumar H R</strong>, a full stack developer skilled in <strong>React.js</strong> and <strong>Spring Boot</strong>, who finds joy at the intersection of storytelling and technology.
                  <br /><br />
                  I created <strong>MovieMingle</strong> out of a deep passion for movies and a desire to make film discovery more collaborative and meaningful. This platform is built not just to recommend movies — but to bring people together through shared cinematic experiences.
                  <br /><br />
                  Every part of this project, from group recommendations to secure login with JWT, has been thoughtfully designed and developed to make connecting over films fun, secure, and seamless.
                  <br /><br />
                  Thanks for stopping by — and I hope MovieMingle helps you discover your next favorite film, with the people who matter most.
                </p>
                </div>
              </div>
            </div>

            <div className={styles.contactMe}>
              <div className={styles.contactMeWrapper}>
                <div className={styles.contactInfo}>
                  <h4>Contact Me</h4>
                  <div className={styles.contactEmail}>
                    <MailIcon />
                    <Link to={`mailto:mohankumarhr2003@gmail.com`}>mohankumarhr2003@gmail.com</Link>
                  </div>
                  <div className={styles.contactNumber}>
                    <LocalPhoneIcon />
                    +91 9353931337
                  </div>
                  <div className={styles.socialMediaIcon}>
                    <Link to={"https://www.linkedin.com/in/mohan-kumar-hr-a3008a24a/"}><LinkedInIcon /></Link>
                    <Link to={"https://github.com/mohankumarhr/"}><GitHubIcon /></Link>
                    <Link to={"https://x.com/MOHANKU35432148"}><XIcon /></Link>
                    <Link to={"https://www.instagram.com/mohan_kumar.hr/"}><InstagramIcon /></Link>
                  </div>
                </div>
                <div className={styles.contactForm}>
                  <input onChange={handleChange} name='name'  value={form.name} type="text" placeholder='Your Name' />
                  <input onChange={handleChange} name='email' value={form.email} type="text" placeholder='Your Email id' />
                  <textarea onChange={handleChange} name="message" value={form.message} id="" placeholder='Your Message'></textarea>
                  <button onClick={handleSubmit} >Submit</button>
                </div>
              </div>
            </div>
            <div className={styles.AboutFooter}>
              <p>Copyright &copy; - All Rights Reserved</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About