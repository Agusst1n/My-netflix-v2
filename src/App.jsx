import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'

// Import react-router-dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Movies from './views/Movies/Movies'
import MovieDetails from './components/MovieDetails/MovieDetails'
import Login from './components/Login/Login'

function App() {

  return (
    <div className="App">
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/home' element={<Home />} />
            <Route path='/movies' element={<Movies/>} />
            <Route path='/details/:id' element={<MovieDetails/>} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
