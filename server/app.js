const express = require('express')
const cors = require('cors')
const stockFiles = require( './stocks');
const mongoose = require('mongoose')
const db = require("./db.js"); 
const bodyParser = require( "body-parser")
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

// app.use(cors()); 
app.use(express.json());
// app.use(express.urlencoded({ extended: false})); 

const User = mongoose.model('User'); //each individual user 
const stockUser = mongoose.model("UserStock"); //stock info when the user purchased it 
const stockLibrary = mongoose.model('stockLibrary'); //retrieve and keeps track of all tickers searched using the Alpaca API 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {

  let proceed = true; 
  console.log(req.body); 

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
          AcctVal:100000, //start new user with 100,000 dollar
          stocksTraded:[],
        });
        User.collection.insertOne(newUser);
        res.send("User Created");
      }
    })
  }
  catch{(e) => console.log(e)}

  // User.findOne({ email: req.body.email }, async (err, doc) => {
  //   if (err) throw err;
  //   if (doc) res.send("User Already Exists");
  //   if (!doc) {
  //     const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //     const newUser = new User({
  //       username: "Temp", 
  //       email: req.body.email,
  //       password: hashedPassword,
  //       AcctVal:100000, //start new user with 100,000 dollar
  //       stocksTraded:[],
  //     });
  //     User.collection.insertOne(newUser);
  //     res.send("User Created");
  //   }
  // });
});


app.get("/user", (req, res) => {
  console.log(req); 
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.get('/test', (req,res) => {
    res.json({message: "Hello from server!"}); 
})

app.post('/getData', async (req,res) => {
    let body; 
    let ticker = req.body.ticker; 
    let startDate = req.body.startYear + "-" + req.body.startMonth + "-01"; 
    let endDate = req.body.startYear + "-" + req.body.startMonth + "-26";
    // startDate = "2022-01-01"; 
    // endDate = "2022-01-31";
    console.log(startDate);
    console.log(endDate); 

    try{
      body = await stockFiles.getStockData(ticker,startDate,endDate); //make sure to await for the data 
    }catch (err){
      console.log(err)
    }; 

    //add some more information to the body object which is returned
    body.forEach((time)=>{
      time["Symbol"] = ticker; 
    }); 

    const todayChange = 0; 
    const accountValue = 100000;
    const holdings = { // TODO: chagne the holding so user can adjust it 
          Symbol: "AAPL", 
          Description: "This is Apple Stock", 
          CurrentPrice: 120, 
          PurchasePrice: 150, 
          Quantity: 20,
          GainLoss: -600, 
          TradeAction: "Buy",
    }
    
    const info = {
      change: todayChange,
      val: accountValue,
      stock: holdings, 
      data: body, 
      currentTic: ticker, 
    }
    //send back the data
    console.log(info); 
    res.json({"body":info}); 
})

app.listen(process.env.PORT || 8000); 

// const authRequired = (req, res, next) => {
//   if(!req.session.user) {
//     req.session.redirectPath = req.path;
//     res.redirect('/login'); 
//   } else {
//     next();
//   }
// };

// app.use((req, res, next) => {
//   res.locals.user = req.session.user;
//   next();
// });


// app.get('/register', (req,res) => {
//   res.send('register'); 
// })

// app.post('/register', async(req,res) => {
//   const username = sanitize(req.body.username);
//   const password = sanitize(req.body.password);
//   const email = sanitize(req.body.email);
//   const salt = await bcrypt.genSalt(); 
//   const hash = await bcrypt.hash(password, salt); 

//   let proceed = true; 

//   try {
//     User.find({}).then(foundUser =>{ //check to see if user is already in database
//       foundUser.forEach(user =>{
//         if (username === user.username){
//           proceed = false; 
//           res.render('error', {message: `User ${username} already exists :(`}); 
//         }
//       });
//       if(proceed){ 
//         const newUser = new User({
//           username : username, 
//           password : hash, 
//           email : email, 
//           AcctVal: 100000,
//           stocksTraded: []
//         });
//         User.collection.insertOne(newUser); 
//         console.log("redirected"); 
//         const newPromise = startAuthenticatedSession(req,newUser);//make sure to return the promise object 
//         newPromise.then(() => res.redirect('/')).catch((err) => console.log(err)); 
//       }
//     });

    
//   } catch (err) {
//     if(err instanceof mongoose.Error.ValidationError) {
//       res.render('register', {message: err.message});
//     } else {
//       throw err;
//     }
//   }
// })

// app.post('/logout', async (req, res) => {
//   await endAuthenticatedSession(req);
//   res.redirect('/');
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// });


// app.post('/login', async (req, res) => {
//   const username = sanitize(req.body.username);
//   const password = sanitize(req.body.password);
//   let found; 
//   let proceed = false;
//   try {

//     User.find({}).then(foundUser => {
//         foundUser.forEach(user =>{
//           if (user.username === username && (bcrypt.compareSync(password,user.password)) ){ //if username is equal and password is equal to hashed password
//               proceed = true; 
//               found = user; 
//           }
//         });
//         if (proceed){
//           const newPromise = startAuthenticatedSession(req,found); //make sure to return the promise object 
//           newPromise.then(() => res.redirect('/')).catch((err) => console.log(err)); 
//         }
//         else{
//           res.render('error',{message: `Error: Username doesn't exist or Password is not correct :(`}); 
//         }
//     });
//   } catch (err) {
//     if(err instanceof mongoose.Error.ValidationError) {
//       res.render('login', {message: err.message});
//     } else {
//       throw err;
//     }
//   }
// });

