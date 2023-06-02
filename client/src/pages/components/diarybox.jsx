import React ,{useEffect, useState}from 'react'
import Moviebox from '../../components/movieBox';
import "../styles.css"
export default function Diarybox(props){
    const {id}=props;
    const [data,setData] = useState([])
    
const movieDetails =async()=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
  let temp = await response.json()
  
  setData(temp);
    } catch (e) {
      console.log(e.message)
    }
  
  }
  useEffect(()=>{
  movieDetails()
  })
    return(
   <Moviebox title={data.title} id={data.id} img ={`https://image.tmdb.org/t/p/original/${data.poster_path}`}></Moviebox>
    )
}