import React, { Component,useEffect,useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Nav from "../UI/navbar"
import { PencilFill } from 'react-bootstrap-icons';
import "./styles.css"
import Moviebox from '../components/movieBox';
export default function MovieList(){
    const navigate = useNavigate();
    const[username,setUserName] =useState([]);
    const [listName,setListName]=useState([]);
    const [listMovies,setListMovies]=useState([]);
    const getMovieList = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/list/getLists`, {
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
        // console.log(data)
        let final=[]
        let name=[];
        let user=[]
    
  await Promise.all(data.map(async(id)=>
{ 
  
user.push(id.user.username);
  name.push(id.name)

  let singleList=[];
  
   await Promise.all(id.movies.map(async (movieid)=>{
        let res= await fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.REACT_APP_API_KEY}`)
        let temp = await res.json()
        // console.log(temp)
        singleList.push(temp);
   }))
   final.push(singleList);
   



}))  
      
      
      setUserName(user);
        setListName(name);
        setListMovies(final);
        
        
      } catch (error) {
        console.error(error);
      } 
    }
   const editList=(index,e)=>{
    e.stopPropagation();
    let listlink =`/lists/${listName[index]}/edit`;
      navigate(listlink)
   }
    const gotoListPage=(index)=>{
      let listlink =`/lists/${listName[index]}`;
      navigate(listlink)
      // window.location.reload();
      
    }
   
    useEffect(()=>{
 getMovieList();

    },[])

    if(window.innerWidth <= 1000){
      return(<>
      <Nav></Nav>
      <h3>This page is not yet ready for mobile devices.</h3>
      </>)
    }
    return(
        <>
        <Nav></Nav>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <h3>Collect, curate, and share. Lists are the perfect way to group films.</h3>
          <button className='btn btn-info' style={{width:"10%",marginLeft:"44%",marginTop:"1%"} } onClick={()=>navigate("/lists/new")}>Make a list now!</button>
          </div>
<div id="alllists">
          {listMovies.map((list, index) => (
  <div key={index} className='movielist'onClick={()=>gotoListPage(index)}>
    <div className='d-flex'>
    <span style={{marginRight:"50%"}}>{listName[index]}</span>
    <PencilFill size={20} onClick={(e)=>editList(index,e)} />
    </div>
   
   <span>{username[index].charAt(0).toUpperCase() + username[index].slice(1)}</span>
   
   
    <div className='moviesoflist'>
    {list.slice(0,4).map((movie) => (
      // <span key={movie.id}>{movie.title}</span>
      <div className='eachMovieInList'><Moviebox title={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}></Moviebox></div>
      
    ))}
    </div>
    
    
  </div>
))}
</div>

          
         
                       
         
        </>
    )
}