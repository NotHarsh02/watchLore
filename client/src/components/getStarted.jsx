import React, { Component,useState } from 'react';
import Register from "./register";
import "../UI/modal.css"

export default function Letsgo(){
  const [signUp, setsignUp] = useState(false);
  const toggleSignUp =()=>{
    setsignUp(!signUp);
  }
    return(<>
      <div id='getStarted'>
        <div>
          
        <h1 >Track films you’ve watched.</h1>  
        <h1>Save those you want to see.</h1>
        <h1>Tell your friends what’s good.</h1>
          <button className="btn btn-primary " onClick={toggleSignUp} >Get started now!</button>
        </div>
       
      </div>
      {signUp && (
        <div >
        <div onClick={toggleSignUp} className="overlay"></div>
        <div className="modal-content">
         <Register  signuptoggle={toggleSignUp}></Register>
          <button className="close-modal btn-close " onClick={toggleSignUp} >
            
          </button>
        </div>
      </div>
      )}
      </>
    )
}
