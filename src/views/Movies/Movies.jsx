import React, { useState } from "react";
import { useEffect } from "react";
import Movie from "../../components/Movie/Movie";
import Loading from "../../components/Loading/Loading";
import styles from "./Movies.module.css";

//Router dom
import {useNavigate} from 'react-router-dom'

//img ANK

import ank from "../../assets/images/avatar.jpg";
import avatarTitle from "../../assets/images/avatartitle.png";
import avatarVideo from '../../assets/videos/avatar.mp4'

import { useContext } from "react";
import MoviesContext from "../../context/MovieContext";

const Movies = () => {

  const navigate = useNavigate()
  
  const [pauseVideo, setPauseVideo] = useState(false)

  const onPlay = () => {
    console.log('playing video...');
  }

  const onPause = () => {
    console.log('pause video...');
    setPauseVideo(true)
  }


  useEffect(()=>{
    if (!localStorage.getItem('user')){
      console.log('no user');
      navigate('/')
      return
    }
  },[])

  const {movies,setMovies, loading} = useContext(MoviesContext)

  return (
    <>
      <div className={styles.movie_header}>
        {
          pauseVideo? <img src={ank} alt="" />
          :
          <video autoPlay={true} loop={false} onPlay={onPlay} onPause={onPause}>
            <source src={avatarVideo} type="video/mp4"/>
          </video>
        }
        <div className={styles.description}>
          <img src={avatarTitle} alt="" width={290} />
          <div className={styles.movie_info}>
            <pre>2020 | 12+ | 1h 55 min | Action </pre>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              officia praesentium culpa beatae earum ipsam error quibusdam
              molestias eaque, laudantium, porro atque, iste esse assumenda
              aliquam nesciunt. Ex, sed dicta.
            </p>
          </div>
          <div className={styles.buttons_container}>
            <button className={styles.button_play}>
              <ion-icon name="play"></ion-icon> Play
            </button>
          </div>
        </div>
      </div>

      <div className={styles.movies_container}>
        {loading?<Loading/> : movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Movies;
