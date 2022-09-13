import React, { useContext } from 'react'
import styles from './Login.module.css'

import AuthenticationContext from '../../context/AuthenticationContext'

const Login = () => {

  const {handleChange,handleLogin} = useContext(AuthenticationContext)


  return (
    <div className={styles.login}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
            <input type="text" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="text" placeholder='Password' name='password' onChange={handleChange}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default Login