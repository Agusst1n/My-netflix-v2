import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import MoviesContext from '../../context/MovieContext'

import iconUser from '../../assets/images/iconUser.png'

import styles from './MovieDetails.module.css'

const MovieDetails = () => {

  const [load, setLoad] = useState(false)
  const [movieActual, setMovieActual] = useState([])
  const [reviewActual, setReviewActual] = useState([])



  const {id} = useParams()
  const {movies,reviews,setReviews} = useContext(MoviesContext)

  const getById = () =>{
    const movieActual = movies?.filter(movie=> movie.id == id)
    setMovieActual(movieActual);
  }

  const getReview = () =>{
    const reviewActual = reviews?.filter(review => review.idMovie == id)
    setReviewActual(reviewActual);
  }

  useEffect(() => {
    
    getById()
    getReview()

  }, [movies, reviews])
  

  console.log(movies, 'moviees');
  console.log(movieActual, 'movieActual');
  console.log(reviews, 'reviews');

  const img = `https://image.tmdb.org/t/p/w300${movieActual[0]?.poster_path}`  

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
          <h2>{movieActual[0]?.title}</h2>
          <p>Description: {movieActual[0]?.overview}</p>
          <p>Popularity: {movieActual[0]?.popularity}</p> 
          <p>Rating: {movieActual[0]?.vote_average}</p>
        </div>
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
              <div className={styles.imgUser}><img src={iconUser} alt="" width={40}/></div>
              <p className={styles.reviewUser}>{review.review}</p>
              <button onClick={()=>{deleteReview(review.id)}}><ion-icon name="trash"></ion-icon></button>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails