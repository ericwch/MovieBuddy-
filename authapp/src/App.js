
import React, {useState, useEffect} from "react"
import "./public/popUp.css"

import {checkAuth} from "./util"
import Login from "./Login"
import Register from "./Register"
function App() {

  useEffect(()=>{

    checkAuth()
  })

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
