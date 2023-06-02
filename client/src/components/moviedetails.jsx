import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import Nav from "../UI/navbar";
import YouTube, { YouTubeProps } from 'react-youtube';
import { Heart,HeartFill } from 'react-bootstrap-icons';
import "./styles.css"
import Loading from "../UI/loading"
import Carousel from '../UI/carousel';
export default function Details(props){
  const [trailer,setTrailer]=useState(false)
    const { movieId } = useParams();
    const [data,setData] = useState([]);
    const [genre,setGenre] =useState([]);
    const [providers,setProviders] =useState([]);
    const [credits,setCredits] =useState([])
    const [recommendations,setRecommendations] =useState([]);
    const [isWatchLater,setWatchLater] =useState(false)
    const [isLiked,setLike] =useState(false)
    const [watched,isWatched] = useState(false)
    const[loading,setLoading] =useState(true)
    const [moviedate,setMoviedate] =useState("")
    const [videoKey,setVideoKey]=useState("")
    const[trailerexists,setExists]=useState(true)
    const date=new Date();
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }); 
    const dateOfMonth = date.getDate(); 
   
    const year = date.getFullYear(); 
    
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    
    let month = months[date.getMonth()];
const movieDetails =async()=>{
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`);
let temp = await response.json()

setData(temp);
setGenre(temp.genres)
  } catch (e) {
    console.log(e.message)
  }

}
const getProviders =async()=>{try {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`)
  let tempb= await response.json()

if(tempb.results.US.buy){
  setProviders(tempb.results.US.buy)
}
else{
  setProviders(tempb.results.US.flatrate)
}


// console.log(tempb.results.US.buy)
} catch (e) {
  console.log(e.message)
}
}

const getCredits = async ()=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
  let tempc= await response.json()
  setCredits(tempc.cast.slice(0,8))
  
}
const getRecommendations =async()=>{
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
  let {results}= await res.json()
  // console.log(results);
  setRecommendations(results)
  
  setLoading(false)
}

const getTrailer =async()=>{
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
  let {results}= await res.json()
  // console.log();
  if(results.length>0){
  setVideoKey(results[0].key)
  }
  else{
    setExists(false)
  }

}
const addToWatchLater =()=>{
  
  fetch("http://localhost:5000/watchlater/add", {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:movieId,
      
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.status == "ok") {
       
       setWatchLater(true)
      
      } else {
        
      }
      
    });
}

const addToLikes =()=>{
  
  fetch("http://localhost:5000/likes/add", {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:movieId,
      
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.status == "ok") {
       
       setLike(true)
      
      } else {
        
      }
      
    });
}
const checkWatchLater=()=>{
  fetch("http://localhost:5000/watchlater/check", {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:movieId
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.status == "yes") {
       
      //  setLoading(false)
       setWatchLater(true);
       
      } else {
        
      }
      
    });
}
const checkLikes=()=>{
  fetch("http://localhost:5000/likes/check", {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:movieId
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.status == "yes") {
       
      //  setLoading(false)
       setLike(true);
       
      } else {
        
      }
      
    });
}
const addtodiary=()=>{

  fetch("http://localhost:5000/diary/add", {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:movieId,
      date:`${month} ${dateOfMonth}, ${year}`
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.status == "ok") {

        isWatched(true)
        window.location.reload()
        
      } else {
        console.log("problem")
        
      }
    });

}
const isDiary=()=>{
  fetch("http://localhost:5000/diary/check", {
    method: "POST",
    crossDomain: true,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      movieId:movieId
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.status == "no") {
      
      } else {
        console.log(data.date)
        setMoviedate(data.date)
        isWatched(true)
      }
    });
}
const opts = {
  height: '500',
  width: '840',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoPlay: 1,
  }
}
const _onReady=(event)=> {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}
const toggletrailer=()=>{
  setTrailer(!trailer)
}
const deleteMovie=async()=>{
  
      const response= await fetch(`http://localhost:5000/likes/${movieId}`,{
          method: "DELETE",
          crossDomain: true,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",   
          }
      })
      if(response.statusText==="OK"){
          window.location.reload();
          // togglelist()
          console.log("ok")
      }

 

}
useEffect(() => {
  
   movieDetails()
  getProviders();
  getCredits();
  checkWatchLater();
  checkLikes();
  getRecommendations();
  isDiary()
  getTrailer()
  
 
  // console.log(data)
},[] );

  
  return(
   
      <>
   
    <div className='poster' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`}}>
      
      <Nav></Nav>
      
     </div>
    
     <h5 >{data.title}</h5>
    
     
     
    
    <div className='info mt-5'>
    <div className="col-2 infoleft">
      <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="" />
      
      
    </div>
    <div className="col-6 inforight" >
    
    <div className="col-8" >
    <p >{data.overview}</p>
    
    
    <div id ="genres">
    {genre.map(gen=><h5 className='btn btn-info' >{gen.name}</h5>)}
    </div>
    <h6 id="classTitle">Cast:</h6>
    <div id= "credits">
    {credits.map(credit=><span className='btn btn-secondary'>{credit.name}</span>)}
    </div>
    </div>
    <div className='d-flex flex-column watchlaterbtn' style={{marginLeft:"2%"}}>
      <div className='d-flex'>
      {isLiked?<div onClick={deleteMovie} style={{marginLeft:"14%",clickable:"true"  }}><HeartFill color="red" size={40}></HeartFill><br />Liked</div>:
      <div  style={{marginLeft:"14%",cursor: "pointer"}}onClick={addToLikes} ><Heart size={40} color="red"></Heart>
      </div>}
      <a style={{marginLeft:"10%",textDecoration:"none",fontSize:"large",marginTop:"1%"}}href={`https://tpb25.ukpass.co/search.php?q=${data.title}&cat=201`}target="_blank">Download now</a>
      </div>
      {watched?<span style={{marginLeft:"15%",marginTop:"5%",marginBottom:"5%"}}>{`Watched last on ${moviedate}`}</span>:<></>}
      <span style={{marginLeft:"5%",marginBottom:"5%"}}>Available on:</span>
    <div className="col-6 logos ">
    {providers.map(provider=><img className='logo' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}></img>)}
    </div>
    <div className='d-flex buttons'>
      {isWatchLater?<button className='btn btn-info disabled'>in list!</button>:
      <button className='btn btn-info ' onClick={addToWatchLater} >Watch later</button>}
      {watched?<></>:(<button className='btn btn-info' onClick={addtodiary}>Add to diary</button>)}
      {trailerexists&&(<button className='btn btn-info' onClick={ toggletrailer}>Trailer</button>)}
      
      </div>
      
    </div>
    
    </div>
    
    
    </div>
    {trailer&&( <><div onClick={toggletrailer} className="overlay"></div><div className='youtubePlayer'><button onClick={toggletrailer} className="btn btn-danger close-modal ">Close</button><YouTube videoId={videoKey} opts={opts} onReady={_onReady} iframeClassName="iframeClass"/></div></>)}
    {!trailer&&(<Carousel recommendations={recommendations}></Carousel>)}
    
     
     
     </>
    
    )


}

