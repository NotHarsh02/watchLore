import React, { useState,useEffect} from 'react'
import Nav from '../UI/navbar'
import Moviebox from "./movieBox"
import "./styles.css"
import { Swiper, SwiperSlide } from "swiper/react";
import Start from "./getStarted"
import Loading from "../UI/loading"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import Carousel from '../UI/carousel';
import { Pagination } from "swiper";
import { movieActions } from '../store/movies';
import { useDispatch } from 'react-redux';
export default function Home(props){
   const [isLoading, setLoading] = useState(true);
  const dispatch =useDispatch()
   const[popular,setPopular] =useState([]);
   const [data,setData] =useState([]);
   const [isLoggedIn, setLoggedIn] = useState(false);

   
 
const nowRunning =async()=>{
   const response =await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       const temp = await response.json();
       dispatch(movieActions.fetchMovies(temp.results));
       setPopular(temp.results);
      
}
const userInfo =async()=>{
  const response =await fetch(`${process.env.REACT_APP_BACKEND_URL}/getinfo`, {
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

 
 
  
}
const isLogIn = async () => {
   try {
     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/checkLogin?${Date.now()}`, {
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


// if no watchlist no recomendation fetch from backend
 
useEffect(()=>{
   nowRunning()
   isLogIn()
   
   // toprated()
   // console.log(data)
},[])

useEffect(()=>{
  userInfo()
  // toprated()
  // console.log(data)
 
},[])

if (isLoading) {
   return(
   <div className="loading">
     <Loading/>;
   </div>
   ) 
 }
return(<>
<Nav></Nav>

{(isLoggedIn)&&(<h1 id="welcomeMessage">{`Welcome back,${data}.\nHere's what we recommend for you:`}</h1>)}

{(!isLoggedIn)&&(<>
<div className='fullscreen'>

<Start/>

</div>
<Carousel ></Carousel> 
</>
)
}

{(isLoggedIn)&&(<><Carousel allrec={true} ></Carousel><a href={`/profile/${data}`} style={{marginLeft:"83%"}}>See more</a></> )}
{isLoggedIn&&(<Carousel  ></Carousel> )}
{isLoggedIn&&(<Carousel highrated={true} ></Carousel> )}


</>
   
)

    
}