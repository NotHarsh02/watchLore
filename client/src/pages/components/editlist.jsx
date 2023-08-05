import React, { Component ,useState,useEffect} from 'react';
import Nav from "../../UI/navbar"
import Moviebox from '../../components/movieBox';
import {useNavigate,useParams} from 'react-router-dom';
import "./modal.css"
export default function Newlist(){
  const navigate=useNavigate();
  let { listname } = useParams();
  const [name,setName] =useState("");
  const [tag,setTag] =useState("")
  const [description,setDescription]=useState("")
  const [searchTerm, setSearchTerm] = useState('');
  const [components, setComponents] = useState([]);
  const [movieIds,setMovieIds]=useState([]);
  const [movies, setMovies] = useState([]);
  const[saveDisabled,setDisabled]=useState(true);
  
    function saveToDb(e){
      e.preventDefault();
      console.log(listname)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/list/${listname}`, {
          method: "PUT",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.status);
            if (data.status == "ok") {
              console.log("success")
              const promptElement = document.createElement('div');
              promptElement.textContent = 'Saved List!';
              promptElement.style.position = 'fixed';
              promptElement.style.top = '60px';
              promptElement.style.left = '10px';
              promptElement.style.padding = '10px';
              promptElement.style.borderRadius="2%"
              promptElement.style.backgroundColor = 'green';
              promptElement.style.color = 'white';
              promptElement.style.zIndex = '9999';
              promptElement.style.width="20%";
              promptElement.style.textAlign="center";

      document.body.appendChild(promptElement);

      setTimeout(() => {
        promptElement.remove();
      }, 2000);
              
              
              
            } else {
              console.log("problem")
              
            }
          });
      
      setDisabled(true);
    }
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

    const enableSave=()=>{
      setDisabled(false);
      const nameInput=document.querySelector("#listName");
      
      const textInput=document.querySelector("textarea")
    
      if(nameInput.value===name && textInput.value===description ){
        setDisabled(true)
      }
      
      
    }
    const addComponent = (movie) => {
        // Create a new component instance and add it to the components array
        const newComponent = <Moviebox title={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}/>;
        setComponents([...components, newComponent]);
        setSearchTerm('')
        setMovieIds([...movieIds,movie.id]);
        setDisabled(false);
      };
      
      const removeComponent = (index) => {
        console.log(components[index].props.id);
        setMovieIds(movieIds.filter((movieid) => movieid !== components[index].props.id));
        const updatedComponents = [...components];
        updatedComponents.splice(index, 1);
        setComponents(updatedComponents);
        setDisabled(false);
      };
      const fetchData = async () => {
        if (searchTerm) {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
          );
          const data = await response.json();
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      };

        const getPresentComponents=async ()=>{
           
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
                      console.log(data[0]);

                const nameInput=document.querySelector("#listName");
                setName(data[0].name)
                setDescription(data[0].description)
                setTag(data[0].tags)
                nameInput.value=data[0].name
                const tagInput=document.querySelector("#listTag")
                data[0].tags?tagInput.value=data[0].tags:tagInput.value="Add Tags!"
                
                const textInput=document.querySelector("textarea")
                textInput.value=data[0].description
                
                //add all the movies to the component (working here)
                const moviePromises=data[0].movies.map(async(id)=>{
                  
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
                    let movie = await response.json();
                    return <Moviebox title={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}/>;
                })
                const newComponents = await Promise.all(moviePromises);
               setComponents((prevComponents) => [...prevComponents, ...newComponents]);
              
           


                
               
                } catch (error) {
                    console.log("fetchlist not working")
                }
            
        }
      useEffect(() => {
        getPresentComponents();
        fetchData();
      }, [searchTerm]);
    return(
        <>
        <Nav></Nav>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"-4%"}}>
    <h3 style={{marginRight:'34%',marginBottom:"2%"}}>Edit list</h3>

    
    <form onSubmit={saveToDb} autoComplete="false" >
    <div style={{display:"flex"}}>
        <div>
    
    <input type="name" 
     className="form-control"
     placeholder="Name"
     id="listName"
     onChange={enableSave}
     style={{marginBottom:"10%",marginTop:"2%"}}/>


    <input type="name" 
    id="listTag"
     className="form-control"
     placeholder="Tags(eg.Top50)"
     onChange={enableSave}/>
{/*  */}
</div>
<div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
<textarea spellcheck="false" style={{height:"150px", width:"400px",marginLeft:"30%",marginRight:'18%'}}onChange={enableSave}/>
{!saveDisabled?(<button className='btn btn-success'  style={{marginTop:"4%",marginLeft:"96%"}}>Save</button>):
<button className="btn btn-success disabled"style={{marginTop:"4%",marginLeft:"96%"}} >Save</button>
}
</div>


</div>

<section style={{display:"flex",borderRadius:"6.5%"}}>
    <label style={{background: "#198754",borderRadius:"6.5%" ,height:'auto',width:"80px",textAlign:"center"}}>Add movie</label>
    <input type="text" 
    placeholder='Enter Name of the film...'
    value={searchTerm}
    onChange={handleInputChange}
    style={{width:"320px"}}/>
    
</section>

<div style={{marginLeft:"14%",marginRight:"34%",marginTop:"1%",maxHeight: '150px',
                overflowY: 'auto'}}> {movies.map((movie) => (
          <span key={movie.id} className="listAddSpan"onClick={()=>addComponent(movie)}>{`${movie.title}(${movie.release_date.slice(0,4)})`}</span>
        ))}</div>


    </form>
   
    
    </div>
    <div className="listgrid" style={{alignItems:"flex-start",width:"auto",marginLeft: "30%",marginTop:'3%',position:"sticky"}}>
    {components.map((component, index) => (
    <div key={index} className='listMovies' >
      {component}
      <button className="btn btn-danger" onClick={() => removeComponent(index)}>Dlt</button>
    </div>
  ))}
</div>
    </>)
}