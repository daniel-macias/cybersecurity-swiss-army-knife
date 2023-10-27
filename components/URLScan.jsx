import React, { useState } from 'react';
import axios from 'axios';

function URLScan({ onScan }) {
  const [url, setUrl] = useState('');

  const handleScanClick = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();
  
      // Append the "url" parameter to the form
      formData.append('url', url);
      console.log(process.env.VT_API_KEY);
  
      // Make a POST request to the VirusTotal API with the form data and set the "x-apikey" header
      //const response = await axios.post('https://www.virustotal.com/api/v3/urls', formData, {
      //  headers: {
      //    'x-apikey': process.env.VT_API_KEY, // Set the API key as a header
      //  },
      //});
  
      // Extract the scan result from the response
      //const scanResult = response.data;
  
      // Call the onScan callback with the result
      //onScan(scanResult);
    } catch (error) {
      console.error('Error scanning URL:', error);
      onScan(error)
      // Handle errors as needed
    }
  };
  

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-5">
        <label htmlFor="urlscan_input">URL Scan</label>
        <input
          type="url"
          id="urlscan_input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example.com/subpage"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-500" id="urlscan_input_help">
          HELP HELP
        </p>
      </div>
      <div className="col-span-1">
        <button
          className="w-full h-full py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          type="button"
          onClick={handleScanClick}
        >
          Scan
        </button>
      </div>
    </div>
  );
}

export default URLScan;
