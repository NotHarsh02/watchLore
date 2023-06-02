import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom';
import Laterbox from "./components/laterbox"
import Nav from "../UI/navbar"
import "./styles.css"

export default function Watchlist(props){
    
    const { user} = useParams();
    const {profile,passtolaterbox}=props
    const [movies,setMovies] =useState([]);
    const [loading,isLoading] =useState(true)
    const watchlaterarray=async()=>{
        try {
            const response= await fetch("http://localhost:5000/watchlater/getdata",{
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
      
      setMovies(data.watchLater)
      isLoading(false);
  
      
   
        } catch (e) {
            console.log(e.message);
        }
      
    }
    useEffect(()=>{
        watchlaterarray()    
    },[])
    if(!movies.length&&!loading){
        return(<div >
        {!profile&&(<Nav></Nav>)}
        <h1 className='nomovies'>No movies in your watchlater,add now!</h1>
        </div>
        )
    }
return(<>
 {!profile&&(<><Nav></Nav>
 <h5 style={{borderBottom: "1px solid #456" ,marginLeft:"20%",marginRight:"22.8%",textAlign:"start",marginBottom:"2%"}}>{`${user.charAt(0).toUpperCase()+ user.slice(1)} wants to see ${movies.length} film${movies.length===1?"":"s"}` }</h5>
 </>)}
 {profile&&(<h1 style={{marginBottom:"3%"}}></h1>)}

  
  <div className='grid-container' >
    {movies.map(movie=><Laterbox id={movie} categpry="watchlist"/>)}
    </div>
    
    </>
)
}