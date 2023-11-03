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
        'red',
        'blue',
        'green',
        'orange',
        'purple',
        'pink',
        'yellow',
        'cyan',
      ];
  
      setChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor,
          },
        ],
      });

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
    <div>
      <h2>File Results</h2>
      <div>
        {chartData.labels.length > 0 ? (
          <><Doughnut data={chartData} />
          <h3>Date: {unixTimestampToDateString(analysesData.data.attributes.date)}</h3>
          <h3>Status: {analysesData.data.attributes.status}</h3>
          </>
          
          
        ) : (
          <p>No data available for the chart.</p>
        )}
      </div>
    </div>
  );
}

export default FileResults