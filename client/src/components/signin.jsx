import React, { useState } from "react";

import { Navigate } from 'react-router'
import { useNavigate} from 'react-router-dom';
import "./styles.css"

export default function Login(props) {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [wrongCredentials,setCredentials] = useState(false);
  

  const {relay,success,isLoggedIn} = props;
  const toggleSignout =()=>{
    isLoggedIn()
  }

  function handleSubmit(e) {
    e.preventDefault();

    
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      crossDomain: true,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
     
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       
        if (data.status === "ok") {
          
          
        setStatus(true);
        toggleSignout()
       
        // navigate('/signedin')
        window.location.reload();
        }
        else{
          setCredentials(true);
        }
        
      });
      
  }
  const relayRegister=()=>{
    relay()
  }
  const done=()=>{
    success()
  }
  if(status){
    done()
  }

  return (
    <>
    
    <div className="auth-wrapper">
     
      <div className="auth-inner">
        <form onSubmit={handleSubmit} autoComplete="false">
        
        
          <h3>Sign In</h3>
          <div className={wrongCredentials? 'alert alert-danger credentials' : 'hide'}   role="alert">
          Wrong credentials bro!
        </div>
        <div className={status? 'alert alert-success credentials':'hide'} role ='alert'>
          Succesfully logged in!
        </div>

          <div className="mb-3">
            <label>Username</label>
            <input
              type="Name"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit"  className="btn btn-primary">
              Submit
            </button>
          </div>
          
          <p className="forgot-password text-right" style={{color:"black"}}>
            Already have an account? 
           <br />
            <a role="button" className="linkLike" onClick={relayRegister}>Sign Up</a>
          </p>
        
        </form>
      </div>
    </div>
    </>
  );
}