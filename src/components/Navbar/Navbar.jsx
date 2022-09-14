import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.png';
import Search from '../Search/Search';

//Import Link from react-router-dom
import { Link } from 'react-router-dom';
//Router dom
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import MoviesContext from '../../context/MovieContext';
import AuthenticationContext from '../../context/AuthenticationContext';

//React ICONS

import { FaAlignRight } from "react-icons/fa";
import { useEffect } from 'react';

const Navbar = () => {
  const { isLogin, setIsLogin, favouriteMovies , getData, pushFavouriteMovies, pushingFav, setPushingFav} = useContext(MoviesContext);
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
                  <div className={styles.fav_name}>
                    <p>Yours favs movies</p>
                  </div>
                  {
                    favouriteMovies.map((movie)=><div className={styles.fav_movie} key={movie.fav.id}>
                      <img src={movie.fav.img} alt="" width={50}/>
                      <p>{movie.fav.movieFav}</p>
                      {/* <p>{movie.fav.id}</p> */}
                    </div>)
                  }
                  {/* <div className={styles.fav_movie}>
                    <img src="https://image.tmdb.org/t/p/w300/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg" alt="" width={50}/>
                  </div> */}
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
