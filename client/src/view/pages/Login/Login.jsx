import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'
import { authActions } from '../../../store/authSlice';

const Login = () => {
    const [Inputs, setInputs] = useState({
        login: '',  password: '',
    });
    const [ShowPassword, setShowPassword] = useState(false);
    const server =useSelector((state)=>state.prod.link)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const change = (e) => {
        const {name, value} = e.target
        setInputs({...Inputs, [name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
          const res = await axios.post(`${server}/api/user/login`,
            Inputs, 
            {withCredentials: true}
        )
        dispatch(authActions.login())
        if(res.data.role === 'user'){
            navigate('/profile')
        }else if(res.data.role === 'admin'){
            navigate('/admin')
        }
          
          console.log(res.data.role)
          toast.success(res.data.message)
        } catch (error) {
          toast.error(error.response.data.error)
        }
        
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Авторизация</h1>
                <div>
                    <label>Логин</label>
                    <input type="text" value={Inputs.login} name="login" required onChange={change}/>
                </div>
                <div>
                    <label>Пароль</label>
                    <input type={ShowPassword ? 'text' : 'password'} value={Inputs.password} name="password" required onChange={change}/>
                    <button type='button' onClick={() => setShowPassword(!ShowPassword)}>
                        {ShowPassword ? 'скрыть' : 'показать'}
                    </button>
                </div>
                <button>Войти</button>
            </form>
        </div>
    )
}

export default Login