import React, {useState, useEffect, useRef} from 'react';
import Loading from "./Loading"
import {deleteMovieMeet} from "./movieUtil"
import {formToJSON} from "./util"
const Main = () => {

    const [movieMeetJSX, setMovieMeetJSX] = useState(<Loading/>)
    
    const deleteHandler = async (ev) => {
        
        ev.preventDefault()

        const movieMeetId = ev.target.getAttribute("data-movieMeetId")
        
        console.log(movieMeetId)
        if(await deleteMovieMeet(movieMeetId)){
            console.log("deleted")
        }
        else{
            console.log("delete fail")
        }


        }
    
    useEffect(() => {

        console.log("Yes!")
        
            
            
            fetch("/moviemeet",{
                method: "GET",
                

            }).then((res) => {
                if(res.ok){
                    return res.json()
                }
            }).then((movieMeetJSON) => {

                const movieMeetList = []
                console.log(movieMeetJSON)
                movieMeetJSON.forEach( movieMeet => { 
                    

                    movieMeetList.push(
                        <div>

                        
                        <button onClick =  {(ev) => {deleteHandler(ev)}} data-movieMeetId = {movieMeet._id}>delete!</button>
                    
                
                        <div>{movieMeet.movieTitle}</div>
                        
                        <div>{movieMeet.showtime}</div>
                        
                        <div>{movieMeet.cinema}</div>
                        
                        <div>{movieMeet.participants_name}</div>
                        
                        <div>{movieMeet._id}</div>
                        </div>
                    )
                })
                setMovieMeetJSX(movieMeetList)
            }).catch((e)=>{
                console.log(e)
            })
                
    },[])

    return (

        <div>
            {movieMeetJSX}
        </div>

    )
}

export default Main

