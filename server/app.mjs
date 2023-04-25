import express from 'express'
import cors from 'cors'
import { getStockData, checkValid } from './stocks.mjs';
import mongoose from 'mongoose';
import './db.mjs';
import bodyParser from "body-parser" 

const app = express(); 

app.use(cors()); 
app.use(express.json());

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
      body = await getStockData(ticker,startDate,endDate); //make sure to await for the data 
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






                {/* {entries.Timestamp}
                {entries.OpenPrice}
                {entries.ClosePrice}
                {entries.Volume}
                {entries.VWAP}
            </ul> */}