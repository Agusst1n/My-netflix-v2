import React from 'react';
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

const Navbar = () => {
  const { isLogin, setIsLogin } = useContext(MoviesContext);
  const { inHome } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleClose = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    setIsLogin(false);
    navigate('/');
    return;
  };

  return (
    <div className={styles.Nav_contain}>
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
