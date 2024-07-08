import './App.css'
import {  useEffect, useState } from 'react'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'



function App() {
  const {movies} = useMovies()
  const [query,setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const newQuery= event.target.value
    if(newQuery.startsWith(' ')) return 
    setQuery(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({query})

  }

  useEffect(()=>{
    
    if (query == ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (query.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if (query.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }


    setError(null)

  },[query])

  return (
    <div className='page'>
    <header>
         <h1>Buscador de peliculas</h1>
         <form className='form' onSubmit={handleSubmit}>
          
          <input style = {{
            border: '1px solid transparent', borderColor:error ? 'red':'transparent'
          }}
          onChange = {handleChange} name={query}  placeholder='Avenger, Pirates of caribbean ...'/>
          <button >Enviar</button>
         </form>
         {error && <p style={{color: 'red'}} className='error'>{error}</p>}
    </header>
    
    <main>
    
    <Movies movies={movies}/>
     
    </main>
    </div>
 
  )
}

export default App
