import React ,{useEffect,useState} from 'react'
import Nav from '../UI/navbar'
export default function Member(){
  const [userData,setUserData]=useState([])
   const arrayOperations=(array)=>{
    const final=array.sort((a,b)=>{
      return b.watchLater.length-a.watchLater.length
    })
    return final;
   }
    const getInfo = async () => {
        try {
          const response = await fetch(`http://localhost:5000/members/all`, {
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
         
          setUserData(arrayOperations(data))
          console.log(data)
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(()=>{
        getInfo()
      },[])
    return(<>
        <Nav></Nav>
        <div id="rendered">
       
        {userData.map((user) => <div><h1 key={user.id}>{ user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1> <span>{`${user.likes.length+ user.watchLater.length} films`}</span></div>)}

        </div>
       
        </>
    )
}