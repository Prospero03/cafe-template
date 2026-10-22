import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardUserDetail = () => {
    const {id} = useParams()
    const [User, setUser] = useState();
    const [SaveUser, setSaveUser] = useState();
    const server = useSelector((state)=>state.prod.link)

    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get(`${server}/api/admin/users/${id}`,
                {withCredentials: true}
            )
            console.log(res.data.data)
            setUser(res.data.data)
            setSaveUser(res.data.data)
        }
        fetch()
    },[server, id])

    const handleUpdate = async(id, changes) => {
        try {
            const res = await axios.patch(`${server}/api/admin/users/${id}/update`,
                changes,
                {withCredentials:true}
            )
            toast.success(res.data.message)
        } catch (error) {
            console.log(error.response.data.error)
        }    
    }
    

    const change = (e) => {
        const {name, value, files} = e.target 
        setUser({...User, [name]:files ? files[0] : value})
    }

    const hasChange = JSON.stringify(User) !== JSON.stringify(SaveUser)

    return (
        <div>
            <form>

                <div>
                    <label htmlFor='login'>Логин</label>
                    <input id="login" value={User?.login ?? ''} name='login' type="text" onChange={change}/>
                </div>

                <button type="button"
                        className='btn'
                        disabled={hasChange ? false : true}
                        onClick={()=> handleUpdate(User.id, {
                            login: User.login,
                            given_name: User.given_name,
                            family_name: User.family_name,
                            additional_name: User.additional_name,
                            gender: User.gender,
                            city: User.city,
                            street: User.street,
                            entrance: User.entrance,
                            house: User.house,
                            apartment: User.apartment
                        })}>
                    Сохранить
                </button>
            </form>
        </div>
    )
}

export default DashboardUserDetail