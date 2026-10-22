import React from 'react'

import './DashboardSidebar.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../../store/authSlice'
import {toast} from 'react-toastify'

const DashboardSidebar = (props) => {
    const {
      admin_name = 'Cafe Template',
      admin_menu = [
        { 
          name: 'Главная',
          to: '/admin',
        },
        { 
          name: 'Пользователи',
          to: '/admin/users',
        },
        { 
          name: 'Категории',
          to: '/admin/category',
        },
      ]
    } = props

    const server=useSelector((state)=>state.prod.link)
    const dispath = useDispatch()
    const navigate =useNavigate()

    const handleLogout = async()=>{
      const res = await axios.post(`${server}/api/admin/logout`,
        '',
        {withCredentials:true}
      )
      dispath(authActions.logout())
      navigate('/')
      toast.success(res.data.message)
    }

    return (
      <div className='dashboard-sidebar'>
        <h2>
          <NavLink to="/admin">
            {admin_name}
          </NavLink>
        </h2>
        {admin_menu?.map((item, key)=>{
          return(
            <NavLink key={key} to={item.to}>{item.name}</NavLink>
          )
        })}
        <NavLink to='/' onClick={()=>handleLogout()}>Выйти</NavLink>
      </div>
    )
}

export default DashboardSidebar