import React, { useState }  from "react";
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

const Charts = () => {

    const state = {
        labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26"],
        datasets: [
          {
            label: 'Price',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26] //TODO: Connect the Data to data source
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
                text:'Average Rainfall per month',
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





