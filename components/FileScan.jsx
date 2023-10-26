import React, { useState } from 'react';

function FileScan({ onScan }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleScanClick = () => {
    // Perform data validation and scanning logic as needed
    const scanResult = {}; // Replace with actual scan result
    onScan('file', scanResult);
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
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
          SVG, PNG, JPG, or GIF (MAX. 800x400px).
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
