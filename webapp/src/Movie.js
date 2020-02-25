import React, {useState, useEffect, useRef, useCallback} from 'react';
const Movie = function(props) {

    const clickHandler =
        (ev) => {
            console.log(ev.target.getAttribute("data-movieId"))
            props.setSelectedMovie(
                {
                    id:ev.target.getAttribute("data-movieId"), 
                    title: ev.target.getAttribute("data-movieTitle"), 
                }
                    
            )
            
        
        }
    
    return(
        <div class = {"horizontal-option movie-option " + props.class}  >  
                <img onClick = {clickHandler}  class = "movie-img"  
                data-movieId = {props.movie_id} data-movieTitle= {props.movie_title} 
                src = {`public/img/${props.movie_id}.jpg`}/>
                <h4>{props.movie_title}</h4>
        </div>
    )
}


export default Movie