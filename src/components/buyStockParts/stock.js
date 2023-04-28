import React, { useState } from 'react'; 
import { DataContext, Simulator } from "../../pages/Simulator";

const BuyStockForm = (props) => {
    const [stock, setStock] = useState('');
    const [action, setAction] = useState("buy");
    const [quantity, setQuantity] = useState(0);

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
      console.log({stock, action, quantity});
      props.handleTrade({stock,action,quantity})
    };
  
    return (
      <div>
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
          <button type="submit">Enter</button>
        </form>
        </div>
    );
  };
  
export default BuyStockForm;