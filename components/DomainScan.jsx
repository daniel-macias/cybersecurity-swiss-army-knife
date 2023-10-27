import React, { useState } from 'react';
import axios from 'axios';

function DomainScan({ onScan }) {
  const [domain, setDomain] = useState('');

  const handleScanClick = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      console.log(process.env.NEXT_PUBLIC_VT_API_KEY);
  
      // Make a POST request to the VirusTotal API with the form data and set the "x-apikey" header
      const response = await axios.get('https://www.virustotal.com/api/v3/domains/'+domain, {
        headers: {
          'x-apikey': process.env.NEXT_PUBLIC_VT_API_KEY, // Set the API key as a header
        },
      });
  
      // Extract the scan result from the response
      const scanResult = response.data;
  
      // Call the onScan callback with the result
      onScan(scanResult);
    } catch (error) {
      console.error('Error scanning DOMAIN:', error);
      onScan(error.message)
      // Handle errors as needed
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-5">
        <label htmlFor="domainscan_input">Domain Scan</label>
        <input
          type="url"
          id="domainscan_input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example.com"
          required
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-500" id="domainscan_input_help">
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

export default DomainScan;
