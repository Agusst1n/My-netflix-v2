import React, { useContext } from 'react'
import styles from './Login.module.css'

import AuthenticationContext from '../../context/AuthenticationContext'

const Login = () => {

  const {handleChange,handleLogin} = useContext(AuthenticationContext)


  return (
    <div className={styles.login}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2>Login</h2>
            <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
            <input type="text" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="text" placeholder='Password' name='password' onChange={handleChange}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default Login