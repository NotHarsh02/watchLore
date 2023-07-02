import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import Nav from "../UI/navbar";
import YouTube, { YouTubeProps } from 'react-youtube';
import { Heart,HeartFill,Clipboard,ClipboardFill,PlayBtnFill,BookmarkPlus,BookmarkFill,JournalBookmark,JournalBookmarkFill} from 'react-bootstrap-icons';
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
    const [isLoggedIn, setLoggedIn] = useState(false);
    const date=new Date();
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }); 
    const dateOfMonth = date.getDate(); 
    const [copied,setCopy]=useState(false);
    const [update,doUpdate]=useState(false);
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
  fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlater/check`, {
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
  fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/check`, {
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

  fetch(`${process.env.REACT_APP_BACKEND_URL}/diary/add`, {
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
  fetch(`${process.env.REACT_APP_BACKEND_URL}/diary/check`, {
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
  if(window.innerWidth <= 1000){
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
    window.location.href = youtubeUrl;
  }
  else{
    setTrailer(!trailer)
  }
  
}
const deleteMovie=async()=>{
  
      const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/${movieId}`,{
          method: "DELETE",
          crossDomain: true,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",   
          }
      })
      console.log(response)
      if(response.statusText==="OK"){
        setLike(false)
          // togglelist()
          console.log("ok")
      }
      else{
   console.log("dltionproblem");
      }
      
}

const deleteFromWatchLater=async()=>{
  try {
      
          const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlater/${movieId}`,{
              method: "DELETE",
              crossDomain: true,
              credentials: 'include',
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",   
              }
          })
          console.log(response.json())
          if(response.statusText==="OK"){
                //update here
                
                setWatchLater(false);
              // togglelist()
             
          }
          else{
              console.log("watchlater deletion problem")
          }
      
  } catch (error) {
      console.log(error.message)
  }

 

}

useEffect(() => {
  
   movieDetails()
  getProviders();
  getCredits();
  getRecommendations();
  getTrailer();
  checkWatchLater();
  checkLikes();
  isDiary()

},[] );

  
  return(
   
      <>
      
   
    <div className='poster' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`}}>
    
    {(window.innerWidth >= 1000)&&(<Nav></Nav>)}
      
      
     </div>
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
    <h5 >{data.title}</h5>
     {copied?<span className="copywala"style={{width:"2%",marginTop:"13.5px"}}><ClipboardFill></ClipboardFill></span>:
      <span className='copywala' onClick={()=>{navigator.clipboard.writeText(window.location.href); setCopy(true)}}style={{width:"2%",marginTop:"13.5px",cursor:"pointer"}}><Clipboard></Clipboard></span>}
    </div>
    
    
     
     
    
    <div className='info mt-5'>
    <div className="col-2 infoleft">
      <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="" />
      
      
    </div>
    <div className="col-6 inforight" >
    
    <div className="col-8" >
    <p >{data.overview}</p>
    
    
    <div id ="genres">
    {genre.map(gen=><h5 className='btn btn-secondary disabled' >{gen.name}</h5>)}
    </div>
    <h6 id="classTitle">Cast:</h6>
    <div id= "credits">
    {credits.map(credit=><span className='btn btn-secondary disabled'>{credit.name}</span>)}
    </div>
    </div>
    <div className='d-flex flex-column dbbuttonparent'>
      <div className='d-flex buttonsfordb' style={{justifyContent:"center"}}>
      {/* like icon */}
      <div>
      {isLiked ? (
     <div onClick={deleteMovie} style={{ marginLeft: "14%", clickable: "true" }}><HeartFill color="red" size={40}></HeartFill></div>) : (
  <div style={{ marginLeft: "14%", cursor: "pointer" }} onClick={addToLikes}><Heart size={40} color="red"></Heart></div>)}
  <span style={{marginLeft:"30%"}}>Like</span>
</div>
    {/* watch later icon */}
    <div style={{marginLeft:"10%"}}>
     {isWatchLater?<span onClick={deleteFromWatchLater} className="watchlaterspan"style={{cursor:"pointer",marginLeft:"2%"}}><BookmarkFill size={35}></BookmarkFill></span>:
      <span className="watchlaterspan" style={{cursor:"pointer",marginLeft:"2%"}}onClick={addToWatchLater} ><BookmarkPlus size={35}></BookmarkPlus></span>}
        <span style={{marginRight:"7%",marginTop:"8%"}}>WatchList</span>
    </div>
    {/* trailer icon */}
    <div style={{marginLeft:"6%"}}> 
      {trailerexists&&(<span id="trailerspan" style={{cursor:"pointer",marginLeft:"4%"}}onClick={ toggletrailer}><PlayBtnFill size={42}></PlayBtnFill></span>)}
      <span style={{marginTop:"5%"}}>Trailer</span>
      </div>
      {/* diary icon */}
      <div style={{marginLeft:"10%"}}>
      {watched?<></>:(<span onClick={addtodiary} style={{ marginLeft: "5%", clickable: "true" }}><JournalBookmark size={33}></JournalBookmark></span>)}
      {!watched&&(<span style={{marginTop:"21%"}}>Diary</span>)}
      </div>
      </div>
      {watched?<span style={{marginLeft:"15%",marginTop:"4%",marginBottom:"5%"}}>{`Watched last on ${moviedate}`}</span>:<></>}
      
    <div className="col-6 logos " style={{marginTop:'5%'}}>
    {providers.slice(0,3).map(provider=><img className='logo' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}></img>)}
    </div>
    
      
      
      
      
      
    </div>
    
    </div>
    
    
    </div>
    {trailer&&( <><div onClick={toggletrailer} className="overlay"></div><div className='youtubePlayer'><button onClick={toggletrailer} className="btn btn-danger close-modal ">Close</button><YouTube videoId={videoKey} opts={opts} onReady={_onReady} iframeClassName="iframeClass"/></div></>)}
    {!trailer&&(<Carousel recommendations={recommendations}></Carousel>)}
    
     
     
     </>
    
    )


}

