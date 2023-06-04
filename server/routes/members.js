const express = require("express")
const router=express.Router();
const User = require("../models/user");

router.get("/all",async (req,res)=>{
    try {
        // const userId = req.user._id;
        const temp=await User.find()
        res.send(temp)
      } catch (error) {
        console.log(error.message)
      }
    
})

















module.exports=router;