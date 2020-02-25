import React, {useState, useEffect, useRef, useCallback} from 'react';
const Showtime = function(props) {


    const clickHandler = (ev) => {
        console.log(ev.target.getAttribute("data-showtime"))
        props.setSelectedShowtime(
                
            ev.target.getAttribute("data-showtime")
        )
        props.setSelectedCinema(

            {
                id: props.cinemaId,
                name: props.cinemaName
            }
        )
    
    }

    return(
        
        <div onClick = {clickHandler} 
            data-cinemaName = {props.cinemaName} 
            data-showtime = {props.showtime} 
            data-cinemaId = {props.cinemaId} 
            class = {"showtime-option"+ props.class}>{props.showtime}</div>
                    
                    
    )
}

export default Showtime






