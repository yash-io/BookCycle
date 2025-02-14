import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './Auth/login'
import SignUpPage from './Auth/signup'
import Defaultpage from './Auth/defaultpage'


function App() {
  
  return (
    <div>
      <Router>
        <div  className='bg-gray-600 min-h-screen'>
          <Navbar></Navbar>
    
        <Routes>
          <Route path='/' element={<Defaultpage/>} ></Route>
          <Route path='/home' element={<Home/>} ></Route>
          <Route path='/auth/login' element={<LoginPage/>} ></Route>
          <Route path='/auth/signup' element={<SignUpPage/>} ></Route>
        </Routes>
     
       </div>
      </Router>
    </div>
  )
}

export default App
