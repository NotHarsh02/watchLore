import React ,{useEffect,useState} from 'react';
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import "../components/styles.css"
import { Swiper, SwiperSlide } from "swiper/react";
import Moviebox from '../components/movieBox';
import { useSelector } from 'react-redux';
export default function Carousel(props){
  const [rated,setTopRated] =useState([]);
  
  const popular = useSelector(state => state.movies.movies);
  const {highrated,recommendations,allrec} =props
  //recomendations for moviebox component
  const [rec,setRec]=useState([])
  
 const Recarrayafterop =(array)=>{
    const uniqueArray = Array.from(new Set(array.map(movie => movie.id)))
    .map(id => array.find(movie =>movie.id === id)).sort(() => Math.random() - 0.5)
    return uniqueArray
 }
  const toprated =async()=>{
   const response =await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       const temp = await response.json();
       setTopRated(temp.results);
}

const recarray=async()=>{
  try {
      const response= await fetch("http://localhost:5000/likes/getdata",{
          method: "GET",
          crossDomain: true,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",   
          }
      })
const data= await response.json()
// console.log(data)

let finalwala=[]
await Promise.all(data.likes.map(async(id,index)=>
{ 
 
  let res= await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
let temp = await res.json()
if(data.likes.length>4){
  //get some recomendattions from each movie in likes array
temp.results.slice(0,3).map((result)=>{

  if(!data.likes.includes(result.id)){
    finalwala.push(result)
  }

})
}
else{
  temp.results.map((result)=>{

    if(!data.likes.includes(result.id)){
      finalwala.push(result)
    }
  
  })
}
}))
const updatedfinal=Recarrayafterop(finalwala)


if (finalwala.length>30){
 
setRec(updatedfinal.slice(0,31))
}

else{

setRec(updatedfinal)

}
// console.log(updatedfinal)
// updatedfinal.map((movie)=>{console.log(`${movie.title} and ${movie.vote_average}`)})
// console.log(updatedfinal)

  } catch (e) {
      console.log(e.message);
  }

}

useEffect(()=>{
  
  if(highrated){ 
    toprated()
  }
  if(allrec){
    recarray()
    
  }
  
},[])




if(allrec&& allrec.length!==0){
  return(
  <div className='carousel' id="recvala">
   
<Swiper 
slidesPerView={9}
spaceBetween={5}

modules={[Pagination]}
className="mySwiper"
>

{
rec.map(movie=><SwiperSlide ><Moviebox  title ={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}></Moviebox></SwiperSlide>)
}

</Swiper>
</div>
)
}


if(recommendations&&recommendations.length!==0){
  return(
    <div className='recCard'>
<h5 className='d-flex justify-content-start mb-3' style={{ borderBottom: "1px solid #456"}}>You might also like:</h5>
          
<Swiper 
        slidesPerView={6}
        spaceBetween={5}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Pagination]}
        className="mySwiper"
      >


{recommendations.map(movie=><SwiperSlide ><Moviebox  title ={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}></Moviebox></SwiperSlide>)}


</Swiper>
</div>
  )
}
if(!recommendations){
    return(

      
        <div className='carousel'>
          {highrated? <h5 className='d-flex justify-content-start mb-3' style={{ borderBottom: "1px solid #456"}}>Top Rated Movies:</h5>:
          <h5 className='d-flex justify-content-start mb-3' style={{ borderBottom: "1px solid #456"}}>Popular movies this week:</h5>}
<Swiper 
        slidesPerView={9}
        spaceBetween={5}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Pagination]}
        className="mySwiper"
      >

{highrated?
rated.map(movie=><SwiperSlide ><Moviebox  title ={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}></Moviebox></SwiperSlide>):
popular.map(movie=><SwiperSlide ><Moviebox  title ={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}></Moviebox></SwiperSlide>)}

</Swiper>
</div>
    )
}
}