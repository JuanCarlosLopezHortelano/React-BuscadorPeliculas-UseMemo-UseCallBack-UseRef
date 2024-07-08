import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'



function App() {
  const {movies} = useMovies()
  

  return (
    <div className='page'>
    <header>
         <h1>Buscador de peliculas</h1>
         <form className='form'>
          
          <input placeholder='Avenger, Pirates of caribbean ...'/>
          <button>Enviar</button>
         </form>
    </header>
    
    <main>
    
    <Movies movies={movies}/>
     
    </main>
    </div>
 
  )
}

export default App
