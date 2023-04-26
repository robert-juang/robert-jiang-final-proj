const mongoose = require('mongoose'); 

// import slug from 'mongoose-slug-updater';


//our site will require authentication 
//users will have username and password 
// const User = new mongoose.Schema({
//     // [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }], 
//     username: String, 
//     password: String //will apply hashing to make sure everything is secure 
// }); 


// //we will use this to store all of our stock data 
// const stockDatabase = new mongoose.Schema({
//     ticker: "AAPL",//ticker name 
//     timeframe: '1min', //timeframe of data (will be chosen by the user and can be: 1min, 5min, 1hr)
//     historical_price: , //array of ticker, starting on 9:30am and ending at 4:00pm matching with the timeframe of the data. 
//     volume: , //volume of ticker  
// })

//------------------------------------------------------------------------------------

try {
    mongoose.connect('mongodb://localhost/stockData', {useNewUrlParser: true});
    console.log('Successfully connected to database.');
  } catch (err) {
    console.log('ERROR: ', err);
  }
  
  // mongoose.plugin(slug);
  
  
//   const ArticleSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     url: {type: String},
//     description: {type: String, required: false},
//     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//     slug: {type: String, slug: 'title', unique: true}
//   }, {timestamps: true});

const UserStockSchema = new mongoose.Schema({
  Symbol: {type:String, required:true},
  Description: {type:String},
  PurchasePrice: {type:Number,required:true}, 
  QTY: {type:Number,required:true}, 
  TotalValue:{type:Number, required:true},
  TotalGainLoss:{type: Number,required:true},
  TradeActions:{type:Number,required:true}
})


  const stockLibrarySchema = new mongoose.Schema({
    ticker: {type:String, required: true},//ticker name 
    tickerData: {
      timeframe: {type:String, required: true},
      openPrice: {type:String,required:true}, 
      closePrice: {type:String,required:true},
      volume: {type:String,required:true}, //volume of ticker  
      vwap: {type:String,required:true},
    }, 
  })

  mongoose.model("UserStock", UserStockSchema); 
  mongoose.model('stockLibrary',stockLibrarySchema); 

  const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minLength: 3, maxLength: 20},
    password: {type: String, required: true, minLength: 8},
    AcctVal: {type: Number, required: true,},
    stocksTraded: [UserStockSchema],
  });
  
  mongoose.model('User', UserSchema);