import React, {useState, useEffect, useRef, useCallback} from 'react';
import Movie from "./Movie"
import Showtime from "./Showtime"
import NewFormInput from "./NewFormInput"
import "./public/MovieOption.css"
const MovieOptions = function(props) {

    const [selectedMovie, setSelectedMovie] = useState({})
    
    const [selectedShowtime, setSelectedShowtime] = useState(null)
    const [selectedCinema, setSelectedCinema] = useState({})

    const [movieList, setMovieList] = useState({})
    
    
    useEffect(()=>{
        fetch("moviemeet/movieinfo")
        .then((res)=>{
            if (res.ok) {
                return res.json()
            }
        })
        .then((movieJSON) => {
            
            setMovieList(movieJSON)

        }).catch((e) =>{
            console.log(e)
        })
    }, [])

    
    
    return(
        <div>
            <div class = "horizontal-option-container round-corner">
            
                {Object.keys(movieList).map(movie_id => (

                    <Movie setSelectedMovie = {setSelectedMovie} 
                            movie_id = {movie_id} 
                            movie_title = {movieList[movie_id].title} 
                            class = {(movie_id == selectedMovie.id)? " selectable": ""} 
                    />
                ))}

            </div>

            {(selectedMovie.id)
            ?
                <div class = "horizontal-option-container round-corner">
                    {movieList[selectedMovie.id].cinemas.map(cinema => (
                            
                            <div class = "horizontal-option cinema-option round-corner">

                                <div >{cinema.cinema_name}</div>

                                {cinema.showtime.map(showtime => (
                                    
                                    <Showtime setSelectedShowtime = {setSelectedShowtime} 
                                            setSelectedCinema = {setSelectedCinema}
                                            cinemaId = {cinema.cinema_id} 
                                            cinemaName = {cinema.cinema_name}
                                            showtime = {showtime} 
                                            selectedShowtime = {selectedShowtime}
                                            class = {(selectedCinema.id == cinema.cinema_id && selectedShowtime == showtime)? " selectable": ""}
                                    />
                                    
                                ))}
                            
                            
                            </div>
                    ))}
                
                </div>
            
            :null}
            
            <div>{selectedMovie.title}</div>
            <div>{selectedShowtime}</div>
            <div>{selectedCinema.name}</div>
            
            <NewFormInput selectedMovie = {selectedMovie} selectedShowtime = {selectedShowtime} selectedCinema = {selectedCinema}/>
            
            
        </div>
        
        
    )
}

export default MovieOptions