import React, { Component } from 'react';
import "./styles.css"
import { Navigate } from 'react-router'
import { useNavigate} from 'react-router-dom';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Moviebox(props){
  
  const {title,img,id} = props;
  const navigate = useNavigate();
  const moviePage=()=>{

    let movielink =`/films/${id}`;
    navigate(movielink)
    window.location.reload();
  }
 

    return(
      <>

      
      <div id={id} key={id} onClick={moviePage} className='imagecomponent' >
      <img src={img} alt={title}   />
      {/* <span>{title}</span> */}
    
      </div>
      </>
     
    )
}