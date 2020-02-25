import React, {useState, useEffect} from 'react';
import {checkAuth, logout} from "../authUtil"
import Loading from '../Loading';
import { AuthAction } from '../const/authAction';

const Logout = (props) => {

    
    
    useEffect(() => {

        logout().then((isLogout) =>{
            if (isLogout){
                props.setAuth(AuthAction.LOGIN)
            }
            else{
                return <h2>logout failed</h2>
            }
        })

        return
    },[])
        
        
    

    return (
        <Loading/>
    )




}

export default Logout