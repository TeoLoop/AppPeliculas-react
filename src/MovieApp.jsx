import React, { useEffect, useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const urlBase = 'https://api.themoviedb.org/3/search/movie?'
    const API_KEY = '43040461c5aa962a95b5b4467a1d8321'

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${urlBase}query=${search}&api_key=${API_KEY}&language=es-ES`)
            if (!response.ok) throw new Error('Error al obtener los datos')
            const data = await response.json()
            setMovieList(data.results)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <h1>Buscador de Peliculas</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Escribi una pelicula'
                    value={search}
                    onChange={handleInputChange}
                />
                <button>Buscar</button>
            </form>

            {/* Mensaje de carga */}
            {loading && <p className="loading">Cargando...</p>}

            {/* Mensaje de error */}
            {error && <p className="error">{error}</p>}

            {/* Lista de películas */}
            {movieList &&
                <div className="movie-list">
                    {movieList.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    ))}

                </div>
            }
        </div>
    )
}
