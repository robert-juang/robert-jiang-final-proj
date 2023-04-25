import React, { useState } from "react";
import Search from "../components/simulatorParts/Search"
import Holdings from "../components/simulatorParts/Holdings"
import Charts from "../components/simulatorParts/Charts"; 

const Simulator = () => {

  //const [currentData, setcurrentData] = useState({}); 

  return (
    <div class = "outer">

      <div class = "overview" id = "1">
        <div class = "layout">
          <h1>Overview</h1>
          <div class = "row"> 
              <p>Account value: 10,000</p>
              <p>Percentage Change: 1% </p>  
              <p>Today's Change: +0.00%</p>
          </div>

      <div class = "overview">
        <h1> Holdings </h1>
        <div class = "row"> 
          <Holdings/>
        </div>
      </div>


    <div class = "overview">
        <h1> Search </h1>
        <div class = "row"> 
          <Search/>
        </div>
      </div>
    </div>

        <div class = "layout"> 
          <h1> Performance/Charts</h1>
          <div class = "row" id = "1">
              <Charts/>
          </div>
        </div>
    
        </div>
      </div>

  );
};
  
export default Simulator;