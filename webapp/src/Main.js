import React, {useState, useEffect, useRef} from 'react';
import Loading from "./Loading"
import {deleteMovieMeet, getMovieMeet} from "./movieUtil"
import "./public/MovieMeet.css"
const Main = (props) => {

    
    
    const deleteHandler = (ev) => {
        
        ev.preventDefault()

        const movieMeetId = ev.target.getAttribute("data-movieMeetId")

        console.log(movieMeetId)

        deleteMovieMeet(movieMeetId)
        .then((res) => {
            if(res.ok){
                return getMovieMeet()
            }
        })
        .then((movieMeetJSON)=>{
            console.log("deleted")
            props.setMovieMeets(movieMeetJSON)
            
        })
        .catch(err => {
            console.log("delete fail")
            console.log(err)
        })

            
    }
    
            
       

    return (

        <div id = "moviemeet">
            {props.movieMeets.map((movieMeet) => (

                        <div class = "moviemeet-container">

                        <button onClick =  {(ev) => {deleteHandler(ev)}} data-movieMeetId = {movieMeet._id}>delete!</button>
                    
                
                        <div>{movieMeet.movieTitle}</div>
                        
                        <div>{movieMeet.showtime}</div>
                        
                        <div>{movieMeet.cinema}</div>
                        
                        <div>{movieMeet.participants_name}</div>
                        
                        <div>{movieMeet._id}</div>

                        </div>
            ))}
        </div>

    )

            }
export default Main

