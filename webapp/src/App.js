import React, {useState, useEffect, useRef} from 'react';
import Auth from './authComponent/Auth'
import {AuthAction} from "./const/authAction.js"
import Main from "./Main"
import Logout from "./authComponent/Logout"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import New from "./New"
import "./public/Main.css"

function App() {


  const [newPopup, setNewPopup] = useState(false)
  


  return (
    
    <div className="App">
      
      <h1>MovieMeets!</h1>
      
      
      

      <button onClick = {() => setNewPopup(true)}>Create</button>

       <Main/>

       {(newPopup)?<New setNewPopup = {setNewPopup}/>:null}
    
      <div class = "footer">i am bottom</div>
    </div>

  );
}

export default App;
