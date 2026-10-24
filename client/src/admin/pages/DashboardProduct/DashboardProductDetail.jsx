import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardProductDetail = () => {
  const {id} = useParams()
  const [Product, setProduct] = useState();
  const [Image, setImage] = useState(null);
  // const [ShowProduct, setShowProduct] = useState();
  const server = useSelector((state)=>state.prod.link)
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async()=>{
      try {
        const res = await axios.get(`${server}/api/admin/products/${id}`,
          {withCredentials:true}
        )
        console.log(res.data.data)
        setProduct(res.data.data)
        // setShowProduct(res.data.data)
      } catch (error) {
        console.log(error.response.data.error)
      }
    } 
    fetch() 
  }, [server, id]);

  const handlerUpdate = async( id, changes) =>{
    const formData = new FormData()
    formData.append('name', changes.name)
    formData.append('description', changes.description)
    formData.append('price', changes.price)
    if(changes.image) formData.append('image', changes.image)

    const res = await axios.patch(`${server}/api/admin/products/${id}/update`,
        formData,
        {withCredentials:true}
    )
    window.location.reload()
    toast.success(res.data.message)

  }

  const handlerDelete = async(id)=>{
    if(!window.confirm('Вы уверены ?')) return
    const res = await axios.delete(`${server}/api/admin/products/${id}/delete`,
      {withCredentials:true}
    )
    setProduct(item => item.id === id)
    navigate('/admin/products')
    toast.success(res.data.message)
  }

  const change = (e) => {
    const {name, files, value} = e.target
    if(files){
      setImage(files[0])
      return
    }
    setProduct({...Product, [name]:value})
  }
  // const hasChange = JSON.stringify(Product) !== JSON.stringify(ShowProduct)

  return (
    <div>
      <div>
        <label htmlFor='name'>Название</label>
        <input id='name' type='text' name='name' value={Product?.name} onChange={change}/>
      </div>
      <div>
        <label htmlFor='description'>Описание</label>
        <input id='description' type='text' name='description' value={Product?.description} onChange={change}/>
      </div>
      <div>
        <label htmlFor='price'>Цена</label>
        <input id='price' type='text' name='price' value={Product?.price} onChange={change}/>
      </div>
      <div>
        <label htmlFor='image'>Изображение</label>
        <input id='image' type='file' name='image' accept='image/*' onChange={change}/>
      </div>
      <img src={`${server}/${Product?.image}`} alt={Product?.name} />
      
      <button type="button"
              className='btn'
              // disabled={hasChange ? false : true}
              onClick={()=>handlerUpdate(Product?.id, {
                name: Product?.name,
                description: Product?.description,
                price: Product?.price,
                image: Image
              })}>
          Сохранить
      </button>
      <button type="button"
              className='btn'
              onClick={()=>handlerDelete(Product?.id)}>
         Удалить
      </button>
    </div>
  )
}

export default DashboardProductDetail