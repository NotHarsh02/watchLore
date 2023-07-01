import React, { Component, useState } from "react";
export default function Register(props) {
  const [username, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { existing,signuptoggle } = props;
  
 const existingLogin =()=>{
    existing()
    }
 const registertoggle=()=>{
   signuptoggle()
 }

  const handleSubmit = (e) => {
 
    e.preventDefault();

    console.log(username, email, password);



    fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        if (data.status == "ok") {
          registertoggle()
          const promptElement = document.createElement('div');
        promptElement.textContent = 'Signed Up!';
        promptElement.style.position = 'fixed';
        promptElement.style.top = '60px';
        promptElement.style.left = '10px';
        promptElement.style.padding = '10px';
        promptElement.style.borderRadius="2%"
        promptElement.style.backgroundColor = 'green';
        promptElement.style.color = 'white';
        promptElement.style.zIndex = '9999';
        promptElement.style.width="20%";
        promptElement.style.textAlign="center";
        
        document.body.appendChild(promptElement);

        setTimeout(() => {
          promptElement.remove();
        }, 2500);
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
           
            
              window.location.reload();
            
              
            
            
            
            }
            else{
              console.log("error");
            }
            
          });
        } else {
          alert("User already exists!");
        }
      });

  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h2>Sign Up</h2>

          <div className="mb-3">
            <label>UserName:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          {existing &&(
             <p className="forgot-password text-right">
             Already registered, <a role="button" className="linkLike" onClick={existingLogin}>sign in?</a>
           </p>
          )}
         
        </form>
      </div>
    </div>
  );
}