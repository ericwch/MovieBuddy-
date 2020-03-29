import React, {useState, useEffect} from 'react';

import {login} from "./authUtil"
import {formToJSON} from "./util"


const Login = ( props ) => {
    

    
    const [errorMessage, setErrorMessage] = useState()
    

    const loginHandler = async (event) => {
        console.log("submit call")
        event.preventDefault()

        const userFormData = new FormData(event.target)

        if(await login(formToJSON(userFormData))){
            props.setIsAuth(true)
        }
        else{
            setErrorMessage("username or password incorrect")
            props.setIsAuth(false)
        }


        }


    return(
        

        <div>
        <h1>LOGIN</h1>
        <h2>{errorMessage}</h2>
        <form onSubmit = { (ev) => loginHandler(ev)}>
        <label>username</label>
        <input type = "text" name = "username"/>
        <br/>
        <label>password</label>
        <input type = 'text' name = "password"/>
        <button type ="submit">login!</button>
        </form>

        
        </div>
        
    );


    
};

export default Login