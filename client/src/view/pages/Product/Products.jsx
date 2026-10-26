import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Products = () => {
    const server = useSelector((state)=>state.prod.link)
    const navigate = useNavigate()
    const [ProductData, setProductData] = useState();

    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`${server}/api/products`,
                {withCredentials:true}
            )
            console.log(res.data.data)
            setProductData(res.data.data)
        }
        fetch()
    },[server])

    const handlerAddToBasket = async(id)=>{
        try {
            const res = await axios.post(`${server}/api/basket/add`,
                {productId: id},
                {withCredentials:true}
            )
            toast.success(res.data.message)
        } catch (error) {
            toast.error('Войдите в аккаунт')
            console.log(error.response.data.response)
        }
    }
    
    return (
        <div>
            {ProductData?.map((item,key)=>{
                return(
                    <div key={key}>
                        <p>{item.name}</p>
                        <button type="button"
                                className='btn'
                                onClick={()=>navigate(`/products/${item.id}`)}>
                            Подробнее
                        </button>
                        <button type="button"
                                className='btn'
                                onClick={()=>handlerAddToBasket(item.id)}>
                            Добавить в корзину
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Products