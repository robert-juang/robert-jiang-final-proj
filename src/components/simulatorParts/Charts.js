import React, { useState }  from "react";
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import { DataContext, Simulator } from "../../pages/Simulator";

function generate(num){
  const arr = []; 
  for (let i = 1; i <= num; i++){
    arr.push(i.toString()); 
  }
  return arr; 
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const Charts = () => {
    const [acctval, setacctval] = useState([10]); 
    const data = React.useContext(DataContext); 
    const label = generate(data); 
    // console.log(data); 

    label.map((element,index) => {
        if (index >= acctval.length){
          setacctval(oldArray => [...oldArray, getRandomArbitrary(0,10000)]); 
        }
    })
    // for (let i = 0; i < label.length; i++){
    //     if (i >= acctval.length){
    //       setacctval(oldArray => [...oldArray, getRandomArbitrary(0,10000)]); 
    //     }
    // }

    const state = {
        labels: [...label],
        datasets: [
          {
            label: 'Price',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [...acctval] //TODO: Connect the Data to data source
          }
        ]
    }

    //const [data, setData] = useState({title:"",store:state});

    return (
        <div class = "chart">
          <Line
            data={state}
            options={{
              title:{
                display:true,
                text:'Stock traded',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
    );
};
  
export default Charts;





