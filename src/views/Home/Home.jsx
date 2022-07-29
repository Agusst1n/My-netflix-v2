import React from 'react'
import styles from './Home.module.css'
import mulan from '../../assets/images/name.png'
import { useEffect } from 'react'

//Router dom
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()


  useEffect(()=>{
    if (!localStorage.getItem('user')){
      console.log('no user');
      navigate('/')
      return
    }
  },[])

  return (
    <div className={styles.home}>
        <div className={styles.description}>
          <img src={mulan} alt="" width={270}/>
          <div className={styles.movie_info}>
            <pre>2020 | 12+ | 1h 55 min | Action </pre>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus officia praesentium culpa beatae earum ipsam error quibusdam molestias eaque, laudantium, porro atque, iste esse assumenda aliquam nesciunt. Ex, sed dicta.</p>
          </div>
          <div className={styles.buttons_container}>
              <button className={styles.button_play}><ion-icon name="play"></ion-icon> Play</button>
          </div>
        </div>
    </div>
  )
}

export default Home