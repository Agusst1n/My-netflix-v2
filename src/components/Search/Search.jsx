import React, { useState } from 'react'
import { useContext } from 'react';
// import { useEffect } from 'react';
import MoviesContext from '../../context/MovieContext';
import styles from './Search.module.css'


const Search = () => {

  const {movies,setMovies, searchMovie, setSearchMovie} = useContext(MoviesContext)

//   const [searchMovie, setSearchMovie] = useState('')

//   const API_KEY = `api_key=3d9d528c10bd10aab1dcbcd5f1f8f9bf`
  

//   const getMovie = async () =>{
//     // https://api.themoviedb.org/3/search/movie?query=messi&api_key=3d9d528c10bd10aab1dcbcd5f1f8f9bf
//     const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${API_KEY}`)
//     const data = await res.json()

//     console.log(data.results);
//     // setMovies(data.results)
//   }

  const handleChange = (e)=>{
    setSearchMovie(e.target.value)
    // setMovies(e.target.value)

    //cada vez que se haga un onchange que se ejecute un fetch con la url de busquedaa
  }

//   useEffect(()=>{
//     // getMovie()
//   },[searchMovie])

  return (
    <>
        <input type="text" placeholder='Search' className={styles.search} onChange={handleChange}/>
    </>
  )
}

export default Search