import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'

const MainLayout = () => {

    const [UserData, setUserData] = useState();
    const server = useSelector((state)=>state.prod.link)
    useEffect(()=>{
      const fetch = async()=>{
        const res = await axios.get(`${server}/api/user/profile`,
          {withCredentials:true}
        )
        console.log(res.data.data)
        setUserData(res.data.data)
      }
      fetch()
    },[server])

  return (
    <div className='main-layout'>
        <Header user={UserData || ''} server={server}/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout