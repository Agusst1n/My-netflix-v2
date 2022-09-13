import React, { useState, useEffect,useContext } from "react";
import Movie from "../../components/Movie/Movie";
import Loading from "../../components/Loading/Loading";
import styles from "./Movies.module.css";

//Router dom
import {useLocation, useNavigate} from 'react-router-dom'

//img ANK

import ank from "../../assets/images/avatar.jpg";
import avatarTitle from "../../assets/images/avatartitle.png";
import avatarVideo from '../../assets/videos/avatar.mp4'

import MoviesContext from "../../context/MovieContext";
import AuthenticationContext from "../../context/AuthenticationContext";

const Movies = () => {

  const {movies,setMovies, loading} = useContext(MoviesContext)
  const {setInHome} = useContext(AuthenticationContext)

  const navigate = useNavigate()
  const location = useLocation()
  
  const [pauseVideo, setPauseVideo] = useState(false)

  const onPlay = () => {
    console.log('playing video...');
  }

  const onPause = () => {
    console.log('pause video...');
    setPauseVideo(true)
  }


  useEffect(()=>{
    // if (!localStorage.getItem('user')){
    //   console.log('no user');
    //   navigate('/')
    //   return
    // }else{
      if(location.pathname.includes('/movies')){
        setInHome(false)
        // console.log(location, 'location');
      }
    // }
  },[])


  return (
    <>
      <div className={styles.movie_header}>
        {
          pauseVideo? <img src={ank} alt="" />
          :
          <video autoPlay={true} loop={false} onPlay={onPlay} onPause={onPause} muted>
            <source src={avatarVideo} type="video/mp4"/>
          </video>
        }
        <div className={styles.description}>
          <img src={avatarTitle} alt="" width={290} />
          <div className={styles.movie_info}>
            <pre>2010 | 12+ | Fantasy/Adventure | 1h 43m </pre>
            <p>
            The four nations of Air, Water, Earth and Fire lived in harmony until the Fire Nation declared war. A century later, there is still no end in sight to the destruction, then, an Avatar named Aang (Noah Ringer) discovers that he has the power to control the four elements. He joins forces with Katara (Nicola Peltz), a Waterbender, and her brother, Sokka, to restore balance and harmony to their world.
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
        <div className={styles.movies_container_title}>
          <h2>Most popular movies</h2>
        </div>
        <div className={styles.movies}>
          {loading?<Loading/> : movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
