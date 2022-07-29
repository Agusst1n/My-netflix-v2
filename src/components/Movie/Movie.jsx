import React from 'react'
import styles from './Movie.module.css'

//import Link react-router-dom
import { Link } from "react-router-dom";


const Movie = ({movie}) => {
  
  const img = `https://image.tmdb.org/t/p/w300${movie.poster_path}`  
    
  return (
    <div className={styles.movie}>
        {/* <p>{movie.title}</p> */}
        <Link to={`/details/${movie.id}`}>
          <img src={img} alt="" width={230} />
        </Link>
    </div>
  )
}

export default Movie