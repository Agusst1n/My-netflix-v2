import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.png';
import Search from '../Search/Search';

//Import Link from react-router-dom
import { Link } from 'react-router-dom';
//Router dom
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import MoviesContext from '../../context/MovieContext';
import AuthenticationContext from '../../context/AuthenticationContext';

//React ICONS

import { FaAlignRight } from "react-icons/fa";
// import { GrClose } from "react-icons/gr";
import Favourite from '../Favourite/Favourite';

const Navbar = () => {
  const { isLogin, setIsLogin, favouriteMovies , getData, pushingFav, setPushingFav} = useContext(MoviesContext);
  const [navbarON, setNavbarON] = useState(false)
  const { inHome } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleClose = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    setIsLogin(false);
    navigate('/');
    return;
  };

  const navbarVisibility = () =>{
    setNavbarON(!navbarON)
  }



  useEffect(()=>{
    if(pushingFav){
      getData()
      setPushingFav(false)
    }else{
      console.log('es false');
    }
  },[pushingFav])

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to={'/movies'}>
          <img src={logo} alt="" width={114} />
        </Link>
      </div>
      {isLogin ? (
        <div className={styles.nav_contain}>
          <nav className={styles.navbar}>
            <ul className={styles.navbar_list}>
              <li className={styles.navbar_item}>
                <Link to="/home">Home</Link>
              </li>
              <li className={styles.navbar_item}>
                <Link to="/movies">Movies</Link>
              </li>
            </ul>
          </nav>
          {inHome ? '' : <Search />}
          <button className={styles.close} onClick={handleClose}>
            Close sesion
          </button>
          <div className={styles.menu_icon} onClick={navbarVisibility}>
            <FaAlignRight size={25}/>
          </div>
          <div className={navbarON ? styles.sidebarON : styles.sidebarOFF}>
              <div className={styles.sidebar_menu_icon} onClick={navbarVisibility}>
                <FaAlignRight size={25}/>
              </div>
              <div className={styles.sidebar_yourFavsMovies}>
                  <Link to="/home" className={styles.your_favoritesLink}>Home</Link>
                  <Link to="/movies" className={styles.your_favoritesLink}>Movies</Link>
                  <button onClick={handleClose} className={styles.your_favoriteClose}>
                    Close sesion
                  </button>                  
                  <div className={styles.fav_name}>
                    <p>Yours favs movies</p>
                  </div>
                  {
                    favouriteMovies.map((movie)=><Favourite data={movie} key={movie.fav.id}/>)
                  }
              </div>
          </div>
        </div>
      ) : (
        <div className={styles.account_links_container}>
          <Link to="/" className={styles.account_links}>Login</Link>
          <Link to="/register" className={styles.account_links}>Register</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
