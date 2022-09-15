import React from 'react'
import { Link } from 'react-router-dom';

import styles from './SimilarMovie.module.css'

const SimilarMovie = (movie) => {
    const img = `https://image.tmdb.org/t/p/w300${movie.movie.poster_path}`;
    // console.log(movie.movie, 'moviee')
  return (
    // <div className={styles.SimilarMovie}>
         <Link to={`/details/${movie.movie.id}`} >
            <img src={img} alt="" height={240}/>
        </Link>

    // </div>
  )
}

export default SimilarMovie