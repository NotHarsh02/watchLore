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



    fetch("http://localhost:5000/register", {
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
        } else {
          alert("User already exists!");
        }
      });

  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3>Sign Up</h3>

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