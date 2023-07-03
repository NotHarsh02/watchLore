import React ,{useEffect,useState}from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import Laterbox from "./components/laterbox"
import Nav from "../UI/navbar"
import "./styles.css"

export default function Watchlist(props){
  const navigate=useNavigate();
  
    
    const { user} = useParams();
    const {profile}=props
    
    const [ids,setIds] =useState([]);
    const [loading,isLoading] =useState(true);
    const[movies,setMovies]=useState([])
    // const handleDeleteMovies = (id) => {
    //   const result=movies.filter(movie => movie !== id);
      
    //   setMovies(result);
       
    //   };
    const details =(id) =>{ 
      let link =`/films/${id}`
       navigate(link)
    }
    const watchlaterids=async()=>{
        try {
            const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlater/getdata`,{
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
      console.log("called")
      
      setIds(data.watchLater)
      
      isLoading(false);
  
      
   
        } catch (e) {
            console.log(e.message);
        }
      
    }
const getWatchlist=async()=>{
  const results=[];
   await Promise.all (ids.map(async(id)=>{
      const response =await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
      if (!response.ok) {
        console.log("error in watchlost get")
       }
       
       const temp = await response.json();
      // console.log(watchlist)
      
       results.push(temp);
  
    }))
    isLoading(false);
    console.log(ids)
    setMovies(results);
  }
  const deleteMovie=async(id)=>{
    try {
        
            // const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlater/${id}`,{
            //     method: "DELETE",
            //     crossDomain: true,
            //     credentials: 'include',
            //     headers: {
            //       "Content-Type": "application/json",
            //       "Accept": "application/json",
            //       "Access-Control-Allow-Origin": "*",   
            //     }
            // })
            // if(response.status===200){
              if(true){
                
              setMovies(movies.filter(movie => movie.id !== id))
              isLoading(false)
               
            }
            else{
                console.log("error deleting movie from watchlater")
            }

        
    } catch (error) {
        console.log(error.message)
    }
 
   
  
}
      
    useEffect(()=>{
      watchlaterids();
     
    },[])
    useEffect(()=>{
      
      getWatchlist()
    },[ids])
    

 
    if(movies.length===0&&!isLoading){
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
    {movies.map(movie=> <div className='grid-item ' key={movie.id}> 
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}  onClick={()=>{details(movie.id)}} alt={movie.title} />
            <button className='custombutton btn btn-danger' onClick={()=>deleteMovie(movie.id)}>Dlt</button>
        </div>)}
   
    </div>
    
    </>
)
}