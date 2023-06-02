import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import Nav from "../UI/navbar"
import Watchlist from './watchlist';
import Likes from "./likes"
import Diary from './diary';
import ProfileTemp from './components/profiletemplate';
import "./styles.css"
export default function Profile(props){
    let { user } = useParams();
    const [watchlist,setWatchlist] =useState(false);
    const [catStylea,setcatStylea] =useState("")
    const [catStyleb,setcatStyleb] =useState("")
    const [catStylec,setcatStylec] =useState("selected")
    const [catStyled,setcatStyled] =useState("")
    const [diary,setDiary] =useState(false);
    const [profile,setProfile] =useState(true)
    const [likes,setLikes]=useState(false)
    const renderWatchlist=()=>{
        setDiary(false);
        setProfile(false)
        setLikes(false)
        setWatchlist(true);
        setcatStyleb("");
        setcatStylec("")
        setcatStyled("")
        setcatStylea("selected")
    }
    const renderDiary=()=>{
        setWatchlist(false);
        setProfile(false)
        setLikes(false)
        setDiary(true);
        setcatStylea("");
        setcatStylec("")
        setcatStyled("")
        setcatStyleb("selected");
    }
    const renderProfile =()=>{
        setWatchlist(false);
        setDiary(false);
        setLikes(false)
        setProfile(true)
        setcatStylea("");
        setcatStyleb("");
        setcatStylec("selected")
        setcatStyled("")
    }
    const renderLikes=()=>{
        setWatchlist(false);
        setDiary(false);
        setProfile(false)
        setLikes(true)
        
        setcatStylea("");
        setcatStyleb("");
        setcatStylec("")
        setcatStyled("selected")
    }
   return(
    <>
    <Nav></Nav>
    {/* <AutocompleteSearch></AutocompleteSearch>    */}

    
    {/* <div style={{border:"0.1px solid white",height:"7%", marginLeft:"10%",marginRight:"10%"}}> */}
    <div className='d-flex categories' style={{marginLeft:"10%", marginRight:"10%"}}>
    <span className={catStylec} onClick={renderProfile} >Profile</span>
    <span className={catStyled} onClick={renderLikes}>Likes</span>
    <span className={catStylea} onClick={renderWatchlist} >Watchlist</span>
    <span className={catStyleb} onClick={renderDiary}>Diary</span>
    
    
    </div>
    {/* </div> */}
    {watchlist&&(
        <Watchlist profile={true} passtolaterbox={renderWatchlist}></Watchlist>
    )}
    {likes&&(
        <Likes profile={true} passtolaterbox={renderLikes}></Likes>
    )}
    {diary&&(
        <Diary profile={true} passtolaterbox={renderDiary}></Diary>
    )}
    {profile&&(
        <><ProfileTemp passtolaterbox={renderProfile}></ProfileTemp></>
    )}
   
   
    </>
   )
}