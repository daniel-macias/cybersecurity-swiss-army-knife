import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineSecurityScan } from "react-icons/ai";

function FileScan({ onScan }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("Please upload a file");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const fileType = file.type.split("/")[1]; // Extract file extension
      const truncatedName = file.name.length > 25
        ? file.name.slice(0, 20) + "..." + `.${fileType}`
        : file.name;
      setSelectedFileName(truncatedName);
    } else {
      setSelectedFileName("Please upload a file");
    }
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
        <div className="relative mt-1">
          <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">
            Choose File
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <span className="ml-2 text-sm text-gray-400" id="file-name">
            {selectedFileName}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-400" id="file_input_help">
          Please upload a file smaller than 32MB
        </p>
      </div>
      <div className="col-span-1">
        <button
          className="h-full py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center"
          type="button"
          onClick={handleScanClick}
        >
          <p className="text-4xl text-center"><AiOutlineSecurityScan /></p>
        </button>
      </div>
    </div>
  );
}

export default FileScan;
