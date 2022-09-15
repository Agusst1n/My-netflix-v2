import React, { useContext } from 'react'
import styles from './Register.module.css'

import AuthenticationContext from '../../context/AuthenticationContext'

const Register = () => {

  const {handleChange,handleRegister} = useContext(AuthenticationContext)


  return (
    <div className={styles.register}>
        <form className={styles.form} onSubmit={handleRegister}>
          <h2>Register</h2>
            <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
            <input type="text" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="text" placeholder='Password' name='password' onChange={handleChange}/>
            <input type="text" placeholder='Repeat password' name='password2' onChange={handleChange}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default Register