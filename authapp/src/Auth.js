import React, {useState, useEffect} from 'react';
import Login from "./Login"
import Register from "./Register"
import {AuthAction} from "../const/authAction"
import Logout from './Logout';
import "../public/popUp.css"
const Auth = (props) => {
    
    
    switch(props.auth){
        case AuthAction.LOGIN:
           
            return (
            <div class = "modal">
                <div class = "modal-content">
                    <Login setAuth = {props.setAuth}/>
                </div>
            </div>
            )
        case AuthAction.LOGOUT:
        
            return <Logout setAuth = {props.setAuth}/>
        case AuthAction.REGISTOR:
            console.log(3)
            return <Register setAuth = {props.setAuth}/>
        default:
            return null
    }




}

export default Auth