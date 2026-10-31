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
import AdminLayout from './admin/layout/AdminLayout'
import Dashboard from './admin/pages/Dashboard/Dashboard'
import DashboardUsers from './admin/pages/DashboardUsers/DashboardUsers'
import DashboardUserDetail from './admin/pages/DashboardUsers/DashboardUserDetail'
import DashboardCategory from './admin/pages/DashboardCategory/DashboardCategory'
import DashboardCategoryDetail from './admin/pages/DashboardCategory/DashboardCategoryDetail'
import DashboardProduct from './admin/pages/DashboardProduct/DashboardProduct'
import DashboardProductDetail from './admin/pages/DashboardProduct/DashboardProductDetail'
import Basket from './view/pages/Basket/Basket'
import Products from './view/pages/Product/Products'
import ProductDetail from './view/pages/Product/ProductDetail'
import DashboardOrder from './admin/pages/DashboardOrder/DashboardOrder'
import DashboardOrderDetail from './admin/pages/DashboardOrder/DashboardOrderDetail'


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
            <Route path="/basket" element={<Basket/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:id" element={<ProductDetail/>}/>
          </Route>

          <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<Dashboard/>}/>
            
            <Route path="users" element={<DashboardUsers/>}/>
            <Route path="users/:id" element={<DashboardUserDetail/>}/>

            <Route path="category" element={<DashboardCategory/>}/>
            <Route path="category/:id" element={<DashboardCategoryDetail/>}/>

            <Route path="products" element={<DashboardProduct/>}/>
            <Route path="products/:id" element={<DashboardProductDetail/>}/>
          
            <Route path="orders" element={<DashboardOrder/>}/>
            <Route path="orders/:id" element={<DashboardOrderDetail/>}/>
            
          </Route>
        </Routes>
      </Router>
    )
}

export default App