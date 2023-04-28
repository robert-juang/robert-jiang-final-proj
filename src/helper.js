

function checkValidBuy(AccountValue, buyStockPrice, orderData){
    if (orderData.action === "Buy" && (orderData.quantity * buyStockPrice)<= AccountValue){
        return true;
    }
    return false; 
}

function checkValidSell(stocksTraded, checkthisName, checkthisQuantity,checkthisAction){
    if (checkthisAction === "Sell"){
        const found = stocksTraded.find((trades) => trades.stock === checkthisName);
        if (!found){
            return false; 
        }
        if (found && found.quantity < checkthisQuantity){ //check quantitty of user's current holding
            return false; 
        }
        return true
    } 
    return false; 
}
 
export{
    checkValidBuy,
    checkValidSell
}