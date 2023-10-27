import React, { useState, useEffect } from 'react';

function IPResults({ data }) {
  // Create a state variable to hold the data
  const [resultData, setResultData] = useState(data);

  // Use the useEffect hook to update the data when the prop 'data' changes
  useEffect(() => {
    setResultData(data);
  }, [data]);

  return (
    <div>
      <h2>IP Results</h2>
      <pre>{JSON.stringify(resultData, null, 2)}</pre>
    </div>
  )
}

export default IPResults