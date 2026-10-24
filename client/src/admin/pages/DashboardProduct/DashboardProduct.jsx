import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardProduct = () => {
    const [Inputs, setInputs] = useState({
      name: '',
      description: '',
      price: '0',
      image: null
    });
    const [Products, setProducts] = useState();
    const server = useSelector((state)=>state.prod.link)
    const navigate = useNavigate()
    const change = (e) => {
      const {name, files, value} = e.target
      setInputs({...Inputs, [name]:files ? files[0] : value})
    }
    const handleCreate = async(e) => {
      e.preventDefault()
      const formData = new FormData()

      formData.append('name', Inputs.name)
      formData.append('description', Inputs.description)
      formData.append('price', Inputs.price)
      if(Inputs.image)formData.append('image', Inputs.image)

      try {
        const res = await axios.post(`${server}/api/admin/products/create`,
          formData,
          {withCredentials: true}
        )
        toast.success(res.data.message)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }

    useEffect(()=>{
      const fetch = async()=> {
        const res = await axios.get(`${server}/api/admin/products`,
          {withCredentials:true}
        )
        setProducts(res.data.data)
        console.log(res.data.data)
      }
      fetch()
    },[server])

    return (
      <div>
        <form onSubmit={handleCreate}>
          <div>
            <label htmlFor='name'>Название</label>
            <input id='name' type='text' name='name' value={Inputs.name} onChange={change} required/>
          </div>
          <div>
            <label htmlFor='description'>Описание</label>
            <input id='description' type='text' name='description' value={Inputs.description} onChange={change} required/>
          </div>
          <div>
            <label htmlFor='price'>Цена</label>
            <input id='price' type='text' name='price' value={Inputs.price} onChange={change} required/>
          </div>
          <div>
            <label htmlFor='image'>Изображение</label>
            <input id='image' type='file' name='image' accept='image/*' onChange={change} required/>
          </div>
          <button type='submit'>
            Создать товар
          </button>
        </form>
        <div>
          {Products?.map((item,key)=>{
            return(
              <div key={key}>
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <img src={`${server}/${item.image}`} alt={item.name} />
                <button type="button"
                        onClick={()=> navigate(`/admin/products/${item.id}`)}>
                  Посмотреть
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
}

export default DashboardProduct