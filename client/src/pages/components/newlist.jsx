import React, { Component ,useState,useEffect} from 'react';
import Nav from "../../UI/navbar"
import Moviebox from '../../components/movieBox';
import "./modal.css"
export default function Newlist(){
  const [name,setName] =useState("");
  const [tag,setTag] =useState("")
  const [description,setDescription]=useState("")
  const [searchTerm, setSearchTerm] = useState('');
  const [components, setComponents] = useState([]);

  const [movies, setMovies] = useState([]);
    function handleSubmit(e){
       e.preventDefault();
       console.log(name)
    }
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };
      const addComponent = (movie) => {
        // Create a new component instance and add it to the components array
        const newComponent = <Moviebox title={movie.title} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id={movie.id}/>;
        setComponents([...components, newComponent]);
        setSearchTerm('')
      };
      
      const removeComponent = (index) => {
        const updatedComponents = [...components];
        updatedComponents.splice(index, 1);
        setComponents(updatedComponents);
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
      useEffect(() => {
        
        fetchData();
      }, [searchTerm]);
    return(
        <>
        <Nav></Nav>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <h3 style={{marginRight:'34%',marginBottom:"2%"}}>New list</h3>

    
    <form onSubmit={handleSubmit} autoComplete="false" >
    <div style={{display:"flex"}}>
        <div>
    
    <input type="name" 
     className="form-control"
     placeholder="Name"
     onChange={(e) => setName(e.target.value)}
     style={{marginBottom:"10%",marginTop:"2%"}}/>


    <input type="name" 
     className="form-control"
     placeholder="Tags(eg.Top50)"
     onChange={(e) => setTag(e.target.value)}/>
{/*  */}
</div>
<div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
<textarea style={{height:"150px", width:"400px",marginLeft:"30%",marginRight:'18%'}}onChange={(e) => setDescription(e.target.value)}/>
<button className='btn btn-success' style={{marginTop:"4%",marginLeft:"96%"}}>Save</button>
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
    <div key={index} className='listMovies'>
      {component}
      <button className="btn btn-danger" onClick={() => removeComponent(index)}>Dlt</button>
    </div>
  ))}
</div>
    </>)
}