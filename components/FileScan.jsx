import React, { useState } from 'react';
import axios from 'axios';

function FileScan({ onScan }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleScanClick = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();
  
      // Append the "url" parameter to the form
      formData.append('file', selectedFile);
      console.log(process.env.NEXT_PUBLIC_VT_API_KEY);
  
      // Make a POST request to the VirusTotal API with the form data and set the "x-apikey" header
      const response = await axios.post('https://www.virustotal.com/api/v3/files', formData, {
        headers: {
          'x-apikey': process.env.NEXT_PUBLIC_VT_API_KEY, // Set the API key as a header
        },
      });
  
      // Extract the scan result from the response
      const scanResult = response.data;
  
      // Call the onScan callback with the result
      onScan(scanResult);
    } catch (error) {
      console.error('Error scanning URL:', error);
      onScan(error.message)
      // Handle errors as needed
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-5">
        <label htmlFor="file_input">File Scan</label>
        <input
          type="file"
          id="file_input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          aria-describedby="file_input_help"
          onChange={handleFileChange}
        />
        <p className="mt-1 text-sm text-gray-400" id="file_input_help">
          Please upload a file smaller than 32MB
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

export default FileScan;
