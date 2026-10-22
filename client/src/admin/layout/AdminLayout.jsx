import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const AdminLayout = () => {
    const server = useSelector((state)=>state.prod.link)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetch = async()=>{
            try {
                const res = await axios.get(`${server}/api/admin/dashboard`,
                    {withCredentials:true}
                )
            } catch (error) {
                navigate('/')
            }
        }
        fetch()
    },[navigate, server])
  return (
    <main className='admin-layout'>
        <DashboardSidebar/>
        <Outlet/>
    </main>
  )
}

export default AdminLayout