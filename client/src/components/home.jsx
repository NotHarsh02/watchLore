import React, { useState,useEffect} from 'react'
import Nav from '../UI/navbar'
import MovieList from '../pages/MovieList';
import "./styles.css"
import { Swiper, SwiperSlide } from "swiper/react";
import Start from "./getStarted"
import Loading from "../UI/loading"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
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
   const [newUser,setNewUser]=useState(true);

   const recArray=async()=>{
    try {
      const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/getdata`,{
        method: "GET",
        crossDomain: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",  
        } 
        })
        const data= await response.json();
        console.log(data.likes.length)
        if(data.likes.length!==0){
          setNewUser(false);
        }
      
    } catch (error) {
      
    }
   }
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

  const temp = await response.json();
  // console.log(temp)

  if (temp==="no") {
    console.log("no user info present")
  }
  else{
    console.log("present now")
  setData(temp);
  }

 
 
  
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
 const listMake = () => {
  // Change the URL
  window.location.href = '/lists';
};

// if no watchlist no recomendation fetch from backend
 
useEffect(()=>{
   nowRunning()
   isLogIn()
   recArray();
   
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
{isLoggedIn&&(
  !newUser?((isLoggedIn)&&(<h1 id="welcomeMessage">Welcome back,<a id="nameTag" href={`/profile/${data}`}>{data}</a>. Here's what we recommend for you:</h1>)):
  (<h1 id="welcomeMessage">{`Welcome to  Watchlore.TM,${data}`} </h1>)

)}


{(!isLoggedIn)&&(<>
<div className='fullscreen'>

<Start/>

</div>
<Carousel ></Carousel> 

</>
)
}

{(isLoggedIn)&&(<><Carousel allrec={true} ></Carousel><a id="seemore" href={`/profile/${data}`} >Check Profile</a></> )}

{isLoggedIn&&(<Carousel  ></Carousel> )}

<div style={{display:"flex",flexDirection:"row",marginTop:"5%",marginRight:"5%",justifyContent:"space-evenly"}}>
  <div style={{display:"flex",flexDirection:"column",alignContent:"space-between"}}><h1 id="makeListHome">Watch more,see more make or explore lists now:</h1>
  <button className='btn btn-success' style={{marginRight:"20%",marginLeft:"20%"}} onClick={listMake}>Make lists now!</button>
  </div>
  
  <img style={{width:"20%",height:"40%"}}src="https://media1.tenor.com/m/4FVPGc4HuVEAAAAC/pop-corn-movie.gif" alt="" />
  </div>

{isLoggedIn&&(<Carousel highrated={true} ></Carousel> )}


</>
   
)

    
}