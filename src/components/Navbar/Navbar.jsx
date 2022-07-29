import React from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/images/logo.png'
import Search from '../Search/Search';

//Import Link from react-router-dom
import { Link } from "react-router-dom";
//Router dom
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import MoviesContext from '../../context/MovieContext';

const Navbar = () => {

  const {isLogin, setIsLogin} = useContext(MoviesContext)

  const navigate = useNavigate()

  const handleClose = ()=>{
    localStorage.removeItem('user')
    setIsLogin(false)
    navigate('/')
    return
  }

  return (
    <div className={styles.Nav_contain}>
        <div className={styles.logo}>
           <Link to={'/movies'}><img src={logo} alt="" width={114}/></Link> 
        </div>
        <div className={styles.nav_contain}>
            <nav className={styles.navbar}>
                <ul className={styles.navbar_list}>
                    <li className={styles.navbar_item}>
                        {isLogin && <Link to='/home' >Home</Link>}
                    </li>
                    <li className={styles.navbar_item}>
                        {isLogin && <Link to='/movies'>Movies</Link>}
                    </li>
                    {/* <li className={styles.navbar_item}>
                        
                    </li> */}
                </ul>
            </nav>
            {/* <input type="text" placeholder='Buscador' className={styles.search}/> */}
            {isLogin && <Search/>}
            {isLogin && <button className={styles.close} onClick={handleClose}>Close sesion</button>}
        </div>
    </div>
  )
}

export default Navbar