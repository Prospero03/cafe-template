import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import MainLayout from './view/layout/MainLayout'
import Home from './view/pages/Home/Home'

const App = () => {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App