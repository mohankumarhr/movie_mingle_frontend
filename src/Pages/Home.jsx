import React from 'react'
import NavBar from '../Components/NavBar'
import IntroSection from '../Components/IntroSection'
import GenresSection from '../Components/GenresSection'
import Recomendation from '../Components/Recomendation'
import RecomendBtn from '../Components/RecomendBtn'

function Home() {
  return (
    <div>
      <NavBar />
      <IntroSection />
      <GenresSection />
      <Recomendation />
      <RecomendBtn />
    </div>
  )
}

export default Home