import React, { useState, useEffect } from 'react';
import axios from 'axios';
//These imports are necessary for the Arc element to be used in the graph
//this is because issues with react-chartjs-2 "tree-shaking" 
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';

function unixTimestampToDateString(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  return date.toISOString(); // Returns a string like "2023-04-05T14:30:00.000Z"
}

function FileResults({ data }) {
  // Create a state variable to hold the data
  const [analysesData, setAnalysesData] = useState({});

  const [chartData, setChartData] = useState({
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
    handleGetAnalyses();
    
  }, [data]);

  useEffect(() => {
    console.log(analysesData)
    if (analysesData.data) {
      const stats = analysesData.data.attributes.stats;
      const labels = Object.keys(stats);
      const values = labels.map((key) => stats[key]);
      console.log("LABEL");
      console.log(labels);
      console.log("VALUES");
      console.log(values);
      // You can set colors for the chart segments here
      const backgroundColor = [
        'green',
        'cyan',
        'orange',
        'yellow',
        'purple',
        'pink',
        'red',
        'blue',
      ];
  
      setChartData({
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

      chartData.labels.forEach((label, index) => {
        if (chartData.datasets[0].data[index] > 0) {
          cleanedData.labels.push(label);
          cleanedData.datasets[0].data.push(chartData.datasets[0].data[index]);
          cleanedData.datasets[0].backgroundColor.push(chartData.datasets[0].backgroundColor[index]);
        }
      });

      setChartData(cleanedData);
      console.log("Chart Data")
      console.log(chartData);
    }



  }, [analysesData]);

  const handleGetAnalyses = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

  
      // Make a POST request to the VirusTotal API with the form data and set the "x-apikey" header
      const response = await axios.get('https://www.virustotal.com/api/v3/analyses/'+data.data.id, {
        headers: {
          'x-apikey': process.env.NEXT_PUBLIC_VT_API_KEY, // Set the API key as a header
        },
      });
  
      // Extract the scan result from the response
      const scanResult = response.data;

      setAnalysesData(scanResult);
      console.log(analysesData);
    } catch (error) {
      console.error('Error scanning FILE:', error);
      onScan(error.message)
      // Handle errors as needed
    }
  };

  return (
  <div className="grid grid-cols-3">
    <div className="col-span-2">
      <h2 className="text-2xl">File Results</h2>
      <div>
        {chartData.labels.length > 0 ? (
          <>
            <h3>Scan Date: {unixTimestampToDateString(analysesData.data.attributes.date)}</h3>
            <h3>Status: {analysesData.data.attributes.status}</h3>
            <Doughnut data={chartData} />
          </>
        ) : (
          <p>No data available for the chart.</p>
        )}
      </div>
    </div>
    <div className="col-span-1 bg-[#444347] rounded-md p-4">
      Summary
    </div>
  </div>
  );
}

export default FileResults