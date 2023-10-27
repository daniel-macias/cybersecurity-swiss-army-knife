import React, { useState, useEffect } from 'react';

function DomainResults({ data }) {
    // Create a state variable to hold the data
    const [resultData, setResultData] = useState(data);

    // Use the useEffect hook to update the data when the prop 'data' changes
    useEffect(() => {
      setResultData(data);
    }, [data]);

  return (
    <div>
      <h2>DomainResults</h2>
      <pre>{JSON.stringify(resultData, null, 2)}</pre>
    </div>
    
  )
}

export default DomainResults