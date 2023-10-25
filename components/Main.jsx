import React from 'react'

function Main() {
  return (
    <div className="h-screen flex">
      {/* Left Half */}
      <div className="w-1/2 flex flex-col">
        {/* Left Top (2/3) */}
        <div className="h-2/3 p-4">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the top left section */}
            añoña
          </div>
        </div>

        {/* Left Bottom (1/3) */}
        <div className="h-1/3 p-4">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the bottom left section */}
          </div>
        </div>
      </div>

      {/* Right Half */}
      <div className="w-1/2 flex flex-col">
        {/* Right Top (1/4) */}
        <div className="flex-1 p-4">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the top right section */}
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-4">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the top right section */}
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-4">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the top right section */}
          </div>
        </div>

        {/* Right Top (1/4) */}
        <div className="flex-1 p-4">
          <div className="bg-gray-300 h-full rounded-md p-4">
            {/* Content for the top right section */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main