import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles.css"
export default function Laterbox(props){
    const navigate=useNavigate();
    const {id,forrecomendations,category}=props;
    
    const [data,setData] =useState({})
    const getMovie=async()=>{
        const response =await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
        if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         
         const temp = await response.json();
        // console.log(watchlist)
         setData(temp)
    }
    const details =() =>{ 
        let link =`/films/${id}`
         navigate(link)
      }
    const deleteMovie=async()=>{
        if(category==="watchlater"){
            const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlater/${data.id}`,{
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
       
      
    }
    useEffect(()=>{
        getMovie()
    
    },[])
   
    let imgurl=`https://image.tmdb.org/t/p/original/${data.poster_path}`
    return(<>
        
        <div className='grid-item ' key={id}> 
            <img src={imgurl}  onClick={details} alt={data.title} />
            {/* <h1 className='custombutton'>{data.title}</h1> */}
            {(!forrecomendations&&(category!=="likes"))&&(<button className='custombutton btn btn-danger' onClick={deleteMovie}>Dlt</button>)}
        </div>
        
        </>
    )
}