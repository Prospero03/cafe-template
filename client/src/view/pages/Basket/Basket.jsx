import React, { useEffect, useState } from 'react'
import './Basket.scss'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Basket = () => {
    const server = useSelector((state)=>state.prod.link)
    const [BasketData, setBasketData] = useState();

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
        </div>
    )
}

export default Basket