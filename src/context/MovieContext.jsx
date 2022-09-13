import { createContext, useEffect, useState } from "react"

const MoviesContext= createContext()

const MoviesProvider = ({ children }) => {

    //Toda la informacion del usuario
    let user = JSON.parse(localStorage.getItem('user'))

    //Aca se guarda el fetch de la API
    const [movies, setMovies] = useState([]);

    //Activa el spinner
    const [loading, setLoading] = useState(false);

    //Aca se guarda el valor que escriban en el input para buscar una pelicula
    const [searchMovie, setSearchMovie] = useState('') 

    //Es el estado que detecta si el usuario esta logeado (lo uso para ocultar o mostrar los items de la nav)
    const [isLogin, setIsLogin] = useState(localStorage.getItem('user')? true : false)

    const [reviews, setReviews] = useState([])

    //Aca adentro van a estar todas las peliculas a las que guardemos en favoritos
    const [favouriteMovies, setFavouriteMovies] = useState([])

    const favs = []

    const API_KEY = `api_key=3d9d528c10bd10aab1dcbcd5f1f8f9bf`;

    //La URL Dinamica, si el usuario escribio algo en el input de busqueda se va a usar el estado searchMovie y si esta vacio osea el usuario no escribio nada, se hace un fetch a la api trayendo las peliculas mas populares del momento

    const SearchUrl = searchMovie? `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${API_KEY}` : `https://api.themoviedb.org/3/movie/popular?${API_KEY}`

    const getData = async () => {
      try {
        const res = await fetch(
          `${SearchUrl}`
        );
        const data = await res.json();
  
        getFavoriteMovies()

        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    const getFavoriteMovies = async() =>{
      try {
        const res = await fetch(`https://my-neftlix-default-rtdb.firebaseio.com/users/${user.localId}.json?auth=${user.idToken}`)
        const data = await res.json()

        // console.log(data)
        
        for(let i in data){
          
          favs.push({
            fav:data[i].fav,
            idFirebase: i
          })
        }
        
        setFavouriteMovies(favs)

      } catch (error) {
        console.log(error)
      }
    }

    const pushFavouriteMovies = async (fav) =>{

      //!Listo ya pushea las peliculas fav a firebase
      //*Faltaria agregar que si saca el corazon de la card, se borre de favs

      try {
        const res = await fetch(`https://my-neftlix-default-rtdb.firebaseio.com/users/${user.localId}.json?auth=${user.idToken}`,{
          method: 'POST',
          body: JSON.stringify({
            fav
          })
        })
      } catch (error) {
        console.log(error)
      }
    }

    const deleteFavouriteMovie = async(id) =>{
      try {                                                                                           //Tengo que conseguir esa id
        const res = await fetch(`https://my-neftlix-default-rtdb.firebaseio.com/users/${user.localId}/${id}.json?auth=${user.idToken}`,{
          method: 'DELETE',
        })
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {

      setLoading(true);
      // const SearchUrl = searchMovie? `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${API_KEY}` : `https://api.themoviedb.org/3/movie/popular?${API_KEY}`
      getData();

      setLoading(false);

    }, [searchMovie]);


  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        searchMovie, 
        setSearchMovie, 
        loading, 
        isLogin,
        setIsLogin, 
        reviews, 
        setReviews,
        favouriteMovies,
        setFavouriteMovies,
        pushFavouriteMovies,
        deleteFavouriteMovie
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export { MoviesProvider }

export default MoviesContext