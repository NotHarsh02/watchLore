const express = require("express")
const mongoose= require("mongoose")
const app = express()
const flash = require('connect-flash');
const passport=require("passport")
const LocalStrategy = require("passport-local")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const User = require("./models/user");
const watchlater = require("./routes/watchlater");
const diary = require("./routes/diary");
const favourites = require("./routes/favourites")
const likes=require("./routes/likes")
const members=require("./routes/members")
// const Watchlater = require('./models/watchlater');
const cors = require("cors");
app.use(flash())
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // replace with the domain of your React app
  credentials: true
}));




const mongoUrl=
   "mongodb+srv://Harsh:harsh2002@cluster0.essf6ex.mongodb.net/PlayAlong"

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://Harsh:harsh2002@cluster0.essf6ex.mongodb.net/PlayAlong',
      collection: 'sessions'
    }),
    cookie: { secure: true } ,
    cookie: {domain: 'localhost:3000'},
    cookie: {
      // cookie: {domain: 'localhost:3000'},
        httpOnly: true,
        // sameSite: "none",
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/watchlater",watchlater)
app.use("/diary",diary)
app.use("/favourites",favourites)
app.use("/likes",likes)
app.use("/members",members)

app.get('/checkLogin',(req,res)=>{
  res.json({ loggedIn: req.isAuthenticated() });
})
app.get("/getinfo",(req,res)=>{
  try {
    res.json(req.session.passport.user)
  } catch (error) {
    console.log(error.message)
  }
   
    // res.json(req.user)
   
})
app.post("/register",async (req,res)=>{
 try {
const {username,email,password} =req.body;
  const user =  new User({email,username});
  const registeredUser = await User.register(user,password);
  // console.log(registeredUser)
  // console.log(username);
  
  res.send({status:"ok"})
 } catch (e) {
    console.log(e.message)
    res.send({status:"error"})
 }
  

})

app.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).send();
      }
      if (!user && info) {
        return res.status(422).send(info);
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).send();
        }
        req.session.save(() => res.send({status:"ok"}));
       
      })
    })(req, res);
  });
  app.get("/logout",(req,res,next)=>{
    req.logout(
      function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      }
    );
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      }
      // res.json({status:"ok"})
      res.redirect('/checkLogin');
    });
    console.log(req.session)
    
  })


  


app.listen(5000,()=>console.log("Server started at port 5000"))

