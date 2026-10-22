import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'

const DashboardCategoryDetail = () => {
    const {id} = useParams()
    const [Category, setCategory] = useState();
    const [Image, setImage] = useState(null);
    const server = useSelector((state)=>state.prod.link)
    useEffect(() => {
        const fetch = async()=>{
            const res = await axios.get(`${server}/api/admin/category/${id}`,
                {withCredentials:true}
            )
            console.log(res.data.data)
            setCategory(res.data.data)
        }
        fetch()
    }, [server, id]);

    const change = (e) => {
        const {name,value, files} = e.target
        if(files){
            setImage(files[0]) 
            return
        }
        setCategory({...Category, [name]:value})
    }

    const handleUpdate = async( id, changes) =>{
        const formData = new FormData()
        formData.append('name', changes.name)
        formData.append('description', changes.description)
        if(changes.image) formData.append('image', changes.image)

        const res = await axios.patch(`${server}/api/admin/category/${id}/update`,
            formData,
            {withCredentials:true}
        )
        toast.success(res.data.message)
        console.log(res.data.message)
        window.location.reload()
    }

    return (
        <div>
            <div>
                <label htmlFor='name'>Название</label>
                <input name="name" id="name" type="text" value={Category?.name} onChange={change}/>
            </div>

            <div>
                <label htmlFor='description'>Описание</label>
                <input name="description" id="description" type="text" value={Category?.description} onChange={change}/>
            </div>

            <div>
                <img src={`${server}/${Category?.image}`} alt="" />
                <label htmlFor='image'>Изменить изображение</label>
                <input name="image" id="image" type="file" accept='image/*' 
                        onChange={change}/>
            </div>

            <button type="button"
                    className='btn'
                    onClick={() => handleUpdate(Category.id, {
                        name: Category.name,
                        description: Category.description,
                        image: Image,
                    })}>
                Сохранить изменения
            </button>
        </div>
    )
}

export default DashboardCategoryDetail