import React, { useEffect, useState } from 'react'
import './Basket.scss'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {toast} from 'react-toastify'

const Basket = () => {
    const server = useSelector((state)=>state.prod.link)
    const [BasketData, setBasketData] = useState();
    const [orderData, setOrderData] = useState(false);

    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`${server}/api/basket/index`,
                {withCredentials:true}
            )
            console.log(res.data.data)
            setBasketData(res.data.data)
        }
        fetch()
    },[server])

    const handlerAction = async(id, action) => {
        await axios.post(`${server}/api/basket/${action}`,
            {productId: id},
            {withCredentials:true}
        )
        const res = await axios.get(`${server}/api/basket/index`,
            {withCredentials:true}
        )
        setBasketData(res.data.data)
    }

    const handlerOrder = async()=>{
        setOrderData(true)
        try {
            const res = await axios.post(`${server}/api/orders/store`,
                {},
                {withCredentials:true}
            )
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.error)   
        }
    }

    return (
        <div>
            <h1>Корзина</h1>
            {BasketData !== undefined && !BasketData?.products?.length && (
                <p>Корзина пустая</p>
            )}
            {BasketData?.products?.map((item,key)=>{
                return(
                    <div key={key}>
                        {item.name}

                        <div>
                            <button type="button"
                                    className='btn'
                                    onClick={()=> {
                                    if(item?.basket_products?.quantity === 1 && !window.confirm('Удалить товар из корзины ?')) 
                                        return
                                    handlerAction(item.id, 'decreare')}
                                    }>
                                -
                            </button>
                            
                            <span>{item?.basket_products?.quantity}</span>
                            <button type="button"
                                    className='btn'
                                    onClick={()=> handlerAction(item.id, 'add')}>
                                +
                            </button>
                        </div>
                    </div>
                )
            })}

            <button type="button"
                    className='btn'
                    onClick={()=>handlerOrder()}>
                Оформить заказ
            </button>
        </div>
    )
}

export default Basket