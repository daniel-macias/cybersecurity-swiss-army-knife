import React, { useState } from 'react';
import DomainScan from './DomainScan'
import FileScan from './FileScan'
import IPScan from './IPScan'
import URLScan from './URLScan'

import URLResults from './Results/URLResults';
import IPResults from './Results/IPResults';
import FileResults from './Results/FileResults';
import DomainResults from './Results/DomainResults';

import { AiOutlineSecurityScan } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";

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

        {/* Left Top (5/6) */}
        <div className="md:row-span-6 bg-[#28282d] h-full rounded-md p-4 flex items-center justify-center">
          <div className="bg-[#28282d] h-full rounded-md p-4 flex items-center justify-center">
            {/* Content for the top left section */}
            <div>
              {/* Choose the appropriate scan component based on the currentScanType */}
              {currentScanType === null && (
                <div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center text-center pb-4">
                      <MdOutlineSecurity size={42} className="text-blue-500" /> {/* Adjust the size and color as needed */}
                      <h2 className="ml-4 text-x2">Infosec MultiTool 1.0</h2> {/* Adjust the margin and text size as needed */}
                    </div>
                    <h1 className="text-2xl mb-4">Please choose a scanning option of your choosing and press the:</h1>
                    <p className="text-6xl"><AiOutlineSecurityScan /></p>
                    <h1 className="text-2xl mt-4">button on its side</h1>
                  </div>
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