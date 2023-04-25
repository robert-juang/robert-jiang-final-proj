import express from 'express'
import './db.mjs';
import mongoose from 'mongoose';
import Alpaca from "@alpacahq/alpaca-trade-api";
import * as dotenv from 'dotenv'; 


async function getStockData(ticker,startDate,endDate){
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

function checkValid(ticker){
    // TODO: Fix the error here (OK NVM I'm just dumb use this as a cache to cache data maybe?)

    // const response = fetch('./nyse-listed_json.json');
    // const data = response.json();

    fetch("./nyse-listed_json.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const upperTicker = ticker.toUpperCase();
        
        // Check if ticker exists in JSON file
        for (let i = 0; i < data.length; i++) {
            if (data[i]['ACT Symbol'] === upperTicker) {
            return true;
            }
        }
        // Ticker not found in JSON file
        return false;
     }
    );
    // Convert ticker to uppercase
}

export{
    getStockData, 
    checkValid
}; 