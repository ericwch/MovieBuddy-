import React from 'react'

const NewFormInput = function (props){


    return(

        <div>

            <input type = 'hidden' name = "movieTitle"  value = {props.selectedMovie.title}/>
            <input type = 'hidden' name = "movieId"  value = {props.selectedMovie.id}/>
            <input type = 'hidden' name = "cinema"  value = {props.selectedCinema.name}/>
            <input type = 'hidden' name = "cinemaId"  value = {props.selectedCinema.id}/>
            <input type = 'hidden' name = "showtime"  value = {props.selectedShowtime}/>

        </div>


    )
}

export default NewFormInput