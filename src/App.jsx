import React from 'react'
// import Login from './Pages/Login'
import SignIn from './Pages/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import AddMovie from './Pages/AddMovie'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignIn />} />
        <Route path='/recomend' element={<AddMovie />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App