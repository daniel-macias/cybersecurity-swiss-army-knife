import React, { useState, useEffect } from 'react';
//These imports are necessary for the Arc element to be used in the graph
//this is because issues with react-chartjs-2 "tree-shaking" 
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';

function unixTimestampToDateString(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  return date.toISOString(); // Returns a string like "2023-04-05T14:30:00.000Z"
}

function IPResults({ data }) {
  // Create a state variable to hold the data
  const [resultData, setResultData] = useState(data);

  const [urlChartData, setUrlChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  // Use the useEffect hook to update the data when the prop 'data' changes
  useEffect(() => {
    setResultData(data);
    if (data.data) {
      const stats = data.data.attributes.last_analysis_stats;
      const labels = Object.keys(stats);
      const values = labels.map((key) => stats[key]);
      console.log("LABEL");
      console.log(labels);
      console.log("VALUES");
      console.log(values);
      // You can set colors for the chart segments here
      const backgroundColor = [
        'green',
        'red',
        'orange',
        'cyan',
        'yellow',
        'blue'
      ];
  
      setUrlChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor,
            borderWidth: 0,
          },
          
        ],
        
      });

      const cleanedData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderWidth: 0
          }
        ]
      };
/*
      chartData.labels.forEach((label, index) => {
        if (chartData.datasets[0].data[index] > 0) {
          cleanedData.labels.push(label);
          cleanedData.datasets[0].data.push(chartData.datasets[0].data[index]);
          cleanedData.datasets[0].backgroundColor.push(chartData.datasets[0].backgroundColor[index]);
        }
      });
      setChartData(cleanedData);
*/
      console.log("Chart Data")
      console.log(urlChartData);
    }


  }, [data]);

  return (
    <div className="grid lg:grid-cols-2 h-full">
      <div className="lg:col-span-1">
        A
        {/* You can include any content or components here */}
      </div>
      <div className="lg:col-span-1 lg:h-full">
        <div className="grid lg:grid-rows-2 h-full">
          <div className="lg:row-span-1 h-full">
          <Doughnut 
            data={urlChartData} 
            options={{ 
              plugins: { 
                legend: { 
                  display: false 
                } 
              } 
            }} 
  className="h-1/2" 
/>
          </div>
          <div className="lg:row-span-1 h-full">
            s
          <Doughnut 
            data={urlChartData} 
            options={{ 
              plugins: { 
                legend: { 
                  display: false 
                } 
              } 
            }} 
            className="h-1/2" 
          />
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default IPResults