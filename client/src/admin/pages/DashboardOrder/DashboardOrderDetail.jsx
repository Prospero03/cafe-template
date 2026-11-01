import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'

const DashboardOrderDetail = () => {
    const {id}= useParams()
    const server = useSelector((state)=>state.prod.link)
    const [Order, setOrder] = useState();
    
    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`${server}/api/admin/orders/${id}`,
                {withCredentials:true}
            )
            console.log(res.data.data)
            setOrder(res.data.data)
        }
        fetch()
    },[server, id])

    const handlerUpdate = async(id, changes)=>{
        const formData = new FormData();
        if(changes.status)formData.append('status',changes.status)

        try {
            const res = await axios.patch(`${server}/api/admin/orders/${id}/update`,
                formData,
                {withCredentials:true}
            )
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    const change = async(e)=>{
        const {name, value} = e.target
        setOrder({...Order, [name]:value})
    }

    return (
        <div>
            <h2>Заказ № {Order?.id}</h2> 
            <div>{Order?.user?.email}</div>
            <div>
            {Order?.products?.map((item, key)=>{
                return(
                    <div key={key}>
                        <div>{item.name}</div>
                        <div>{item?.orders_products?.quantity}</div>
                        <div>{item?.price}</div>
                        <div>{item?.orders_products?.quantity * item?.price}</div>
                    </div>
                )
            })}
            </div>
            <select name="status" value={Order?.status} onChange={change}>
                <option value='создан'>создан</option>
                <option value='готовится'>готовится</option>
                <option value='отправлен'>отправлен</option>
                <option value='завершен'>завершен</option>
                <option value='отменён'>отменён</option>
            </select>
            <button type='button'
                    className='btn'
                    onClick={()=> handlerUpdate(Order?.id, {
                        status: Order.status
                    })}>
                Сохранить
            </button>
        </div>
    )
}

export default DashboardOrderDetail