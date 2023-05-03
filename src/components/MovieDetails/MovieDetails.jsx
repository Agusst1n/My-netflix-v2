import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MoviesContext from '../../context/MovieContext';

import styles from './MovieDetails.module.css';
import AuthenticationContext from '../../context/AuthenticationContext';
import SimilarMovie from '../SimilarMovie/SimilarMovie';

const MovieDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  //!EN VEZ DE FILTRAR  DE ENTRE TODAS LAS PELICULAS LA QUE TIENE EL ID QUE TOQUE
  //!VOY A HACER UNA PETICION A LA API CON LA ID DE LA PELICULA QUE QUIERO

  const { movies, reviews, getSimilarMovies, similarMovies } =
    useContext(MoviesContext);
  const { setInHome } = useContext(AuthenticationContext);

  const [movieActual, setMovieActual] = useState([]);

  const getMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3d9d528c10bd10aab1dcbcd5f1f8f9bf&language=en-US`
      );
      const data = await res.json();

      setMovieActual(data);
    } catch (error) {}
  };

  useEffect(() => {
    getMovie();
    getSimilarMovies(id);
    if (location.pathname.includes('/details')) {
      setInHome(true);
    }
  }, [movies, reviews, id]);

  const img = `https://image.tmdb.org/t/p/w300${movieActual?.poster_path}`;

  return (
    <div className={styles.movieDetails_container}>
      <div className={styles.movieDetails}>
        <div className={styles.movieImage}>
          <img src={img} alt="" width={250} />
        </div>
        <div className={styles.details}>
          <h2>{movieActual?.original_title}</h2>
          <p>Description: {movieActual?.overview}</p>
          <p>Popularity: {movieActual?.popularity}</p>
          <p>Rating: {movieActual?.vote_average}</p>
        </div>
      </div>

      {/* Similar movies */}
      <div className={styles.blobTOP}></div>
      <div className={styles.similarMovies_container}>
        {similarMovies.map((movie) => (
          <SimilarMovie movie={movie} key={movie.id} />
        ))}
      </div>
      <div className={styles.blobDOWN}></div>
    </div>
  );
};

export default MovieDetails;
