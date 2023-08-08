const express = require("express")
const router=express.Router();
const User = require("../models/user");
router.post("/add",async(req,res)=>{
    try {
      if(!req.isAuthenticated){
        res.status({"status":"nologin"})
      }
      
      const userId = req.user._id;
      
      const {movieId} =req.body;
      
      const final= await  User.findByIdAndUpdate(userId, { $addToSet: { watchLater: movieId } })
      res.send({status:"ok"})
    } catch (e) {
      res.send({status:"error"})
    }
    
    })
  router.post("/check",async (req,res)=>{
    try {
      // res.send(req.user._id)
      if(!req.isAuthenticated()){
        return res.status(401).json({ error: "Unauthorized" });
      }
      const userId = req.user._id;
      const {movieId} =req.body;
      
      const user = await User.findOne({ _id:userId, watchLater: { $in: [movieId] } });
    if (user) {
        // Value exists in array
       res.send({status:"yes"})
    } else {
        // Value does not exist in array
        res.send({status:"no"})
    }
    } catch (error) {
      
    }
  })
  router.get("/getdata",async (req,res)=>{
    try {
      if(!req.isAuthenticated()){
        return res.status(401).json({ error: "Unauthorized" });
      }
      const userId = req.user._id;
      // console.log(userId)
      const temp=await User.findById(userId).select("watchLater")
      // console.log(temp.watchLater);
      res.send(temp)
    } catch (error) {
      
    }
  })
  router.delete("/:id",async (req,res)=>{
   const {id} =req.params;
   const userId = req.user._id;
   try {
    await User.updateOne({ _id: userId },{ $pull: { watchLater: id } })
    res.send({status:"ok"})
    
   } catch (error) {
    console.log(error.message);
   }
  
  })
  module.exports=router;