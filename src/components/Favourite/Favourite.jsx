import React from 'react';

import styles from './Favourite.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useContext } from 'react';
import MoviesContext from '../../context/MovieContext';

const Favourite = (data) => {
  const { deleteFavouriteMovie, setPushingFav } = useContext(MoviesContext);

  const { idFirebase } = data.data;
  const { img, movieFav } = data.data.fav;

  const deleteMovie = async (id) => {
    await deleteFavouriteMovie(id);
    setPushingFav(true);
  };

  return (
    <div className={styles.fav_movie}>
      <div className={styles.fav_img}>
        <img src={img} alt="" width={50} />
      </div>
      <div className={styles.fav_title_button}>
        {movieFav.length > 17 ? (
          <p>{movieFav.substring(0, 17)}...</p>
        ) : (
          <p>{movieFav}</p>
        )}
        <div
          onClick={() => deleteMovie(idFirebase)}
          className={styles.fav_icon}
        >
          <AiOutlineCloseCircle size={25} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Favourite;
