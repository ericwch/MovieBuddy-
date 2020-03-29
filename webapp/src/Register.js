import React, {useState, useEffect, useRef} from 'react';
import {register} from "./authUtil"
import {formToJSON} from "./util"
const Register = (props) => {

   const [errorMessage, setErrorMessage] = useState("")

    const registerHandler = async (ev) => {

        ev.preventDefault()

        const registerFormData = new FormData(ev.target)

        if(register(formToJSON(registerFormData))){
            props.setShowRegister(false)
        }
        else{
            setErrorMessage("register failed! plz try again")
            props.setShowRegister(true)
        }
        
    }

    return(
        <div>
        <h1>Register</h1>
        <h2>{errorMessage}</h2>
        <form onSubmit = {(ev) => {registerHandler(ev)}}>
        <label>username</label>
        <input type = "text" name = "username" />
        <label>password</label>
        <input type = 'text' name = "password" />
        <button type ="submit">register!</button>
        </form>
        </div>
    )




}

export default Register