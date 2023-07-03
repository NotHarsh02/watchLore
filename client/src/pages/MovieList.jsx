import React, { Component } from 'react';
import { useNavigate} from 'react-router-dom';
import Nav from "../UI/navbar"
export default function MovieList(){
    const navigate = useNavigate();
    if(window.innerWidth <= 1000){
      return(<>
      <Nav></Nav>
      <h3>This page is not yet ready for mobile devices.</h3>
      </>)
    }
    return(
        <>
        <Nav></Nav>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <h3>Collect, curate, and share. Lists are the perfect way to group films.</h3>
          <button className='btn btn-info' style={{width:"10%",marginLeft:"44%",marginTop:"1%"} } onClick={()=>navigate("/lists/new")}>Make a list now!</button>
          </div>
        </>
    )
}