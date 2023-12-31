import React, { useState, useEffect } from 'react';
//These imports are necessary for the Arc element to be used in the graph
//this is because issues with react-chartjs-2 "tree-shaking" 
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut, Bar } from 'react-chartjs-2';
import { unixTimestampToDateString } from '../../utils/dateUtils';
import { downloadJson } from '../../utils/jsonUtils';
import { MdOutlineSecurity } from "react-icons/md";
import { TbFaceIdError } from "react-icons/tb";

function IPResults({ data }) {

  const [generatedError, setGeneratedError] = useState("");

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
    if(data.data && data.data.id){

      if (data.data.attributes.last_analysis_stats) {
        const stats = data.data.attributes.last_analysis_stats;
        const labels = Object.keys(stats);
        const values = labels.map((key) => stats[key]);
        // You can set colors for the chart segments here
        const backgroundColor = [
          '#6fe138',
          '#fd7f6f',
          '#ffb55a',
          '#97ecde',
          '#ffee65',
          '#56a1f5'
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
                backgroundColor: '#6fe138',
                data: [data.data.attributes.total_votes.harmless],
              },
              {
                label: 'Malicious',
                backgroundColor: '#fd7f6f',
                data: [data.data.attributes.total_votes.malicious],
              },
            ],
          };

          setVotesChartData(dataVotes);
          setGeneratedError(""); 
        }
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
    else{
      setGeneratedError(data);
      console.log("this is the data");
      console.log(data);

      console.log("data end");
    }


  }, [data]);

  return (
    <div >
        <div className="flex items-center pb-4">
          <MdOutlineSecurity size={36} className="text-blue-500" /> {/* Adjust the size and color as needed */}
          <h2 className="ml-4 text-x2">Infosec MultiTool</h2> {/* Adjust the margin and text size as needed */}
        </div>
        {data.data && data.data.id && (
          <div className="grid md:grid-cols-2 h-full">
            <div className="md:col-span-1 text-[#b7b6ba] text-xs">
              <p>Owner:</p>
              <p>{data.data.attributes.as_owner}</p>
              <p>Country: {data.data.attributes.country}</p>
              <img src={`https://flagsapi.com/${data.data.attributes.country}/flat/32.png`} alt="Country Flag" />
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
              <button onClick={() => downloadJson(data, "ipresults.json")} className="inline-block bg-blue-500 text-white px-2 py-2 rounded-md text-xs w-full">
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
          )}
          {generatedError !== "" && (
            <div> 
              <div className="flex flex-col items-center text-center py-8">
                <p className="px-4">Error: The domain provided is not valid</p>
                <TbFaceIdError size={50} className="text-[#e65252]"/>
                {generatedError}
              </div>     
            </div>
          )}
      
    </div>
  );
  
}

export default IPResults