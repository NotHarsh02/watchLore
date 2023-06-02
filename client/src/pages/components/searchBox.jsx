import React from 'react';
import {Route, useNavigate} from 'react-router-dom';
import "../styles.css"
export default function Searchbox(props){
    const {img,title,overview,date,id} =props
    const navigate = useNavigate();
    const moviePage=()=>{
        let movielink =`/films/${id}`;
        navigate(movielink)
    }
    return(
        <div className='searchResult' onClick={moviePage} >
            
            <img src={img} alt={`${title} poster`} />
            
            <div className="desc">
                <div className='d-flex '>
                <h4>{title}</h4>
                <h4 className='customh4'>{date}</h4>
                </div>
               
                <p style={{overflow:"hidden"}}>{overview}</p>
            </div>
        </div>
    )
}