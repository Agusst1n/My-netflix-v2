import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SimilarMovie.module.css';

const SimilarMovie = (movie) => {
  const img = `https://image.tmdb.org/t/p/w300${movie.movie.poster_path}`;
  return (
    <Link to={`/details/${movie.movie.id}`}>
      <div className={styles.SimilarMovie}>
        <img src={img} alt="" height={240} />
      </div>
    </Link>
  );
};

export default SimilarMovie;
