//TODO: NO LONGER IN USE. PORTED OVER TO SIMULATOR


import React, { useState, useEffect } from "react";


const Search = () => {
  const [data, setData] = useState({objdata: {},isDefined: false}); 
  const [stock, setStock] = useState(""); 
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//         const result = await fetch("http://localhost:8000/getData"); 
//         const jsonResult = result.json()
//         setData(jsonResult); 
//     }
    
//     fetchData(); 

//   }, []); 

    const handleStockChange = (e) => {
        setStock(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
      };
    
    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const result = await fetch("https://simutradeserver2.onrender.com/getData", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ticker:stock, startYear:year,startMonth:month})
        })
        
        const mydata = await result.json(); 
        data.objdata = mydata; 
        data.isDefined = true; 
        console.log(mydata); 
        console.log(data.objdata); 
     }

  return (
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
        <form onSubmit={handleSubmit}>
        <button type="submit">Simulate</button>
        </form>
    </div>
)};
  
export default Search;

{/* <table class = "page-table">
        <thread>
            <tr class = "table-head"> 
                <td> Symbol </td>
                <td> Timestamp</td>
                <td> OpenPrice </td>
                <td> ClosePrice </td>
                <td> Volume </td>
                <td> VWAP </td>
            </tr>
        </thread>
        {data.isDefined ?
         <thread>
            {(data.objdata.body.data).map((entries) => (
            <tr class = "table-body">
                <td>
                    {entries.Symbol}
                </td>
                <td>
                    {entries.Timestamp}
                </td>
                <td>
                    {entries.OpenPrice}
                </td>
                <td>
                    {entries.ClosePrice}
                </td>
                <td>
                    {entries.Volume}
                </td>
                <td>
                    {entries.VWAP}
                </td>
            </tr>
            ))}
        </thread> : null}
        </table>
    </div>
  ); */}