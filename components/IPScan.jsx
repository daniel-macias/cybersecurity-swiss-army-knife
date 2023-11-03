import React, { useState } from 'react';
import axios from 'axios';

function IPScan({ onScan }) {
  const [ip, setIP] = useState('');

  const handleScanClick = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      console.log(process.env.NEXT_PUBLIC_VT_API_KEY);
  
      // Make a POST request to the VirusTotal API with the form data and set the "x-apikey" header
      const response = await axios.get('https://www.virustotal.com/api/v3/ip_addresses/'+ip, {
        headers: {
          'x-apikey': process.env.NEXT_PUBLIC_VT_API_KEY, // Set the API key as a header
        },
      });
  
      // Extract the scan result from the response
      const scanResult = response.data;
  
      // Call the onScan callback with the result
      onScan(scanResult);
    } catch (error) {
      console.error('Error scanning IP:', error);
      onScan(error.message)
      // Handle errors as needed
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-5">
        <label htmlFor="ipscan_input">IP Scan</label>
        <input
          type="text"
          id="ipscan_input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="123.45.67.89"
          pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
          required
          value={ip}
          onChange={(e) => setIP(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-400" id="ipscan_input_help">
          Only IPv4 Addresses allowed, just as the example provided
        </p>
      </div>
      <div className="col-span-1">
        <button
          className="w-full h-full py-2 px-2 bg-blue-500 text-white rounded hover-bg-blue-700"
          type="button"
          onClick={handleScanClick}
        >
          Scan
        </button>
      </div>
    </div>
  );
}

export default IPScan;
