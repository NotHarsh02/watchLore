import React,{useEffect,useState} from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home"
import Loginpage from "./pages/loginPage"
// import Profile from './pages/profile';
import MovieDetails from "./components/moviedetails"
import {createBrowserRouter,RouterProvider,Route} from 'react-router-dom'
import Wrong from "./pages/wrong"
import Results from "./pages/searchResults"
import Watchlist from './pages/watchlist';
import Diary from './pages/diary';
import Profile from './pages/profile';
import Member from './pages/members';
const router =createBrowserRouter([
  {path:'/films/:movieId',element:<MovieDetails/>},
  {path:'/profile/:user',element:<Profile/>},
  {path:'/welcome',element:<Loginpage/>},
  {path:'/search',element:<Results/>},
  {path:'/:user/watchlater',element:<Watchlist/>},
  {path:'/:user/diary',element:<Diary/>},
  {path:'/members',element:<Member/>},
  {path:'*',element:<Wrong/>},
  {path:"/",element:<Home/>}


 

])
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App