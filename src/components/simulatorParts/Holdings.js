
import React, { useState, useEffect } from "react";
import { DataContext } from "../../pages/Simulator"

const Holdings = () => {

  const [tradedStock, settradedStock] = useState({}); 
  const data = React.useContext(DataContext); 

  useEffect(()=>{
    settradedStock(data); 
  },[tradedStock,settradedStock]); 


  return (
        <div>
        <table class = "page-table">
            <thead> 
                <tr class = "table-head"> 
                    <td id = "td1"> Symbol </td>
                    <td id = "td1"> Current Price </td>
                    <td id = "td1"> Purchase Price </td>
                    <td id = "td1"> Quantity </td>
                    <td id = "td1"> Gain/Loss </td>
                    <td id = "td1"> Trade Action </td>
                </tr>
            </thead>
            <tbody>
                {/* {data.forEach((element, index) => {
                    return (
                    <tr key={index}>
                        <td>{element.stock}</td>
                        <td>{element.action}</td>
                        <td>{element.quantity}</td>
                    </tr>
                    );
                })} */}
            </tbody>
        </table>
    </div>
  );

};
  
export default Holdings;