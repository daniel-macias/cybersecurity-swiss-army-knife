import React, { useState, useEffect } from 'react';
//These imports are necessary for the Arc element to be used in the graph
//this is because issues with react-chartjs-2 "tree-shaking" 
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut, Bar } from 'react-chartjs-2';
import { unixTimestampToDateString } from '../../utils/dateUtils';

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

  const [votesChartData, setVotesChartData] = useState({
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
    if (data.data.attributes.last_analysis_stats) {
      const stats = data.data.attributes.last_analysis_stats;
      const labels = Object.keys(stats);
      const values = labels.map((key) => stats[key]);
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

      if (data.data.attributes.total_votes){

        const dataVotes = {
          labels: ['Votes'],
          datasets: [
            {
              label: 'Harmless',
              backgroundColor: 'green',
              data: [data.data.attributes.total_votes.harmless],
            },
            {
              label: 'Malicious',
              backgroundColor: 'red',
              data: [data.data.attributes.total_votes.malicious],
            },
          ],
        };

        setVotesChartData(dataVotes);
      }
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
    <div >
      <div>
        <h2>sad asdasd</h2>HOLA
        <p>jeje</p>
      </div>
      <div className="grid md:grid-cols-2 h-full">
        <div className="md:col-span-1 text-[#b7b6ba] text-xs">
          <p>Owner:</p>
          <p>{data.data.attributes.as_owner}</p>
          <p>Country: {data.data.attributes.country}</p>
          <p className="pt-2">Last Analysis</p>
          <p>{unixTimestampToDateString(data.data.attributes.last_analysis_date)}</p>
          <p className="pt-2">Last HTTPS Certificate</p>
          <p>{unixTimestampToDateString(data.data.attributes.last_https_certificate_date)}</p>
          <p className="pt-2">Network</p>
          <p>{data.data.attributes.network}</p>
          <p className="pt-2">Regional Internet Registry</p>
          <p>{data.data.attributes.regional_internet_registry}</p>
          <p className="pt-2">VirusTotal Reputation Score</p>
          <p>{data.data.attributes.reputation}</p>
          <hr className="py-4"/>
          <button className="inline-block bg-blue-500 text-white px-2 py-2 rounded-md text-xs w-full">
              Download Full Report
          </button>

        </div>
        <div className="md:col-span-1 md:h-full">
          <div className="grid md:grid-rows-2 h-full">
            <div className="md:row-span-1 h-full">
              <p className="text-center text-[#b7b6ba] text-xs pb-2">URL Aggregate Scan Results</p>
              <Doughnut 
                data={urlChartData} 
                options={{ 
                  plugins: { 
                    legend: { 
                      display: false 
                    } 
                  } 
                }} 
                className="h-5" 
              />
            </div>
            <div className="md:row-span-1 h-full">
              <p className="text-center text-[#b7b6ba] text-xs p-2 pt-8">Virus Total Reputation</p>
              <Bar 
                data={votesChartData} 
                options={{ 
                  indexAxis: 'y',
                  scales: { 
                    x: { 
                      stacked: true 
                    },
                    y: {
                      stacked: true
                    } 
                  },
                  plugins: { 
                    legend: { 
                      display: false 
                    } 
                  }  
                }} 
                className="h-5" 
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
  
}

export default IPResults