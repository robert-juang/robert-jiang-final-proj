// import mongoose from ')mongoose';
//TODO: Turn this into class 
const Alpaca = require("@alpacahq/alpaca-trade-api");
const dotenv = require('dotenv'); 


module.exports = async function getStockData(ticker,startDate,endDate){

    dotenv.config(); 

    const API_KEY = process.env.ALPACA_KEY;
    const API_SECRET = process.env.ALPACA_SECRET;

    const alpaca = new Alpaca({
        keyId: API_KEY,
        secretKey: API_SECRET,
        paper: true,
    });

    const bars = alpaca.getBarsV2(ticker, {
        start: startDate,
        end: endDate,
        timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.DAY),
        limit: 25,
      });
      

    const got = [];
    for await (let b of bars) { //removed await keyword 
        got.push(b);
    }
    
    return got; 
}
