import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./modal.css"
import { arrayActions } from '../store/favouritesarray';
import {useDispatch} from 'react-redux'

const AutocompleteSearch = (props) => {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const{divNumber,isClicked} = props
 
  const gotomoviepage =(id)=>{
    let link =`/films/${id}`
         navigate(link)
  }
  const addImage =(movie)=>{
    let url=`https://image.tmdb.org/t/p/original/${movie.poster_path}`
    const image = new Image();
    // image.classList.add('favmovie');
    image.id=movie.id
    image.src = url;
    image.alt = movie.title;
    image.addEventListener('click', ()=>gotomoviepage(movie.id) );
    
    dispatch(arrayActions.addtofavourites(movie.id))
    let divp=`#${divNumber}`
    let number=`#${divNumber} div`
    
    const Parentdiv=document.querySelector(divp);
    const divElement = document.querySelector(number);
 
    
   
      // divElement.appendChild(image);
      // divElement.removeChild(divElement.firstChild)
      Parentdiv.removeChild(Parentdiv.firstChild)
      divElement.insertBefore(image, divElement.firstChild);
     
    //  dispatch(arrayActions.addtofavourites(moviestobeadded))
    
    
    isClicked()
    
}
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: `${process.env.REACT_APP_API_KEY}`,
              query: searchTerm,
            },
          }
        );
        setMovies(response.data.results);
      } else {
        setMovies([]);
      }
    };
    
    fetchData();
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleInputChange}
        
      />
      <div  style={{backgroundColor:"white",
                maxHeight: '100px',
                overflowY: 'auto',}}>
        {movies.map((movie) => (
          <span className="favouritemovie" onClick={() => addImage(movie)} style={{color:"black" ,cursor: "default"}} key={movie.id}>{movie.title}</span>
        ))}
      </div>
    </div>
  );
};

export default AutocompleteSearch;
