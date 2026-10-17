import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'

const Register = () => {
    const [Inputs, setInputs] = useState({
        login: '', email: '', password: '',
    });
    const [ShowPassword, setShowPassword] = useState(false);
    const server =useSelector((state)=>state.prod.link)
    const navigate = useNavigate()
    const change = (e) => {
        const {name, value} = e.target
        setInputs({...Inputs, [name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const res = await axios.post(`${server}/api/user/register`,
            Inputs, 
            {withCredentials: true}
        )
        navigate('/login')
        toast.success(res.data.message)
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div>
                    <label>Логин</label>
                    <input type="text" value={Inputs.login} name="login" required onChange={change}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={Inputs.email} name="email" required onChange={change}/>
                </div>
                <div>
                    <label>Пароль</label>
                    <input type={ShowPassword ? 'text' : 'password'} value={Inputs.password} name="password" required onChange={change}/>
                    <button type='button' onClick={() => setShowPassword(!ShowPassword)}>
                        {ShowPassword ? 'скрыть' : 'показать'}
                    </button>
                </div>
                <button>Зарегистроваться</button>
            </form>
        </div>
    )
}

export default Register