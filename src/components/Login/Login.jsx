import React, { useContext } from 'react'
import { useState } from 'react'
import styles from './Login.module.css'

//Router dom
import {useNavigate} from 'react-router-dom'
import MoviesContext from '../../context/MovieContext'

const Login = () => {

  const {setIsLogin} = useContext(MoviesContext)


  const navigate = useNavigate()
  
  const [data, setData] = useState(localStorage.getItem('user') || {
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if(Object.values(data).includes('')) {
        alert('Debes llenar los campos')
        return
    }else{
        localStorage.setItem('user', JSON.stringify(data))
        setIsLogin(true)
        navigate('/home')
    }
    // console.log(data);
  }

  const handleChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }

  return (
    <div className={styles.login}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="text" placeholder='Password' name='password' onChange={handleChange}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default Login