
import './App.css';
import React, {useState, useEffect} from "react"
import "./public/popUp.css"

import {checkAuth} from "./"
function App() {

  useEffect(()=>{

    checkAuth()
    .then((isAuth)=>{

      isAuth
      ?setAuth(null)
      :setAuth(AuthAction.LOGIN)
      
    })
  },[])

  return (
    <div>
    Welcome!

    
    <div class = "modal">
    <div class = "modal-content">
        <Login />
        <Register/>
    </div>
    </div>
    
    
    </div>
  )
}

export default App;
