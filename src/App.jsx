import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'

// Import react-router-dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Movies from './views/Movies/Movies'
import MovieDetails from './components/MovieDetails/MovieDetails'
import Login from './views/Login/Login'
import { AuthenticationProvider } from './context/AuthenticationContext'
import Register from './views/Register/Register'

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <AuthenticationProvider>
            <Navbar/>
              <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/home' element={<Home />} />
                <Route path='/movies' element={<Movies/>} />
                <Route path='/details/:id' element={<MovieDetails/>} />
              </Routes>
          </AuthenticationProvider>
        </BrowserRouter>
    </div>
  )
}

export default App
