import React, { useState } from 'react';

function URLScan({ onScan }) {
  const [url, setUrl] = useState('');

  const handleScanClick = () => {
    // Perform data validation and scanning logic as needed
    const scanResult = {}; // Replace with actual scan result
    onScan('url', scanResult);
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
