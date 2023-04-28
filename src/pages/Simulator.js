import React, { useState } from "react";
import Holdings from "../components/simulatorParts/Holdings"
import Charts from "../components/simulatorParts/Charts"; 
import BuyStockForm from "../components/buyStockParts/stock"
import * as helper from "../helper.js"
export const DataContext = React.createContext(); //send simulator data to charts
export const HoldingContext = React.createContext(); 

export default function Simulator() {
  
  //Set sim objects we need to begin simulation 
  const [simEnabled, setsimEnabled] = useState(true); 
  const [createSim, setcreateSim] = useState(true); 
  const [simDay, setsimDay] = useState(2); 
  const [acctval,setacctval] = useState(0); 
  const [percentChange,setpercentChange] = useState(0); 
  const [TodayChange,setTodayChange] = useState(0); 
  const [simCount, setSimCount] = useState(0); 

  //keep track of the current simulation object
  const [simulation, setSimulation] = useState([]);
  const [year, setYear] = useState('2020');
  const [month, setMonth] = useState('01');

  //Keep track of what the actions is by the user
  const [tradeData, settradeData] = useState({}); //{stock,quantity,action}

  //Keep track of what stocks are traded
  const [tradedStocks, settradedStocks] = useState([]); 

  //handle events 
  const handleDate = (e) =>{
    if (simDay >= 26){
      setsimEnabled(false); 
    }
    if (simEnabled){
      setsimDay(simDay+1);
    } 
  }

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
      setMonth(e.target.value);
  };

  //handle buying or selling stock 
  const handleTrade = async (data) =>{
    if (data.quantity <= 0 || data.stock === "" || data.action === "") {console.log("Not valid")}
    else{
      settradeData(data); 

      let tickerTraded = data.stock; 
      let tradeAction = data.action
      let quantity = data.quantity; 

      //TODO: Fetch data if it already exists in database. Else go to alpaca api (can refine into one api call but I'm too lazy)
      const check = await fetch("https://simutradeserver2.onrender.com/checkdata", {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ticker:tickerTraded, startYear:year,startMonth:month})
      })

      const isValid = await check.json(); 

      //if nothing then fetch. Else use data in isValid
      if (Array.isArray(isValid) && !isValid.length){ //TODO: Not working Fix this mistake 
        const newData = await fetch("https://simutradeserver2.onrender.com/getData", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ticker:tickerTraded, startYear:year,startMonth:month})
          })
          
          const check = await newData.json(); 
          console.log(check); 
          //check returns object like {body: {data:[{Timestamp,ClosePrice}], end, start,symbol}}
        
      //check to make sure we can buy or sell the stock 
        if (helper.checkValidBuy(tradedStocks, acctval,check.body.data[simDay].ClosePrice,data)){
          const found = data.find((trades) => trades.stock === tickerTraded);
        }
        else{
          setacctval(acctval - (quantity * check.body.data[simDay].ClosePrice)); 
          settradedStocks([...tradedStocks,data]);
        }
        //set acctval then make a record of it
      }
      // if we want to sell make sure user have stock purchased
      else if (helper.checkValidSell(tradedStocks,tickerTraded, quantity,tradeAction)){
        //TODO: Implement sell case (1. cannot sell if no stocks of that type exists)
        setacctval(acctval + (quantity * check.body.data[simDay].ClosePrice)); 
        settradedStocks([...tradedStocks,data]); 
      } 
      else{
        console.log("Invalid. Could be due to buying stock with too little money or other")
      }

      settradedStocks([...tradedStocks,check])

      }
    } 

  const handleSimulation = async (e) => {
    e.preventDefault(); 
    //obtain user 
    if (createSim){
      const startDate = year + "-" + month + "-01"; 
      const endDate = year + "-" + month + "-26";
      const sim = {
        tickerTraded: [],
        AcctVal: 100000,
        startTime: startDate,
        endTime: endDate, 
        TotalChange: TodayChange, 
      }
      setSimulation([sim]); 
      setcreateSim(false); 
      console.log("simulation created")
    }
 }

  const handleEnd = async (e) =>{
    e.preventDefault(); 
    console.log("Let's end the simulation "); 
    const startDate = year + "-" + month + "-01"; 
    let endDate = year + "-" + month + "-0" + simDay;
    if (simDay > 9){
      endDate = year + "-" + month + "-" + simDay;
    }
    
    setSimCount(simCount+1); 
    const finalSim = {
      tickersTraded: tradedStocks,
      acct: acctval, 
      start: startDate,
      end: endDate,
      Change: TodayChange
    }

    setSimulation([finalSim]); 

    //TODO: Reset everything, add an object to the mongoose database, saave the stocks the user traded and all the information associated with it
      // const result = await fetch("http://localhost:8000/api/savesim", {
      //       method: "POST", 
      //       headers: {
      //           'Content-Type': 'application/json'
      //       }, 
      //       body: JSON.stringify({startYear:year,startMonth:month,startUser:res.data.username})
      //   })
    // console.log(user); 
  }

  const handleReset = (e) => {
    e.preventDefault(); 
    setsimDay(2); 
    setpercentChange(0);
    setTodayChange(0);
    setacctval(0); 
    setsimEnabled(true); 
    setcreateSim(true); 
    setSimulation([]); 
    console.log("reset sim"); 
  }

  return (
    <div class = "outer">
      <div class = "overview"> 
        <div class = "inner"> 
        <h1> Start Simulation </h1>
        <div class = "row" id = "a4"> 
        <div>
            Simulation Year:
            <select value={year} onChange={handleYearChange}>
                <option value="">--Select Year--</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>
            Simulation Month:
            <select value={month} onChange={handleMonthChange}>
                <option value="">--Select Month--</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <form onSubmit={handleSimulation}>
            <button type="submit">Simulate</button>
            </form>
        </div>
          <div class = "game">
            <div id = "a3">
            Click this button to move the date forward: <button onClick={handleDate}>Add Date</button>
            </div>
            <form onSubmit={handleEnd}>
            Submit to save the current simulation: <button type="submit">Submit</button>
            </form>
            <form onSubmit={handleReset}>
            Reset Simulation: <button type="submit">Reset</button>
            </form>
          </div>
          </div>
        </div>
        <div class = "buy">
          <h2>BuyStock</h2>
          <BuyStockForm handleTrade={handleTrade}/>
        </div>
      </div>

      <div class = "overview" id = "1">
        <div class = "layout">
          <div class = "personal"> 
            <h1>Overview</h1>
            <div class = "row"> 
                <p>Today's Date: {month}/{simDay}/{year}</p>
                <p>Account value: {acctval}</p>
                <p>Percentage Change: {percentChange}% </p>  
                <p>Today's Change: {TodayChange}%</p>
                <p>Simulations Completed: {simCount}</p>
            </div>
          </div>
          <div class = "performance">
            <h1> Performance</h1>
            <div class = "row" id = "a1">
              <DataContext.Provider value ={simDay}> 
              {/* //TODO: CONNECT THIS WITH THE SIMULATOR OBJECT */}
                <Charts/>
            </DataContext.Provider>
            </div>
          </div>
        </div>

      <div class = "overview" id = "a2">
        <h1> Holdings </h1>
        <div class = "row"> 
            <HoldingContext.Provider value ={tradedStocks}> 
                  {/* //TODO: CONNECT THIS WITH THE SIMULATOR OBJECT */}
              <Holdings/>
            </HoldingContext.Provider>
        </div>
      </div>
      
    </div>
    
  </div>
  );
};
  