import React, { useState } from 'react';
import { useContext } from 'react';
// import { useEffect } from 'react';
import MoviesContext from '../../context/MovieContext';
import styles from './Search.module.css';

const Search = () => {
  const { handleChange } = useContext(MoviesContext);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className={styles.search}
        onChange={handleChange}
      />
    </>
  );
};

export default Search;
