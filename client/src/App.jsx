import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import MainLayout from './view/layout/MainLayout'
import Home from './view/pages/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authActions } from './store/authSlice'
import Register from './view/pages/Register/Register'
import Login from './view/pages/Login/Login'
import Profile from './view/pages/Profile/Profile'

const App = () => {
    const dispatch = useDispatch()
    const server = useSelector((state)=>state.prod.link)
    useEffect(()=>{
      const fetch = async()=>{
        const res = await axios.get(`${server}/api/user/cookie`,
          {withCredentials: true}
        )
        if(res.data.message === true){
          dispatch(authActions.login())
        }
      }
      fetch()
    },[dispatch, server])
    
    return (
      <Router>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </Router>
    )
}

export default App