import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashboardCategory = () => {
    const [Inputs, setInputs] = useState({
        name : '',
        description : '',
        image: null
    });
    const [Category, setCategory] = useState();
    const server = useSelector((state)=>state.prod.link)
    const navigate = useNavigate()

    const handlerCreate = async(e)=>{
        e.preventDefault()
        const formData = new FormData()

        formData.append('name', Inputs.name);
        formData.append('description', Inputs.description);
        formData.append('image', Inputs.image);

        try {
            const res = await axios.post(`${server}/api/admin/category/create`,
                formData,
                {withCredentials: true}
            )
            window.location.reload()
            console.log(res.data.message);
            toast.success(res.data.message);
            
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    const change = (e) => {
        const {name, value, files} = e.target
        setInputs({...Inputs, [name]:files ? files[0] : value})
    }

    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`${server}/api/admin/category`,
                {withCredentials:true}
            )
            setCategory(res.data.data)
            console.log(res.data.data)
        }
        fetch()
    },[server])

    return (
        <div>
            <h1>Категории</h1>
            <form onSubmit={handlerCreate}>
                <h2>Создание Категории</h2>
                <div>
                    <label htmlFor='name'>Название</label>
                    <input  id="name" value={Inputs.name} 
                            name="name" onChange={change} required/>
                </div>
                <div>
                    <label htmlFor='description'>Описание</label>
                    <input  id="description" value={Inputs.description} 
                            name="description" onChange={change} required/>
                </div>
                <div>
                    <label htmlFor='image'>Изображение</label>
                    <input  id="image" type="file" name="image" 
                            accept='image/*' onChange={change} required/>
                </div>
                <button type="submit">Создать категорию</button>
            </form>
            {Category?.map((item, key)=>{
                return(
                    <div key={key}>
                        <p>{item?.name}</p>
                        <p>{item?.description}</p>
                        <img    style={{height: '100px'}}
                                src={`${server}/${item?.image}`} 
                                alt={item?.name}/>
                        <button type="button"
                                onClick={()=>navigate(`/admin/category/${item?.id}`)}>
                            Посмотреть
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default DashboardCategory