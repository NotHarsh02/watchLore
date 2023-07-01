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

module.exports=router;