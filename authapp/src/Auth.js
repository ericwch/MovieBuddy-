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
            
            )
        case AuthAction.LOGOUT:
        
            return <Logout />
        case AuthAction.REGISTOR:
            
            return <Register />
        default:
            return null
    }




}

export default Auth