const express = require("express")
const router=express.Router();
const User = require("../models/user");
router.post("/add",async (req,res)=>{
    try {
        if(!req.isAuthenticated){
            res.status({"status":"nologin"})
          }
          const userId = req.user._id; 
      
          const {favs} =req.body;
          
          
          const final= await  User.findByIdAndUpdate(userId, { $addToSet: { favourites: favs } })
          res.send({status:"ok"})
        
    } catch (error) {
        
    }
})


router.get("/getdata",async (req,res)=>{
    try {
      if(!req.isAuthenticated()){
        return res.status(401).json({ error: "Unauthorized" });
      }
      const userId = req.user._id;
      const temp=await User.findById(userId).select("favourites")
      res.send(temp)
    } catch (error) {
      console.log(error.message)
    }
  })


module.exports=router;