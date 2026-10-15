import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [Inputs, setInputs] = useState();
    const server =useSelector((state)=>state.prod.link)
    const navigate = useNavigate()
    const change = (e) => {
        const {name, value} = e.target
        setInputs({...Inputs, [name]:value})
    }
    
    return (
        <div>Register</div>
    )
}

export default Register