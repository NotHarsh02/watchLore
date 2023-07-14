import React, { Component ,useEffect,useState} from 'react';
import { useParams } from 'react-router-dom'
import Moviebox from '../components/movieBox';
import Nav from "../UI/navbar"
export default function Listpage(){
    let { listname } = useParams();
    const [listData,setListData]=useState([]);
    const [moviearr,setmoviearr]=useState([]);
    const [description,setdescription]=useState("")
    const getListInfo = async()=>{
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/list/getList`, {
                method: "POST",
                crossDomain: true,
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Access-Control-Allow-Origin": "*",   
                },
                body: JSON.stringify({
                  listname
                  }),

              })
              const data = await response.json();
              setListData(data);
              setdescription(data[0].description)
              let movieinfo=[]
        await Promise.all(data[0].movies.map(async (movieid)=>{
            let res= await fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.REACT_APP_API_KEY}`)
            let temp = await res.json()
            // console.log(temp)
            movieinfo.push(temp);
       }))
       
       setmoviearr(movieinfo);
       
        } catch (error) {
            console.log("fetchlist not working")
        }
    }
  
        

    
    useEffect(()=>{
        getListInfo()
       
        
    },[])

    return(<>
    <Nav></Nav>
        <div style={{display:"block",marginLeft:"15%",marginRight:"29%"}}>
        <h3 style={{display:"block",marginLeft:"0%"}}>{listname} </h3>
        {<p>{description}</p>}
        </div>
        <div className='grid-container mt-4'>
        {moviearr.map((movie)=><Moviebox id={movie.id} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} title={movie.title}></Moviebox>)}
        </div>
        </>
    )
}