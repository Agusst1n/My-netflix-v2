import React from 'react';
import styles from './Movie.module.css';

//import Link react-router-dom
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import MoviesContext from '../../context/MovieContext';

import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';

const Movie = ({ movie }) => {
  const { isLogin, favouriteMovies, setFavouriteMovies,pushFavouriteMovies,deleteFavouriteMovie} = useContext(MoviesContext);

  const img = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  const [favourite, setFavourite] = useState(false);

  const [movieF, setMovieF] = useState()

  
  const getFav = () =>{

    let favList = favouriteMovies.map(fav=> fav.fav)
    
    let favList2 = favouriteMovies.map(fav=> fav)
    // console.log(favList2);

    let movieFav2 = favList2.filter(movieFav2=> movieFav2.fav.id == movie.id)

    console.log(movieFav2);

    // let favList2 = favouriteMovies.map(fav=> fav.idFirebase)
    

    // console.log(favouriteMovies)

    let movieFav = favList.filter(movieFav=> movieFav.id == movie.id)


    // if(movieFav[0]?.id == movie.id){
    //   console.log('hay movie')

    //   setFavourite(true)
    // }else{
    //   console.log('no hay');
    //   setFavourite(false)
    // }

    if(movieFav2[0]?.fav?.id == movie.id){
      console.log('hay movie')
      setMovieF(movieFav2[0].idFirebase)
      setFavourite(true)
    }else{
      console.log('no hay');
      setFavourite(false)
    }

  }

  const handleFavourite = async () => {
    setFavourite(!favourite);
    if(favourite){
      console.log('borrar');
      console.log(movieF, 'movieFav')
      await deleteFavouriteMovie(movieF)
    }else{
      console.log('agregar');
      await pushFavouriteMovies({movieFav:movie.title, id:movie.id});
    }

    
    console.log(movie.title);
  };


  useEffect(()=>{
    getFav()
  },[favouriteMovies])

  return (
    <div className={styles.movie} data-id={movie.id}>
      {isLogin && (
        <div className={styles.fav_icon} onClick={handleFavourite}>
          {favourite ? (
            <MdFavorite color={'red'} size={30} />
          ) : (
            <MdFavorite size={30} />
          )}
        </div>
      )}
      <Link to={`/details/${movie.id}`}>
        <img src={img} alt="" width={230} />
      </Link>
    </div>
  );
};

export default Movie;
