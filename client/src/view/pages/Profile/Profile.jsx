import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const [UserData, setUserData] = useState();
    const [SaveData, setSaveData] = useState();
    const server = useSelector((state)=> state.prod.link)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetch = async()=>{
            try {
                const res = await axios.get(`${server}/api/user/profile`,
                    {withCredentials:true}
                )
                setUserData(res.data.data)
                setSaveData(res.data.data)
                console.log(res.data.data)
            } catch (error) {
                navigate('/login')
            }
            
        }
        fetch()
    },[server, navigate])

    const handlerUpdate = async(id, changes) =>{
        const res = await axios.patch(`${server}/api/user/all/${id}/update`, 
            changes, 
            {withCredentials:true}
        )
        toast.success(res.data.message)
    }

    const change = (e) => {
        const {name, value, files} = e.target
        setUserData({...UserData, [name]:files ? files[0] : value})
    }

    const hasChange = JSON.stringify(UserData) !== JSON.stringify(SaveData)
    const user = UserData
    

    return (
        <section className='profile-block'>
            <h1 className='profile-block__title'>
                Личный кабинет
            </h1>

            <div className='profile-block__wrap'>
                <h2 className='profile-block__subtitle'>
                    Личная информация
                </h2>
                <form className='profile-block__form'>
                    <div className='profile-block__field'>
                        <label>Имя</label>
                        <input  type="text" name="name" 
                                value={user?.name} onChange={change}
                                autoComplete='given-name'/>
                    </div>
                    <div className='profile-block__field'>
                        <label>Фамилия</label>
                        <input  type="text" name="surname" 
                                value={user?.surname} onChange={change}
                                autoComplete='family-name'/>
                    </div>
                    <div className='profile-block__field'>
                        <label>Отчество</label>
                        <input  type="text" name="patronym" 
                                value={user?.patronym} onChange={change}
                                autoComplete='additional-name'/>
                    </div>
                    <div className='profile-block__field--checkbox'>
                        <div>
                            <label>Мужской</label> 
                            <input type='checkbox' name='gender' value='man' 
                                checked={user?.gender === 'man'}
                                onChange={change}/>
                        </div>
                        <div>
                            <label>Женский</label> 
                            <input type='checkbox' name='gender' value='woman' 
                                checked={user?.gender === 'woman'}
                                onChange={change}/>
                        </div>
                    </div>
                </form>   
            </div>
            
            <div className='profile-block__wrap'>
                <h2 className='profile-block__subtitle'>
                    Адрес
                </h2>
                <form className='profile-block__form'>
                    <div className='profile-block__field'>
                        <label>Город</label>
                        <input  type="text" name="city" 
                                value={user?.city} onChange={change}/>
                    </div>
                    <div className='profile-block__field'>
                        <label>Адрес</label>
                        <input  type="text" name="address" 
                                value={user?.address} onChange={change}/>
                    </div>
                    <div className='profile-block__field'>
                        <label>Дом</label>
                        <input  type="text" name="house" 
                                value={user?.house} onChange={change}/>
                    </div>
                    <div className='profile-block__field'>
                        <label>Квартира</label>
                        <input  type="text" name="apartment" 
                                value={user?.apartment} onChange={change}/>
                    </div>
                </form>
            </div>

            <button className='btn'
                    type="button" 
                    disabled={hasChange ? false : true}
                    onClick={()=> handlerUpdate(user?.id, { 
                        name: user.name,
                        surname: user.surname,
                        patronym: user.patronym,
                        gender: user.gender,
                        city: user.city,
                        address: user.address,
                        house: user.house,
                        apartment: user.apartment
                    })}>
                Сохранить
            </button>
        </section>
    )
}

export default Profile