import React, {useState, useEffect, useRef} from 'react';
import {AuthAction} from "./const/authAction.js"
import Main from "./Main"
import {getMovieMeet} from "./movieUtil"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import New from "./New"
import Auth from "./Auth"

import "./public/Main.css"
import "./public/TopNav.css"
import { logout } from './authUtil.js';

function App() {


  const [newPopup, setNewPopup] = useState(false)
  
  const [movieMeets, setMovieMeets] = useState([])

  useEffect(() => {

   getMovieMeet()
   .then((movieMeetJSON) => {

        setMovieMeets(movieMeetJSON)
          console.log(movieMeetJSON)
        }).catch((err) => {
          console.log(err)
        })
      },[])

  return (
    
    <div className="App">
      
      <div class = "top-nav">
      <div>MovieMeets!</div>
      
      <div class = "nav-button" onClick = {() => 
      {if (logout()){
        window.location.href = "auth/login"

      }} }>logout</div>
      
      <div class = "nav-button" onClick = {() => setNewPopup(true)}>Create</div>
      </div>
      
      

       <Main movieMeets = {movieMeets} setMovieMeets = {setMovieMeets}/>

      {(newPopup)?<New setNewPopup = {setNewPopup} setMovieMeets = {setMovieMeets}/>:null}
    
      <div class = "footer">i am bottom</div>
    </div>

  );
}

export default App;
