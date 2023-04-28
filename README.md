# SimuTrade 

## Overview

In today's financial environment, it's not difficult to find ways to simulate a real-time trading environment. However, what if one wanted to relive financial events in the past? Want to experience what it's like to be trading in the financial crisis of 2008? What about the gamestop short-squeeze of 2021? This is where SimuTrade comes in.

SimuTrade is a web app that will allow users to play the stock market in a different time period. Users can register and once logged in, will be able to trade in a time-period of their choosing. They will also be able to view financial news articles in the past which will further place them in the shoes of everyone trading in that moment. In addition, Users will be supplied with technical analysis tools and can use them to adjust their trading strategy however they want in the simulated environment. The simulation will also allow users to choose the end-time and decide whether they want to trade in real-time or have 1x or 2x speed. The simulation, for now, will begin at 9:30am and end on 4:00pm, mirroring that of a real trading day. More features will be added which will allow the user to extend their trading to multiple days, letting the system randomly select a day in the past for them to trade in, etc. 


## Data Model

The application will store stock data, user data, news articles data. It will also keep track of time so a clock system needs to be implemented which keeps track of the time. Since my simulation will be in the past, we do not need to worry about accessibility of data. 

* stock data will include, but not limited to, ticker, historical price, volume, market cap, P/E, EPS, upcoming earnings, etc.
* news articles will include a list of relevant news article that is published on or before the trading time
* user data will include username, password, maybe email to send out notifications through 


An Example stock entry in stockdata 

```javascript
{
  ticker: "AAPL",//ticker name 
  timeframe: 1min, //timeframe of data
  historical_price: , //array of ticker, starting on 9:30am and ending at 4:00pm matching with the timeframe of the data. 
  volume: , //volume of ticker  
  ... //etc
}
```


## [Link to Commented First Draft Schema](db.mjs) 

## Wireframes

Here are some of the routes I'm planning to make: 

/simulation/login - page for login 

/simulation/portfolio - user portfolio 

/simulation/portfolio/news - news page so that user can see news in given time period 

/simulation/portfolio/learn - page for user to learn about stock trading 

/simulation/portfolio/trade - page for user to enter their order to trade stocks 

![list create](documentation/first.jpeg)

## Site map

![list create](documentation/second.jpeg)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can trade stocks 
4. as a user, I can view the trades I've made and the stock charts for the ticker I want to trade 
5. as a user, I can learn about the stock market and how to practice trading 
6. as a user, I can use technical analysis to figure out if I should trade the ticker 

## Research Topics

* (6 points) Use React 
    * use React.js as the frontend framework. Assigned 6 points based on the time required to learn it. Also planning on using rechart to potentially set up stock chart. Will update point value when I finalize what to use 
* (2 points) Use Alpaca API for stock data 
    * Might run into problem with data-fetching limit. Yahoo finance public API has a limit of 48,000 requests a day or 2000 requests per hour. If the user tries to overtax the simulator, it could cause the API to fail. Will update point value when I start implementing. 
* (2 points) Used ChartJS to display my data on the client side 


10 points out of the required 10 points. 

## [Link to Initial Main Project File](app.mjs) 

