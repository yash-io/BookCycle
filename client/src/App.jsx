import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './Auth/login'
import SignUpPage from './Auth/signup'
import Defaultpage from './Auth/defaultpage'
import ProtectedRoute from './Auth/protectedroutes'
import MaterialHub from './pages/freeMaterial'
import PostMaterial from './pages/post-Material'
function App() {
  
  return (
    <div>
      <Router>
        <div  className='bg-gray-600 min-h-screen'>
          <Navbar></Navbar>
    
        <Routes>
          <Route path="/index.html" element={<Navigate to="/home" />} />
          <Route path='/' element={<Defaultpage/>} ></Route>
          <Route path='/auth/login' element={<LoginPage/>} ></Route>
          <Route path='/auth/signup' element={<SignUpPage/>} ></Route>

          {/* Protected routes section */}
          <Route element={<ProtectedRoute/>} >
          <Route path='/home' element={<Home/>} ></Route>
          <Route path='/free-materials' element={<MaterialHub/>}  ></Route>
          <Route path='/post-material' element={<PostMaterial/>} ></Route>
          </Route>
          
        </Routes>
     
       </div>
      </Router>
    </div>
  )
}

export default App
