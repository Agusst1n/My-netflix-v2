import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MoviesProvider } from './context/MovieContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  // </React.StrictMode>
)
