import { useSelector } from 'react-redux';
import Nav from "../UI/navbar"
import "./styles.css"
import Searchbox from './components/searchBox';
export default function DisplayItemsComponent() {
  const movies = useSelector(state => state.items.items);

  return (<>
    <Nav />
    <h5 className='customh5'>Found {movies.length} matches</h5>
    
    
      {movies.map(movie => (
        <Searchbox id={movie.id} title ={movie.title} overview={movie.overview} date={movie.release_date.substring(0, movie.release_date.indexOf("-"))} img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></Searchbox>
      ))}
    
    </>
  );
}
