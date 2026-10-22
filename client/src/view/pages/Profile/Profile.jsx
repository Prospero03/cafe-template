import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions } from '../../../store/authSlice';

if( typeof window !== 'undefined'){
    require('./Profile.scss')
}

const Profile = () => {
    const [UserData, setUserData] = useState();
    const [SaveData, setSaveData] = useState();

    const server = useSelector((state)=> state.prod.link)
    const dispatch = useDispatch()

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
        navigate('/')
    }

    const handleLogout = async() =>{
        const res = await axios.post(`${server}/api/user/logout`,
            '',
            {withCredentials:true}
        )
        dispatch(authActions.logout())
        toast.success(res.data.message)
    }

    const change = (e) => {
        const {name, value, files} = e.target
        setUserData({...UserData, [name]:files ? files[0] : value})
    }

    const hasChange = JSON.stringify(UserData) !== JSON.stringify(SaveData)
    const user = UserData


    return (
        <section className='profile-block container'>
            <h1 className='profile-block__title'>
                Личный кабинет
            </h1>

            <div className='profile-block__wrap'>
                <h3 className='profile-block__subtitle'>
                    Личная информация
                </h3>
                <form className='profile-block__form'>
                    <div className='profile-block__field'>
                        <label  htmlFor='given_name'>Имя</label>
                        <input  id='given_name'
                                type='text' name='given_name'
                                value={user?.given_name ?? ''} onChange={change}
                                autoComplete='given-name'/>
                    </div>
                    <div className='profile-block__field'>
                        <label  htmlFor='family_name'>Фамилия</label>
                        <input  id='family_name'
                                type='text' name='family_name'
                                value={user?.family_name ?? ''} onChange={change}
                                autoComplete='family-name'/>
                    </div>
                    <div className='profile-block__field'>
                        <label  htmlFor='additional_name'>Отчество</label>
                        <input  id='additional_name'
                                type='text' name='additional_name'
                                value={user?.additional_name ?? ''} onChange={change}
                                autoComplete='additional-name'/>
                    </div>
                    <div className='profile-block__field--checkbox'>
                        <p>Пол</p>
                        <div className='profile-block__field--checkbox-wrap'>
                            <div className='profile-block__field--checkbox-item'>
                                <input  id='man'
                                        type='checkbox' name='gender' value='man'
                                        checked={user?.gender === 'man'}
                                        onChange={change}/>
                                <label  htmlFor='man'>Мужской</label>

                            </div>
                            <div className='profile-block__field--checkbox-item'>
                                <input  id='woman'
                                        type='checkbox' name='gender' value='woman'
                                        checked={user?.gender === 'woman'}
                                        onChange={change}/>
                                <label  htmlFor='woman'>Женский</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className='profile-block__wrap'>
                <h3 className='profile-block__subtitle'>
                    Адрес
                </h3>
                <form className='profile-block__form'>
                    <div className='profile-block__field'>
                        <label  htmlFor='city'>Город</label>
                        <input  id='city' type='text' name='city'
                                value={user?.city ?? ''} onChange={change}
                                autoComplete='address-level2'/>
                    </div>
                    <div className='profile-block__field'>
                        <label  htmlFor='street'>Улица</label>
                        <input  id='street' type='text' name='street'
                                value={user?.street ?? ''} onChange={change}
                                autoComplete='address-line1'/>
                    </div>
                    <div className='profile-block__field'>
                        <label  htmlFor='entrance'>Подьезд</label>
                        <input  id='entrance' type='text' name='entrance'
                                value={user?.entrance ?? ''} onChange={change}/>
                    </div>
                    <div className='profile-block__field'>
                        <label  htmlFor='house'>Дом</label>
                        <input  id='house' type='text' name='house'
                                value={user?.house ?? ''} onChange={change}
                                autoComplete='address-line2'/>
                    </div>
                    <div className='profile-block__field'>
                        <label  htmlFor='apartment'>Квартира</label>
                        <input  id='apartment' type='text' name='apartment'
                                value={user?.apartment ?? ''} onChange={change}
                                autoComplete='address-line3'/>
                    </div>
                </form>
            </div>

            <button className='btn'
                    type='button'
                    disabled={hasChange ? false : true}
                    onClick={()=> handlerUpdate(user?.id, {
                        given_name: user.given_name,
                        family_name: user.family_name,
                        additional_name: user.additional_name,
                        gender: user.gender,
                        city: user.city,
                        street: user.street,
                        entrance: user.entrance,
                        house: user.house,
                        apartment: user.apartment
                    })}>
                Сохранить
            </button>

            <button className='btn'
                    type='button'
                    onClick={()=>handleLogout()}>
                    Выйти из аккаунта
            </button>
        </section>
    )
}

export default Profile
