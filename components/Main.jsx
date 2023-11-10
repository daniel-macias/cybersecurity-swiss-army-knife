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

import { AiOutlineSecurityScan } from "react-icons/ai";


function Main() {

  const [currentScanType, setCurrentScanType] = useState(null);
  const [scanData, setScanData] = useState({});

  const handleScan = (scanType, data) => {
    setCurrentScanType(scanType);
    setScanData(data);
    console.log(data);
  };


  return (
    <div className="min-h-screen grid md:grid-cols-5 max-h-screen-xl mx-auto">
      {/* Left Half */}
      
      <div className="grid md:grid-rows-6 md:col-span-3 h-full">
        {/* Left Bottom (1/6) */}
        <div className="row-span-1 bg-[#28282d] h-full rounded-md p-4">
          <div className="bg-[#28282d] h-full rounded-md p-4">
            {/* Content for the bottom left section */}
            <h3>Testing</h3>
          </div>
        </div>
        {/* Left Top (5/6) */}
        <div className="md:row-span-5 bg-[#28282d] h-full rounded-md p-4 flex items-center justify-center">
          <div className="bg-[#28282d] h-full rounded-md p-4 flex items-center justify-center">
            {/* Content for the top left section */}
            <div>
              {/* Choose the appropriate scan component based on the currentScanType */}
              {currentScanType === null && (
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl mb-4">Please choose a scanning option of your choosing and press the scan:</h1>
                  <p className="text-6xl"><AiOutlineSecurityScan /></p>
                  <h1 className="text-2xl mt-4">on its right side</h1>
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
      <div className="grid md:grid-rows-4 md:col-span-2">
        {/* Right Top (1/4) */}
        <div className="md:row-span-1 bg-[#28282d] h-full rounded-md p-4">
            <FileScan onScan={(data) => handleScan('file', data)} />
        </div>

        {/* Right Top (1/4) */}
        <div className="md:row-span-1 bg-[#28282d] h-full rounded-md p-4">
            <URLScan onScan={(data) => handleScan('url', data)} />
        </div>

        {/* Right Top (1/4) */}
        <div className="md:row-span-1 bg-[#28282d] h-full rounded-md p-4">
            <IPScan onScan={(data) => handleScan('ip', data)} />
        </div>

        {/* Right Top (1/4) */}
        <div className="md:row-span-1 bg-[#28282d] h-full rounded-md p-4">
            <DomainScan onScan={(data) => handleScan('domain', data)} />
        </div>
      </div>
    </div>
  )
}

export default Main