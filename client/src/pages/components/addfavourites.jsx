import React,{useState} from 'react'
import "./modal.css"

import AutocompleteSearch from '../../UI/autocompletesearch'


export default function Addfavourites(props){

const {divNumber,donestatus} = props
const [click,isClicked] =useState(false)

const toggleClick =()=>{
    isClicked(!click)
}

const addMovie =()=>{
    console.log(`you clicked on ${divNumber}`)
    isClicked(true)

}
const deleteImage=()=>{
    let query = `#${divNumber} .favmovie img `
    let addbuttonquery=`#${divNumber}`
    const divElement = document.querySelector(addbuttonquery);
    const imgx=document.querySelector(query)
    
    const button = document.createElement('button');
    button.className = 'btn btn-outline-dark';
    button.innerText = 'Add';
    button.style.marginLeft = '17%';
    button.style.marginTop = '45%';
    button.type = 'submit';

    button.addEventListener('click', addMovie);
    divElement.insertBefore(button, divElement.firstChild);
    // console.log(imgx.id)
    
    imgx.remove();
   
   
    

}
    return(<>
        <div id={divNumber}>
        {!donestatus?(<button className="btn btn-outline-dark" onClick={addMovie} style={{marginLeft:"17%",marginTop:"45%"}} type="submit">Add</button>):
        (<button className="btn "  style={{display:"none"}} type="submit">Add</button>)}
        <div className='favmovie'>
        {!donestatus&&(<button className='custombutton btn btn-danger' onClick={deleteImage} >Dlt</button>)}
        </div>
        
        </div>
        {click&&(
           <div >
           <div onClick={toggleClick} className="overlay"></div>
           <div className="modal-content">
            {`Add a movie now!`}
            <AutocompleteSearch divNumber={divNumber} isClicked={isClicked} ></AutocompleteSearch>
             <button className="close-modal btn-close" onClick={toggleClick} > </button>
           </div>
         </div>
        )}
        </>
    )
}