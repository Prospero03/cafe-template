import React, { useEffect, useState } from 'react'

import './DashboardUsers.scss'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardUsers = () => {
    const [UserData, setUserData] = useState();
    const server = useSelector((state)=>state.prod.link)
    const navigate = useNavigate()

    useEffect(()=>{
      const fetch = async()=>{
        try {
          const res = await axios.get(`${server}/api/admin/users`,
            {withCredentials: true}
          )
          setUserData(res.data.data)
          console.log(res.data.data)
        } catch (error) {
          console.log(error.response.data.error)
        }
      }
      fetch()
    },[server])

    const handleDelete = async(id)=>{
      if (!window.confirm('вы действительно хотите удалить пользователя ?')) return 
      const res = await axios.delete(`${server}/api/admin/users/${id}/delete`,
        {withCredentials: true}
      )
      setUserData(items => items.map((item)=>item.id === id))
      window.location.reload()
      toast.success(res.data.message)
    }

    return (
      <div className='dashboard dashboard-users'>
        <h2>Пользователи</h2>
        <div className="users-table-scroll">
          <table>
            <thead >
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Логин</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody >
              {UserData?.map((item, key)=>{
                return(
                  <tr key={key}>
                    <td>{item?.id}</td>
                    <td>{item?.email}</td>
                    <td>{item?.login}</td>
                    <td>{item?.role}</td>
                    <td>
                      <div className='table-actions'>
                        <button type="button" 
                                className='btn btn--show'
                                onClick={()=>navigate(`/admin/users/${item?.id}`)}>
                          Посмотреть
                        </button>
                        <button type="button" 
                                className='btn btn--edit'
                                onClick={()=>navigate(`/admin/users/${item?.id}`)}>
                                  Редактировать
                        </button>
                        <button type="button" 
                                className='btn btn--danger'
                                onClick={()=>handleDelete(item?.id)}>
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default DashboardUsers