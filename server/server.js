const stockFiles = require('./stocks.js');
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const db = require("./db.js"); 
const bodyParser = require("body-parser")
const bcrypt = require( 'bcryptjs')
const sanitize = require( 'mongo-sanitize')
const session = require( 'express-session')
const path = require( 'path')
const url = require( 'url')
const passport = require( "passport")
const passportLocal = require("passport-local").Strategy;
const cookieParser = require( "cookie-parser")
const localStrategy = require( "passport-local");
const app = express(); 

const corsOptions ={
  origin:'https://robert-jiang-final-proj-dstyn88xb-robert-juang.vercel.app/', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const sessionOptions = {
  secret: "secretcode",
  resave: true,
  saveUninitialized: true,
}

const User = mongoose.model('User'); //each individual user 
const stockUser = mongoose.model("UserStock"); //stock info when the user purchased it 
const stockLibrary = mongoose.model('stockLibrary'); //retrieve and keeps track of all tickers searched using the Alpaca API 
const simulation = mongoose.model("simulation"); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false})); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig.js")(passport);

// Routes
app.post("/login", async (req, res, next) => {
  await passport.authenticate("local", async (err, user, info) => {
    if (err){throw err};
    if (user){ 
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.user);
        console.log(req.user);
      });
    }
    else {
      // res.status(200).json({ message: 'User Not Found'})
      // res.end('ok');
    } //TODO: Fix Cannot set Header issue 
  })(req, res, next);

});

app.post("/register", (req, res) => {

  let proceed = true; 
  // console.log(req.body); 
  const date = new Date().toUTCString().slice(5, 16);

  try{
      User.find({}).then( async foundUser =>{ //check to see if user is already in database
        foundUser.forEach(async user=>{
          if (req.body.username === user.username){
            proceed = false; 
          }
        })
        const saltRounds = 10; 
      if (proceed){
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          stocksTraded:[],
          simulationsCompleted: 0,
          dateCreated: date, 
        });
        User.collection.insertOne(newUser);
        res.send("User Created");
      }
    })
  }catch{(e) => console.log(e)}
});


app.get("/user", (req, res) => {
  console.log("This is req.user"); 

  User.find({username:req.user.username}).then((foundUser)=>{
    const user = foundUser[0]; 
    res.setHeader('Content-Type', 'application/json');
    console.log(user); 
    res.json(user); //send back user
  })

});

app.get('/', (req,res) => {
    res.json({message: "Hello from server!"}); 
})

app.post('/getData', async (req,res) => {
    let body; 
    const ticker = req.body.ticker; 
    const startDate = req.body.startYear + "-" + req.body.startMonth + "-01"; 
    const endDate = req.body.startYear + "-" + req.body.startMonth + "-26";

    try{
      body = await stockFiles(ticker,startDate,endDate); //make sure to await for the data 
    }catch (err){
      console.log(err)
    }; 

    const info = {
      symbol: ticker, 
      start: req.body.startYear, 
      end: req.body.startMonth,
      data: body, 
    } 
    //TODO: insert into database once the above is done

    console.log("Post /getData"); 
    res.json({"body":info}); 
})

app.post("/checkdata", (req, res) => {
  stockLibrary.find({symbol:req.body.ticker, year:req.body.startYear, month: req.body.startMonth}).then((stockObj)=>{
    console.log(stockObj); 
    const user = stockObj; 
    res.setHeader('Content-Type', 'application/json');
    console.log("Post /checkdata");
    res.json(user); //send back user
  })

});



app.post("/api/savesim", async (req,res)=>{
  //create new simulation object
  try{
    await User.find({}).then((arr) =>{ //check to see if user is already in database
      arr.forEach( async (user) =>{
        if (req.body.username === user.username){
          console.log(user.simulations); 
          user.simulations.push(sim); 
          await user.save(); 
          console.log("Sim obj created"); 
        }
      })})}catch{(e) => console.log(e)}
    res.json({"body":sim})
})

app.listen(process.env.PORT || 8000); 