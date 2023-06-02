const express = require("express")
const router=express.Router();
const Diary = require("../models/diary");


router.post("/add",async(req,res)=>{
    try {
        if(!req.isAuthenticated){
            res.status({"status":"nologin"})
          }
          const userId = req.user._id;    
          const {movieId,date} =req.body;
          const search = await Diary.findOne({ date: date ,user:userId});
          console.log(search)
          if(search){
            const result =await Diary.findByIdAndUpdate(search._id,{ $addToSet: { movies: movieId } });
            
            
          }
         else{
            const newDiary = new Diary({
                date: date,
                movies: [movieId],
                user: userId
              });try {
                const res=await newDiary.save()
             
                
              } catch (error) {
                console.error('Error saving diary instance:', error);
              }
             
         }
        
         res.send({status:"ok"})
    } catch (error) {
        res.send({status:"error"})
    }
  
   

})
router.post("/check",async(req,res)=>{
    if(!req.isAuthenticated){
        res.status({"status":"nologin"})
      }
    try {
        const userId = req.user._id;    
        const {movieId} =req.body;
        const search = await Diary.findOne({ user:userId,movies:{ $in: [movieId] }} );
        if(search){
            res.send(search)
        }
        res.send({status:"no"})
        
    } catch (error) {
        
    }


})

router.get("/all",async(req,res)=>{
    if(!req.isAuthenticated){
        res.status({"status":"nologin"})
      }
    try {
        const userId = req.user._id;    
        
        const array= await Diary.find({ user:userId} );
        if(array){
            res.send(array)
        }
        res.send({status:"no"})
        
    } catch (error) {
        
    }

})
module.exports=router;