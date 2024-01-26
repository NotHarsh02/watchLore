import React, { Component, useState } from 'react';
import "./styles.css"
import { Navigate } from 'react-router'
import { useNavigate} from 'react-router-dom';
import {EyeFill,Eye,HeartFill,Heart} from 'react-bootstrap-icons';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Moviebox(props){
  const [likes,setLikes]=useState(false)
  const[watchLater,setWatchLater]=useState(false)
  const {title,img,id} = props;
  const navigate = useNavigate();
  const moviePage=()=>{

    let movielink =`/films/${id}`;
    navigate(movielink)
    window.location.reload();
  }
 const likeMovie=(e)=>{
   e.stopPropagation();
   fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/add`, {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:id
      
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status == "ok") {
        console.log("added")
        setLikes(true)
      
      } else {
        console.log('error')
       
      }
      
    });

 }
 const deleteLikedMovie=async(e)=>{
  e.stopPropagation();
  const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/${id}`,{
    method: "DELETE",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",   
    }
})

if(response.status===200){
  
  setLikes(false)
    // togglelist()
    console.log("ok")
}
else{
  console.log("error deleting")
  
}

 }
 const addToWatchlist=(e)=>{
  e.stopPropagation();
  fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlater/add`, {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:id,
      
    }),
  })
    .then((res) => res.json())
    .then((data) => {
     
      if (data.status == "ok") {
       
       setWatchLater(true)
      
      } else {
        console.log("couldnt add to watchlist")
      }
      
    });
 }
 const deleteFromWatchlist=async(e)=>{
  e.stopPropagation();
  try {
      
    const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlater/${id}`,{
        method: "DELETE",
        crossDomain: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",   
        }
    })
    
    if(response.status===200){
          //update here
          
          setWatchLater(false);
        // togglelist()
       
    }
    else{
        console.log("watchlater deletion ")
    }

} catch (error) {
console.log(error.message)
}



 }

    return(
      <>

      
      <div id={id} key={id} onClick={moviePage} className='imagecomponent' >
      <img src={img} alt={title}   />
      {/* <span>{title}</span> */}
      <div id='operationIcons'>
      {watchLater?(<div className="boxButtons" onClick={(e)=>deleteFromWatchlist(e)}style={{marginRight:"8%"}}><EyeFill size={35}color='Green'></EyeFill></div>):
      (<div className="boxButtons" onClick={(e)=>addToWatchlist(e)}style={{marginRight:"8%"}}><Eye size={35}color='Green'></Eye></div>)}
      {likes?(<div className="boxButtons" onClick={(e)=>deleteLikedMovie(e) }style={{marginLeft:"8%"}}><HeartFill size={28} color='Red'></HeartFill></div>):
      (<div className="boxButtons" onClick={(e)=>likeMovie(e) }style={{marginLeft:"8%"}}><Heart size={28} color='Red'></Heart></div>)}
      
      </div>
      </div>
      </>
     
    )
}