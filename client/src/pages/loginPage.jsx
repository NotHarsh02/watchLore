
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import Loading from "../UI/loading"
import Nav from "../UI/navbar"
export default function Hello() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const[data,setData] =useState("");
  const [isDataLoaded, setDataLoaded] = useState(false);
  const userInfo =async()=>{
    const response =await fetch("http://localhost:5000/getinfo", {
    method: "GET",
    credentials: "include",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*"
}
    })
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const temp = await response.json();
    setData(temp);
    setDataLoaded(true);
  }

  const isLogIn = async () => {
    try {
      const response = await fetch(`http://localhost:5000/checkLogin?${Date.now()}`, {
        method: "GET",
        crossDomain: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",   
        },
      })
      const data = await response.json();
      if (data.loggedIn) {
        setLoggedIn(true)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    isLogIn();
    userInfo();
  }, []);

  if (isLoading) {
    return(
    <div className="loading">
      <Loading/>;
    </div>
    ) 
  }

  if (isLoggedIn) {
    return (
      <>
       <Nav islogin={true}></Nav>
       {isDataLoaded ? (
          `Welcome back, ${data}`
        ) : (
          <Loading/>
        )}
      </>
    )
  } else {
    return (
      <>
        
        <Navigate to='/'/>
      </>
    );
  }
}
