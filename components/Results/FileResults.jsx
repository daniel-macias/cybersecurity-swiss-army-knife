import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileResults({ data }) {
  // Create a state variable to hold the data
  const [analysesData, setAnalysesData] = useState({});

  // Use the useEffect hook to update the data when the prop 'data' changes
  useEffect(() => {
    handleGetAnalyses();
    
  }, [data]);

  useEffect(() => {
    console.log(analysesData)
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
    } catch (error) {
      console.error('Error scanning FILE:', error);
      onScan(error.message)
      // Handle errors as needed
    }
  };

  return (
    <div>
      <h2>File Results</h2>
      <h2>TEST</h2>
      <pre>{JSON.stringify(analysesData, null, 2)}</pre>
    </div>
  );
}

export default FileResults