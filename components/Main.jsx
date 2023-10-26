import React, { useState } from 'react';
import ResultsContainer from './ResultsContainer'
import DomainScan from './DomainScan'
import FileScan from './FileScan'
import IPScan from './IPScan'
import URLScan from './URLScan'

import URLResults from './Results/URLResults';
import IPResults from './Results/IPResults';
import FileResults from './Results/FileResults';
import DomainResults from './Results/DomainResults';

function Main() {

  const [currentScanType, setCurrentScanType] = useState(null);
  const [scanData, setScanData] = useState({});

  const handleScan = (scanType, data) => {
    setCurrentScanType(scanType);
    setScanData(data);
  };


  return (
    <div className="h-screen flex">
      {/* Left Half */}
      
      <div className="w-1/2 flex flex-col">
                {/* Left Bottom (1/3) */}
                <div className="h-1/6 p-2">
          <div className="bg-[#28282d] h-full rounded-md p-4">
            {/* Content for the bottom left section */}
          </div>
        </div>
        {/* Left Top (2/3) */}
        <div className="h-5/6 p-2">
          <div className="bg-[#28282d] h-full rounded-md p-4">
            {/* Content for the top left section */}
            <div>
              {/* Choose the appropriate scan component based on the currentScanType */}
              {currentScanType === null && (
                <div>
                  PLEASE SCAN
                </div>
              )}
              {currentScanType === 'url' && (
                <URLResults data={scanData} />
              )}
              {currentScanType === 'ip' && (
                <IPResults data={scanData} />
              )}
              {currentScanType === 'file' && (
                <FileResults data={scanData} />
              )}
              {currentScanType === 'domain' && (
                <DomainResults data={scanData} />
              )}
            </div>
          </div>
        </div>


      </div>

      {/* Right Half */}
      <div className="w-1/2 flex flex-col">
        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-[#28282d] h-full rounded-md p-4">
            <FileScan onScan={(data) => handleScan('file', data)} />
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-[#28282d] h-full rounded-md p-4">
            <URLScan onScan={(data) => handleScan('url', data)} />
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-[#28282d] h-full rounded-md p-4">
            <IPScan onScan={(data) => handleScan('ip', data)} />
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-[#28282d] h-full rounded-md p-4">
            <DomainScan onScan={(data) => handleScan('domain', data)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main