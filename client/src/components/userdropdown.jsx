import Dropdown from 'react-bootstrap/Dropdown';
import React  from 'react'
import { useNavigate} from 'react-router-dom';

export default function Userdropdown(props) {
    
    const {user,signout} = props
    const navigate = useNavigate();
    const logOut=async()=>{
        try {
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
            method: "GET",
            crossDomain: true,
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",   
              "Access-Control-Allow-Origin": "*",   
            },
          })
          signout()
          window.location.reload();
          navigate('/')
        } catch (error) {
          console.error(error);
        }  
    }
const goToWatchlater =()=>{
  let url =`/${user}/watchlater`
  navigate(url)
}
const goToDiary=()=>{
  let url =`/${user}/diary`
  navigate(url)
}
const goToProfile=()=>{
  let url=`/profile/${user}`
  navigate(url)
}
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {user}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        
        <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item>
        <Dropdown.Item onClick={goToWatchlater}>Watchlist</Dropdown.Item>
        <Dropdown.Item onClick={goToDiary}>Diary</Dropdown.Item>
        <Dropdown.Item onClick={logOut}>SignOut</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

