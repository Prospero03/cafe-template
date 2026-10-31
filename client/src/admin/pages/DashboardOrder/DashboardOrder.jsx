import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const DashboardOrder = () => {
    const server = useSelector((state)=>state.prod.link)
    const navigate = useNavigate()
    const [OrderData, setOrderData] = useState();

    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`${server}/api/admin/orders`,
                {withCredentials:true}
            )
            console.log(res.data.data)
            setOrderData(res.data.data)
        }
        fetch()
    },[server])

    return (
        <div>
            <h2>Заказы</h2>
            {OrderData?.map((item,key)=>{
                return(
                    <div key={key}>
                        <div>Заказ № {item.id}</div>
                        <div>{item.status}</div>
                        <button type="button"
                                className='btn'
                                onClick={()=> navigate(`/admin/orders/${item.id}`)}>
                            Подробнее
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default DashboardOrder