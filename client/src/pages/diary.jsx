import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Nav from "../UI/navbar"
import Diarybox from './components/diarybox';
import Loading from "../UI/loading"
import "./styles.css"
export default function Diary(props){
    const { user} = useParams();
    const{profile} =props
    const [diarydata,setData] = useState()
    const [loading,setLoading] =useState(true);
    const getContents =async()=>{
        try {
            const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/diary/all`,{
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
       
      setData(data)
      setLoading(false)
    //  console.log(data);
  
      
   
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(()=>{
        getContents()
        console.log(diarydata)
    },[])
    if(loading){
       return(<Loading></Loading>)
        
    }else{
    return(<>
    {!profile&&(<Nav/>)}
        {diarydata.map(data=><div  style={{marginLeft:"10%"}}>
            <span style={{marginTop:"4%", marginBottom:"0.5%"}}>{data.date}</span>
            <div className='imageboxdiary'>
           {data.movies.map(id=><Diarybox id={id}></Diarybox>)}
           </div>
        



        </div>
        
        )}
        </>
    )
        }
}