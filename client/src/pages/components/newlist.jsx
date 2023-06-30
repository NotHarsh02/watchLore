import React, { Component ,useState} from 'react';
export default function Newlist(){
  const [name,setName] =useState("");
  const [tag,setTag] =useState("")
  const [description,setDescription]=useState("")
    function handleSubmit(e){
       e.preventDefault();
       console.log(name)
    }
    return( <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"5%"}}>
    <h3 style={{marginRight:'34%',marginBottom:"2%"}}>New list</h3>

    
    <form onSubmit={handleSubmit} autoComplete="false">
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
<textarea style={{height:"150px", width:"400px",marginLeft:"10%"}}onChange={(e) => setDescription(e.target.value)}/>
<button className='btn btn-success' style={{marginTop:"4%",marginLeft:"96%"}}>Save</button>
</div>


</div>

<section style={{display:"flex",borderRadius:"6.5%"}}>
    <label style={{background: "#198754",borderRadius:"6.5%" ,height:'auto',width:"80px",textAlign:"center"}}>Add movie</label>
    <input type="text" 
    placeholder='Enter Name of the film...'/>
</section>
    </form>
    

    </div>)
}