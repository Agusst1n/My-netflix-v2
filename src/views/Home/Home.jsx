import React from 'react';
import styles from './Home.module.css';
import mulan from '../../assets/images/name.png';
import { useEffect, useContext } from 'react';

//Router dom
import { useNavigate, useLocation } from 'react-router-dom';
import AuthenticationContext from '../../context/AuthenticationContext';

const Home = () => {
  const { setInHome } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      console.log('no user');
      navigate('/');
      return;
    } else {
      if (location.pathname.includes('/home')) {
        setInHome(true);
        console.log(location, 'location');
      }
    }
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.description}>
        <img src={mulan} alt="" width={270} />
        <div className={styles.movie_info}>
          <pre>2020 | 12+ | Action/Fantasy | 1h 55m </pre>
          <p>
            To keep her ailing father from serving in the Imperial Army, a
            fearless young woman disguises herself as a man and battles northern
            invaders in China.
          </p>
        </div>
        <div className={styles.buttons_container}>
          <button className={styles.button_play}>
            <ion-icon name="play"></ion-icon> Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
