import React, {useState, useEffect} from 'react';
import {checkAuth, logout} from "../authUtil"
import Loading from '../Loading';
import { AuthAction } from '../const/authAction';

const Logout = (props) => {

    
    
    useEffect(() => {

        logout().then((isLogout) =>{
            if (isLogout){
                fetch("/", {
                    method: "GET"
                })
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