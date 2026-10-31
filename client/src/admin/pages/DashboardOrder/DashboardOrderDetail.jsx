import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

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

    return (
        <div>
            <h2>Заказ № {Order?.id}</h2>
            <div>{Order?.status}</div>
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
        </div>
    )
}

export default DashboardOrderDetail