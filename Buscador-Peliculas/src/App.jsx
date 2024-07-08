import './App.css'
import {  useEffect, useState, useRef } from 'react'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)


  useEffect(()=>{

    if (isFirstInput.current) {
      isFirstInput.current = search ==  ''
      return
    }

    if (search == ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if (search.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }


    setError(null)

  },[search])

  return [search, updateSearch, error]
}

function App() {
  const [sort, setSort] = useState(false)
  const [search, updateSearch, error] = useSearch()

  const {movies, loading ,getMovies} = useMovies({search, sort})
 

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})

  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }
  
  const handleSort = ()=>{
    setSort(!sort)
  }
 

 

  return (
    <div className='page'>
    <header>
         <h1>Buscador de peliculas</h1>
         <form className='form' onSubmit={handleSubmit}>
          
          <input style = {{
            border: '1.5px solid transparent', borderColor: error ? 'red':'transparent'
          }}
          onChange = {handleChange} name={search}  
          placeholder='Avenger, Pirates of caribbean ...'/>

          <input type='checkbox' onChange={handleSort} checked = {sort} />
          <button >Enviar</button>
         </form>
         {error && <p style={{color: 'red'}} className='error'>{error}</p>}
    </header>
    
    <main>
    {
      loading ? <p>cargando ...</p> : null
    }
    <Movies movies={movies}/>
     
    </main>
    </div>
 
  )
}

export default App
