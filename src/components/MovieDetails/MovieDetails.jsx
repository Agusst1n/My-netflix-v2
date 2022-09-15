import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import MoviesContext from '../../context/MovieContext'

import iconUser from '../../assets/images/iconUser.png'
import { AiOutlineCloseCircle } from 'react-icons/ai';


import styles from './MovieDetails.module.css'
import AuthenticationContext from '../../context/AuthenticationContext'
import SimilarMovie from '../SimilarMovie/SimilarMovie'

const MovieDetails = () => {

  const location = useLocation()
  const {id} = useParams()

  //!EN VEZ DE FILTRAR  DE ENTRE TODAS LAS PELICULAS LA QUE TIENE EL ID QUE TOQUE
  //!VOY A HACER UNA PETICION A LA API CON LA ID DE LA PELICULA QUE QUIERO

  const {movies,reviews,setReviews,getSimilarMovies,similarMovies,setSimilarMovies} = useContext(MoviesContext)
  const {setInHome} = useContext(AuthenticationContext)

  const [load, setLoad] = useState(false)
  const [movieActual, setMovieActual] = useState([])
  const [reviewActual, setReviewActual] = useState([])

  let username = localStorage.getItem('username') || ''

  const getMovie = async() =>{
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3d9d528c10bd10aab1dcbcd5f1f8f9bf&language=en-US`)
      const data = await res.json()
      console.log(data, 'movie actual');

      setMovieActual(data)
    } catch (error) {
      
    }
  }

  // const getById = () =>{
  //   const movieActual = movies?.filter(movie=> movie.id == id)
  //   setMovieActual(movieActual);
  // }

  const getReview = () =>{
    const reviewActual = reviews?.filter(review => review.idMovie == id)
    setReviewActual(reviewActual);
  }

  useEffect(() => {
    
    // getById()
    getReview()
    getMovie()
    getSimilarMovies(id)
    if(location.pathname.includes('/details')){
      setInHome(true)
      console.log(location, 'location');
    }

  }, [movies, reviews, id])
  

  // console.log(movies, 'moviees');
  // console.log(movieActual, 'movieActual');
  // console.log(reviews, 'reviews');

  const img = `https://image.tmdb.org/t/p/w300${movieActual?.poster_path}`  

  // const handleChange = (e) => {
  //   setReviews(e.target.value);
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value, 'el value');
    setReviews([...reviews,{id:reviews.length,idMovie:movieActual[0].id, review:e.target[0].value}])
  }

  const deleteReview = (id) => {
    console.log(id, 'el id');

    const reviewsFiltradas = reviews?.filter(review => review.id !== id)

    console.log(reviewsFiltradas);
    setReviews(reviewsFiltradas)

  }

  return (
    
    <div className={styles.movieDetails_container}>
      {/* <p>{id}</p> */}
      <div className={styles.movieDetails}>
        <div className={styles.movieImage}>
          <img src={img} alt="" width={250}/>
        </div>
        <div className={styles.details}>
          {/* {
            // load? <h1>Cargando</h1> : <p>{movieActual[0]?.title}</p>
          } */}
          <h2>{movieActual?.original_title}</h2>
          <p>Description: {movieActual?.overview}</p>
          <p>Popularity: {movieActual?.popularity}</p> 
          <p>Rating: {movieActual?.vote_average}</p>
        </div>
      </div>

      {/* Similar movies */}
      <div className={styles.similarMovies_container}>
        {
          similarMovies.map((movie)=><SimilarMovie movie={movie} key={movie.id}/>)
        }
          
      </div>

      {/* Movie Comments */}

      <div className={styles.comments}>
        <h3 className={styles.titleComments}>Movie comments</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Comment" className={styles.input_comment}/>
          <button type="submit">Enviar</button>
        </form>

        <div className={styles.review}>
          {reviewActual.map((review) =>{
            return <div className={styles.containReview} key={review.id}>
              <div className={styles.imgUser}>
                <img src={iconUser} alt="" width={55}/>
              </div>
              <div className={styles.review_comment}>
                <p>{username}</p>
                <p className={styles.reviewUser}>{review.review}</p>
              </div>
              <div className={styles.button_delete} onClick={()=>{deleteReview(review.id)}}>
                <AiOutlineCloseCircle size={25} color="white" />
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails