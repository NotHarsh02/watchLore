import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./modal.css"
import Register from "../components/register";
import React, { useState,useEffect } from "react";
import Signin from "../components/signin"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { fetchItems } from '../store/search-results';
import {Route, useNavigate} from 'react-router-dom';
import Loading from "./loading"
import Dropdown from "../components/userdropdown";
import { userAction } from "../store/signin";
function Navplay(props) {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [signUp, setsignUp] = useState(false);
  const [signIn, setsignIn] = useState(false);
  const [loading,setLoading] =useState(true)
 
  
  const[query,setQuery] = useState("")
  const[data,setData] =useState("");
  const{nosearch} =props;
  const toggleSignUp = () => {
    setsignUp(!signUp);
    
  };
  const toggleSignIn =()=>{
     setsignIn(!signIn)
  }
  const existing=()=>{
    toggleSignUp()
    toggleSignIn()
  }
  const relay=()=>{
    toggleSignIn()
    toggleSignUp()
  }
  const signout =()=>{
   
   isLogIn()
   
  }
 const querySearch =async(e)=>{
  e.preventDefault();
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`);
  const mid=await res.json()
  const temp=mid.results
  dispatch(fetchItems(temp));
  console.log(temp[0].overview)
  let link =`/search`;
  navigate(link)
 }
 const isLogIn = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/checkLogin?${Date.now()}`, {
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
    if (data.loggedIn) {
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
  } catch (error) {
    console.error(error);
  } finally{
   setLoading(false)
  }
}

const userInfo =async()=>{
  const response =await fetch(`${process.env.REACT_APP_BACKEND_URL}/getinfo`, {
  method: "GET",
  credentials: "include",
  headers: {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*"
}
  })
  const temp = await response.json();
  if (temp==="no") {
   console.log("cannot get info of user");
  }
  else{
  
  
  setData(temp);
  }
  
}
 useEffect(()=>{
 isLogIn()
 userInfo()
 

},[])
  if(loading){
    return(<Loading/>)
  }
 

  return (
    <>
    {isLoggedIn && (
      <Navbar bg="" variant="dark">
      
      <Container >
        <Navbar.Brand href="/">WatchLore.TM</Navbar.Brand>
        <Nav className="me-auto">
          
          <Nav.Link href="/lists">Lists</Nav.Link>
          <Nav.Link href="/members">Members</Nav.Link>
          {/* <Nav.Link  id="userNav"><Dropdown user={data} signout={signout}></Dropdown></Nav.Link> */}
        </Nav>
        <div className='d-flex mt-2 '>
        <Dropdown user={data} signout={signout}></Dropdown>
        {(!nosearch)&&(
             <Form className="d-flex " onSubmit={querySearch}>
             <Form.Control
               type="search"
               placeholder="Search"
               className="ml-4"
               aria-label="Search"
               onChange={(e) => setQuery(e.target.value)}
             />
             <Button variant="outline-success" onClick={querySearch} >Search</Button>
           </Form>
          )}
          </div>
    </Container>
  </Navbar>
    )}
    {!isLoggedIn&&(
      <Navbar bg="" variant="dark">
        <Container>
          <Navbar.Brand href="/">WatchAlong.TM</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={toggleSignIn}>Sign In</Nav.Link>
            <Nav.Link href="/lists">Lists</Nav.Link>
          <Nav.Link href="/members">Members</Nav.Link>
            
          </Nav>
          {(!nosearch)&&(
             <Form className="d-flex " onSubmit={querySearch}>
             <Form.Control
               type="search"
               placeholder="Search"
               className="ml-4"
               aria-label="Search"
               onChange={(e) => setQuery(e.target.value)}
             />
             <Button variant="outline-success" onClick={querySearch} >Search</Button>
           </Form>
          )}
         
        </Container>
      </Navbar>
    )
}

      {signUp && (
        <div >
        <div onClick={toggleSignUp} className="overlay"></div>
        <div className="modal-content">
         <Register existing={existing} signuptoggle={toggleSignUp}></Register>
          <button className="close-modal btn-close " onClick={toggleSignUp} >
            
          </button>
        </div>
      </div>
      )}
      
      {(signIn )&&(
        <div >
        <div onClick={toggleSignIn} className="overlay"></div>
        <div className="modal-content">
         <Signin relay={relay} success={toggleSignIn} isLoggedIn={signout} ></Signin>
          <button className="close-modal btn-close" onClick={toggleSignIn} > </button>
        </div>
      </div>
      )}

    </>
  );
  
}

export default Navplay;