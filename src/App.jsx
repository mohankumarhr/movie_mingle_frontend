import React from 'react'
// import Login from './Pages/Login'
import SignIn from './Pages/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import AddMovie from './Pages/AddMovie'
import Profile from './Pages/Profile'
import EmailVerify from './Pages/EmailVerify'
import ChangePassword from './Pages/ChangePassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Community from './Pages/Community'
import AddMovieToComm from './Pages/AddMovieToComm'
import MovieDetails from './Pages/MovieDetails'
import CommunityDetails from './Pages/CommunityDetails'

function App() {
  return (
    <div>
       <ToastContainer 
       position="top-center"
       autoClose={1000}
       />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignIn />} />
        <Route path='/recomend' element={<AddMovie />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/community' element={<Community />}/>
        <Route path='/verifymail/:email/:username' element={<EmailVerify />}/>
        <Route path='/forgotpassword' element={<ChangePassword />}/>
        <Route path='/addmovietocomm/:id' element={<AddMovieToComm />}/>
        <Route path='/moviedetails/:commid/:id/:recomendeduser' element={<MovieDetails />}/>
        <Route path='/communitydetails/:id/' element={<CommunityDetails />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App