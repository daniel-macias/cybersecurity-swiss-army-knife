export function downloadJson(data, filename = 'data.json') {
    const jsonData = JSON.stringify(data, null, 2); // Convert JSON object to string with indentation
  
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
  
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  