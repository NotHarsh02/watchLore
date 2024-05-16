import React ,{useEffect,useState} from 'react';
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {  Autoplay,EffectCoverflow, Pagination, Navigation} from "swiper";
import { ArrowRightCircle ,ArrowLeftCircle} from 'react-bootstrap-icons';
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
         console.log("cannot fetch top rated data")
       }
       const temp = await response.json();
       console.log(temp)
       setTopRated(temp.results);
}

const recarray=async()=>{
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
const data= await response.json()
// console.log(data)

let finalwala=[]
await Promise.all(data.likes.map(async(id)=>
{ 
  try {
    let res= await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
    let temp = await res.json()
    if(data.likes.length>4){
      //get some recomendattions from each movie in likes array
    temp.results.slice(0,6).map((result)=>{
    
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
  } catch (error) {
    console.log("some problem with rec")
  }
 
 
}))
const updatedfinal=Recarrayafterop(finalwala)


if (finalwala.length>40){
 
setRec(updatedfinal.slice(0,40))
}

else{

setRec(updatedfinal)

}
// console.log(updatedfinal)
// updatedfinal.map((movie)=>{console.log(`${movie.title} and ${movie.vote_average}`)})
// console.log(updatedfinal)

  } catch (e) {
      console.log("cannot fetch reccomendations");
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
initialSlide={8}
effect={'coverflow'}
grabCursor={true}
centeredSlides={true}
// slidesPerView={9}
// spaceBetween={5}
slidesPerView={8}
autoplay={{ delay: 2500 }}
coverflowEffect={{
  rotate: 0,
  stretch: 0,
  depth: 25,//distance betwn slides
  modifier: 4,//focus 
}}
pagination={{ el: '.swiper-pagination', clickable: true }}
navigation={{
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
  clickable: true,
}}
modules={[Autoplay,EffectCoverflow, Pagination, Navigation]}
className="swiper_container"

>

{
rec.map(movie=><SwiperSlide className='swiperslidecustom' ><Moviebox  title ={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}></Moviebox></SwiperSlide>)
}
<div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            {/* <ion-icon name="arrow-back-outline"></ion-icon> */}
            <ArrowLeftCircle color='white' size={40}></ArrowLeftCircle>
          </div>
          <div className="swiper-button-next slider-arrow">
            {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
            <ArrowRightCircle color='white' size={40}></ArrowRightCircle>
          </div>
          
        </div>
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
        grabCursor={true}
    
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Navigation]}
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
        grabCursor={true}
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