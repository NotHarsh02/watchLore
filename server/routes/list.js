const express = require("express")
const router=express.Router();
const List =require("../models/list")
router.post("/add",async(req,res)=>{
    try {
        if(!req.isAuthenticated){
            res.status({"status":"nologin"})
          }
          const userId = req.user._id;    
          const {movies,name,tags,description} =req.body;
         
            const newList = new List({
                name: name,
                movies: movies,
                tags:tags,
                description:description,
                user: userId
              });try {
                await newList.save()
             
                
              } catch (error) {
                console.error('Error saving List instance:', error);
              }
             
         
        
         res.send({status:"ok"})
    } catch (error) {
        res.send({status:"error"})
    }
  
   

})

router.put("/:name", (req,res)=>{
  try {
    const {name}=req.params;
  console.log("sent put")
  console.log(name)
  res.send("done")
  } catch (error) {
    
  }
  
})



router.get("/getLists",async(req,res)=>{
  try {
    const listObject = await List.find().populate('user', 'username');
    // const idArray=listObject.map((list)=>list.movies);
    if(listObject){
      res.send(listObject);
    }
    else{
      res.send("no");
    }
    
    
    // 
  } catch (error) {
    
  }
  
})
router.post("/getList",async(req,res)=>{
  try {
    const {listname}=req.body;
    const listfound= await List.find({name:listname});
    res.send(listfound);
  } catch (error) {
    
  }
})

router.delete("/:name",async (req,res)=>{
  const {name} =req.params;
  
  try {
   let bla=await List.findOneAndDelete({name:name})
   
   console.log(bla)
   
   res.send({status:"ok"})
   
  } catch (error) {
   console.log(error.message);
  }
 
 })

module.exports=router;