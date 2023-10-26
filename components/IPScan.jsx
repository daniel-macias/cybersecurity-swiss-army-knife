import React, { useState } from 'react';

function IPScan({ onScan }) {
  const [ip, setIP] = useState('');

  const handleScanClick = () => {
    // Perform data validation and scanning logic as needed
    const scanResult = {}; // Replace with actual scan result
    onScan('ip', scanResult);
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
        <p className="mt-1 text-sm text-gray-500" id="ipscan_input_help">
          HELP HELP
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
