import React from 'react'
import Results from './Results'
import DomainScan from './DomainScan'
import FileScan from './FileScan'
import IPScan from './IPScan'
import URLScan from './URLScan'

function Main() {
  return (
    <div className="h-screen flex">
      {/* Left Half */}
      
      <div className="w-1/2 flex flex-col">
                {/* Left Bottom (1/3) */}
                <div className="h-1/6 p-2">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the bottom left section */}
          </div>
        </div>
        {/* Left Top (2/3) */}
        <div className="h-5/6 p-2">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the top left section */}
            <Results />
          </div>
        </div>


      </div>

      {/* Right Half */}
      <div className="w-1/2 flex flex-col">
        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-gray-300 h-full rounded-md p-4">
            <FileScan />
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-gray-300 h-full rounded-md p-4">
            <URLScan />
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-gray-300 h-full rounded-md p-4">
            <IPScan />
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-2">
          <div className="bg-gray-300 h-full rounded-md p-4">
            <DomainScan />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main