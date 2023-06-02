module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.status({"status":"nologin"})
    }
    next();
}