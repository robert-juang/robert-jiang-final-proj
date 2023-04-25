
import React from "react";
  
const Holdings = () => {
  return (
        <div>
        <table class = "page-table">
            <thread>
                <tr class = "table-head"> 
                    <td> Symbol </td>
                    <td> Description </td>
                    <td> Current Price </td>
                    <td> Purchase Price </td>
                    <td> Quantity </td>
                    <td> Gain/Loss </td>
                    <td> Trade Action </td>
                </tr>
            </thread>
            <tbody>
                {/* {{#each info}}
                    <tr class="table-body">
                        <td>{{Symbol}}</td>
                        <td>{{Description}}</td>
                        <td>{{CurrentPrice}}</td>
                        <td>{{PurchasePrice}}</td>
                        <td>{{Quantity}}</td>
                        <td>{{GainLoss}}</td>
                        <td>{{TradeAction}}</td>
                    </tr>
                {{/each}} */}
        </tbody>
    </table>
    </div>
  );

};
  
export default Holdings;