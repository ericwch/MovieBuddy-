
import React, {useState, useEffect} from "react"
import "./public/popUp.css"

import {checkAuth} from "./authUtil"
import Login from "./Login"
import Register from "./Register"

function Auth(props) {

    const [showRegister, setShowRegister] = useState(false)
    useEffect(()=>{

        checkAuth()
        .then((isAuth)=>{
    
          isAuth
          ?props.setIsAuth(true)
          :props.setIsAuth(false)
          
        })
      },[])

  return (
    <div>
    Welcome!

    
    <div class = "modal">
    {(!showRegister)
    
    
    ?<div class = "modal-content">    
        <Login setIsAuth = {props.setIsAuth}/>
        <button onClick = {() => {setShowRegister(true)}}>Register</button>
        
    </div>
    :<div class = "modal-content">
        <Register setShowRegister = {setShowRegister}/>
        <button onClick = {() => {setShowRegister(false)}}>Sign in</button>
    </div>
    }
    </div>
    
    
    </div>
  )
}

export default Auth;
