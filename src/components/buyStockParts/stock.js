import React, { useState } from 'react'; 

const BuyStockForm = () => {
    const [stock, setStock] = useState('');
    const [action, setAction] = useState("buy");
    const [quantity, setQuantity] = useState(0);
    // const [year, setYear] = useState('');
    // const [month, setMonth] = useState('');
  
    const handleStockChange = (e) => {
      setStock(e.target.value);
    };
  
    const handleActionChange = (e) => {
      setAction(e.target.value);
    };
  
    const handleQuantityChange = (e) => {
      setQuantity(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Do something with the form data, such as submit to a server
      console.log({ stock, action, quantity });
    };
  
    return (
      <div>
        <h2>BuyStock</h2>
        <form onSubmit={handleSubmit}>
          <label className='ticker'>
            Stock: 
            <input type="text" value={stock} placeholder ="e.g. AAPL" onChange={handleStockChange} />
          </label>
          <label className='action'>
            Action: 
            <select value={action} onChange={handleActionChange}>
              <option value="">--Select Action--</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>
          <label className='quantity'>
            Quantity: 
            <input type="number" value={quantity} placeholder ="Number" onChange={handleQuantityChange} />
          </label>
          {/* <br />
          <label className='SimYear'>
            Simulation Year:
            <select value={year} onChange={handleYearChange}>
              <option value="">--Select Year--</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </label>
          <br />
          <label className='SimMonth'>
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
          </label> */}
          <button type="submit">Enter</button>
        </form>
        </div>
    );
  };
  
export default BuyStockForm;