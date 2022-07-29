import { createContext, useEffect, useState } from "react"

const MoviesContext= createContext()

const MoviesProvider = ({ children }) => {


    //Aca se guarda el fetch de la API
    const [movies, setMovies] = useState([]);

    //Activa el spinner
    const [loading, setLoading] = useState(false);

    //Aca se guarda el valor que escriban en el input para buscar una pelicula
    const [searchMovie, setSearchMovie] = useState('') 

    //Es el estado que detecta si el usuario esta logeado (lo uso para ocultar o mostrar los items de la nav)
    const [isLogin, setIsLogin] = useState(localStorage.getItem('user')? true : false)

    const [reviews, setReviews] = useState([])

    const API_KEY = `api_key=3d9d528c10bd10aab1dcbcd5f1f8f9bf`;

    //La URL Dinamica, si el usuario escribio algo en el input de busqueda se va a usar el estado searchMovie y si esta vacio osea el usuario no escribio nada, se hace un fetch a la api trayendo las peliculas mas populares del momento

    const SearchUrl = searchMovie? `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${API_KEY}` : `https://api.themoviedb.org/3/movie/popular?${API_KEY}`

    const getData = async () => {
      try {
        const res = await fetch(
          `${SearchUrl}`
        );
        const data = await res.json();
  
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {

      setLoading(true);
      // const SearchUrl = searchMovie? `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${API_KEY}` : `https://api.themoviedb.org/3/movie/popular?${API_KEY}`
      getData();

      setLoading(false);

    }, [searchMovie]);


  return (
    <MoviesContext.Provider
      value={{movies,setMovies,searchMovie, setSearchMovie, loading, isLogin,setIsLogin, reviews, setReviews}}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export { MoviesProvider }

export default MoviesContext