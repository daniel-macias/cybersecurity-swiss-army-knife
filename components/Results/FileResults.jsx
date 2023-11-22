import React, { useState, useEffect } from 'react';
import axios from 'axios';
//These imports are necessary for the Arc element to be used in the graph
//this is because issues with react-chartjs-2 "tree-shaking" 
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import { unixTimestampToDateString } from '../../utils/dateUtils';
import { downloadJson } from '../../utils/jsonUtils';
import { MdOutlineSecurity } from "react-icons/md";
import { TbFaceIdError } from "react-icons/tb";

function FileResults({ data }) {
  // Create a state variable to hold the data
  const [analysesData, setAnalysesData] = useState({});

  const [generatedError, setGeneratedError] = useState({});
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/npm/ldrs/dist/auto/cardio.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
      console.log(chartData);
    }



  }, [analysesData]);

  useEffect(() => {
    let intervalId;

    const startPolling = () => {
      intervalId = setInterval(async () => {
        await handleGetAnalyses();
      }, 60000);
    };

    const stopPolling = () => {
      clearInterval(intervalId);
    };

    if (analysesData.data?.attributes?.status == "queued") {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [analysesData.data?.attributes?.status]);

  const handleGetAnalyses = async () => {
    try {
      console.log("STARTING SCAN!");
  
      // Make a POST request to the VirusTotal API with the form data and set the "x-apikey" header
      const response = await axios.get('https://www.virustotal.com/api/v3/analyses/'+data.data.id, {
        headers: {
          'x-apikey': process.env.NEXT_PUBLIC_VT_API_KEY, // Set the API key as a header
        },
      });
  
      // Extract the scan result from the response
      const scanResult = response.data;
      setGeneratedError("");
      setAnalysesData(scanResult);
    } catch (error) {
      console.error('Error scanning FILE:', error);
      setGeneratedError(data);
    }
  };

  return (
    <div>
      <div className="flex items-center pb-4">
        <MdOutlineSecurity size={36} className="text-blue-500" /> {/* Adjust the size and color as needed */}
        <h2 className="ml-4 text-x2">Infosec MultiTool</h2> {/* Adjust the margin and text size as needed */}
      </div>
      {generatedError === "" && analysesData.data && analysesData.data.attributes && chartData.labels.length > 0 && analysesData.data.attributes.status != "queued" ? (
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <h2 className="text-2xl">File Results</h2>
          <div>
            <h3>Scan Date: {unixTimestampToDateString(analysesData.data.attributes.date)}</h3>
            <h3>Status: {analysesData.data.attributes.status}</h3>
            <Doughnut data={chartData} />
          </div>
        </div>
        <div className="col-span-1 bg-[#444347] rounded-md p-4 grow-0">
          <p className="text-center text-[#b7b6ba]  text-lg">Summary</p>
          <div className="grid grid-rows-6">
            <div className="row-span-5">
              {analysesData.data && analysesData.data.attributes ? (
              <>
                {Object.keys(analysesData.data.attributes.stats).map((key) => (
                  <p key={key} className="text-[#b7b6ba] text-xs">
                    {key}: {analysesData.data.attributes.stats[key]}
                  </p>
                ))}
                <p className="text-[#b7b6ba] text-xs">
                  Total: {Object.values(analysesData.data.attributes.stats).reduce((total, value) => total + value, 0)}
                </p>
              </>
              ) : (
                <p className="text-[#b7b6ba]">No data available.</p>
              )}

              <hr className="my-2"/>
            </div>

            <div className="row-span-1">
              <button onClick={() => downloadJson(data, "fileresults.json")} className="inline-block bg-blue-500 text-white px-2 py-2 rounded-md text-xs w-full">
                Download Report
              </button>
            </div>
            
          </div>
          
        </div>
      </div>
      ) : generatedError === "" &&  (

        <>
          <div className="flex items-center pb-4">
          <p className="px-4">Your data is queued, please wait! This should only take a minute.
          </p>
          <l-cardio
            size="120"
            stroke="10"
            speed="2" 
            color="white" 
          ></l-cardio>
          </div>
        </>
        
      )}

          

      {generatedError !== "" && (
              <div> 
                <div className="flex flex-col items-center text-center py-8">
                <p className="px-4">Error: The file provided is not valid</p>
                  <TbFaceIdError size={50} className="text-[#e65252]"/>
                  <p className="px-4">Please provide a file smaller than 32MB</p>
                </div>
                
              </div>
            )}
    </div>
  
  );
}

export default FileResults