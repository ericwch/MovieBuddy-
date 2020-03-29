import React, {useState, useEffect, useRef, useCallback} from 'react';
import MovieOptions from "./MovieOptions"
import {makeMovieMeet, getMovieMeet} from "./movieUtil"
import {formToJSON} from "./util"
const New = function (props){
    
    const [errorMessage, setErrorMessage] = useState("")
    const submitHandler = (ev) => {

        ev.preventDefault()

        const movieMeetFormData = new FormData(ev.target)

        makeMovieMeet(formToJSON(movieMeetFormData))
        .then((res) => {
            if(res.ok){
                return getMovieMeet()
            }
        })
        .then((movieMeetJSON) => {
            props.setNewPopup(false)
            props.setMovieMeets(movieMeetJSON)
        })
        .catch(err => {
            console.log(err)
            setErrorMessage("username or password incorrect")
        })
            
            
    }
    
    
    return (
        <div class = "modal">
            <div class = "modal-content round-corner">

                <span class = "modal-close" onClick = {() => {props.setNewPopup(false)}}>X</span>
                {errorMessage}
                <form  onSubmit= {(ev) => {submitHandler(ev)}}>
                    <MovieOptions/>
                    
                    <div>description</div>
                    <textarea name="paragraph_text" cols="50" rows="10"></textarea>
                    <input type = 'hidden' id = 'cinemaLat_input' name = 'cinemaLat' value = "0"/>
                    <input type = 'hidden' id = 'cinemaLng_input' name = 'cinemaLng' value = "0"/>
                    
                
                    <button type = "submit" >Make!</button>
                </form>
            </div>
        </div>

    )




}  
export default New