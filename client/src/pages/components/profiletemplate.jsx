import React,{useState,useEffect} from 'react'
import AddFavourites from './addfavourites';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Laterbox from './laterbox';
export default function Profile(){
  const [isdone,setDone]=useState(false)
  const [favs,setfavs] =useState([])
  const[removedone,setremovedone] =useState(false)
  const [nosuggestions,isSuggestions] =useState(false)
  const[recData,setRecData]=useState([])
  const getfavs=useSelector(state=>state.favmovies.movies)
  const navigate=useNavigate();
  const Recarrayafterop =(array)=>{
    const uniqueArray = Array.from(new Set(array.map(movie => movie.id)))
    .map(id => array.find(movie =>movie.id === id)).sort((a,b) => a.vote_average-b.vote_average).reverse()
    return uniqueArray
 }
  const gotomoviepage =(id)=>{
    let link =`/films/${id}`
         navigate(link)
  }
  const addImage =()=>{
    if(!favs){
  console.log("empty favourites array")
    }
    else{
      // console.log(favs)
    favs.map(async (fav,index)=>{
      
      const divArray=["one","two","three","four"]
      try {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${fav}?api_key=${process.env.REACT_APP_API_KEY}`);
    let temp = await response.json()
    let url=`https://image.tmdb.org/t/p/original/${temp.poster_path}`
    const image = new Image();
    // image.classList.add('favmovie');
    image.id=fav
    image.src = url;
    image.alt = temp.title;
    image.addEventListener('click', ()=>gotomoviepage(temp.id) );
    
    let divp=`#${divArray[index]}`
    let number=`#${divArray[index]} div`
    
    const Parentdiv=document.querySelector(divp);
    const divElement = document.querySelector(number);
      Parentdiv.removeChild(Parentdiv.firstChild)
      divElement.insertBefore(image, divElement.firstChild);
    
    setDone(true)
    setremovedone(true)
      } catch (e) {
        console.log(e.message)
      }
    })
    
  } 
}
  const favarray=async()=>{
    try {
        const response= await fetch("http://localhost:5000/favourites/getdata",{
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
  
 
setfavs(data.favourites)
  

    } catch (e) {
        console.log(e.message);
    }
  
}

  
   const  addMovies =async()=>{
    console.log(getfavs)
    try {
      const response = await fetch("http://localhost:5000/favourites/add", {
        method: "POST",
        crossDomain: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          favs: getfavs,
        }),
      });
    
      const data = await response.json();
    
      if (data.status === "ok") {
        setDone(true);
      } else {
        // Handle other cases if needed
      }
    } catch (error) {
      
      console.error("Error:", error);
    }
    
  }
    const renderDivs = () => {
      const divArray=["one","two","three","four"]
        return divArray.map((divNumber) => (
          <AddFavourites divNumber={divNumber} donestatus={isdone} > </AddFavourites>
        ));
      };
    
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
      
     if(data.likes.length===0){
      isSuggestions(true)
      
     }

      let finalwala=[]
await Promise.all(data.likes.map(async(id)=>
{ 
 
  let res= await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
let temp = await res.json()

temp.results.map((result)=>{

  if(!data.likes.includes(result.id)){
    finalwala.push(result)
  }

})

}))  
      
      if(Recarrayafterop(finalwala).length>150){
        setRecData(Recarrayafterop(Recarrayafterop(finalwala).sort( ()=>Math.random()-0.5 ).slice(0,147)))
      }
      else{
      
      setRecData(Recarrayafterop(finalwala))
      }
    } catch (e) {
      console.log(e.message);
  }

}
      useEffect(()=>{
        favarray()
        recarray()
    },[])
    useEffect(()=>{
      addImage() 
  },[favs])

    return(<>
    <div>
    <span style={{marginLeft:"15%",marginTop:"2%"}}>Favourites Films</span>
    
    <div className="d-flex justify-content-around" style={{marginRight:"60%",marginLeft:"15%" ,height:"120px",marginTop:"1.5%"}}>
   {renderDivs()}
    </div>
    
      {!isdone?(<button className=' btn btn-info ' id="donebutton"onClick={addMovies} style={{marginLeft:"15%",marginTop:"2%"}}>Done</button>)
      :(<button className=' btn btn-info disabled' id="donebutton" style={{display:"none"}}>Added!</button>)}
    
    {!nosuggestions?(<span style={{marginLeft:"15%",marginTop:"2%",marginBottom:"1%"}}>Movies youd like:</span>):
    (<span style={{marginLeft:"15%",marginTop:"2%",marginBottom:"1%"}}>We dont have any suggestions for you,<br></br> please use this app more to get suggestions</span>)}
     {/* recomennded movies below */}
  <div className='grid-container' style={{marginLeft:"15%"}}>
    {recData.map(movie=><Laterbox id={movie.id} forrecomendations={true}/>)}
    </div>
    
    </div>
    </>)
}