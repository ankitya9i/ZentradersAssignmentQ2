import React, { useState, useEffect } from 'react';
import './Second.css'
import ProductTable from './ProductTable';

const Second = () => {

  const [file, setfile] = useState('');
  const [fileContent, setFileContent] = useState({});
  const [fileType, setFileType] = useState(''); // Default to text file
  const [encoding, setEncoding] = useState('utf-8'); // Default to UTF-8
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  // 
  const availableProperties = ['subcategory', 'title', 'price', 'popularity'];
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [displaytable, setdisplaytable] = useState(false)

  const handlePropertySelect = (property) => {
    if (!selectedProperties.includes(property)) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const handlePropertyRemove = (property) => {
    const updatedProperties = selectedProperties.filter((selected) => selected !== property);
    setSelectedProperties(updatedProperties);
  };

 const resetAllStates=()=>{
  setHasHeader(false);
  setFileContent({});
  setFileType('');
  setEncoding('utf8');
  setDelimiter(',');

  }

  const handleFileChange =  () => {

    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const content = e.target.result;
  
        // If fileType is JSON, parse the content as JSON
        if (fileType === 'json') {
          try {
            const parsedContent =   JSON.parse(content);
            setFileContent(parsedContent); // Beautify JSON
            setdisplaytable(true);

          } catch (error) {
            console.error('Error parsing JSON:', error);
            setFileContent('Error parsing JSON');
          }
        } else if (fileType === 'csv') {
          // Parse CSV based on specified delimiter and hasHeader
          const rows = content.split('\n');
          const headers = hasHeader ? rows[0].split(delimiter) : null;
          const parsedContent = rows
            .slice(hasHeader ? 1 : 0)
            .map((row) => row.split(delimiter));
            setFileContent(parsedContent);
            setdisplaytable(true);
          // Display the parsed content
        } else {
          // For other file types, display the content as is
          setFileContent(content);
        }
      };
      // Set the specified encoding and read the file
      reader.readAsText(file, encoding);
      
    }else{
      alert("File not found");
    }
  };
  

  return (
    <>
    <div className='Second' >
        <h4>Import products</h4>
        <div className='importgrid'>

            <div className='grid'>
                <p>Type 1: Select File</p>
                <input type="file" onChange={(e)=>{setfile(e.target.files[0])}} />
                <p>supported File Types(s): CSV, .json</p>
            </div>

            <div className='grid'>
                <p>step 2: specify format</p>
                <label>
        File type: 
        <select value={fileType} onChange={(e) => setFileType(e.target.value)}  >
          <option value="json">json</option>
          <option value="csv">csv</option>
          
        </select>
      </label>
      <label>
        Character encoding:
        <select value={encoding} onChange={(e) => setEncoding(e.target.value)}>
          <option value="utf-8">UTF-8</option>
          <option value="iso-8859-1">ISO-8859-1</option>
         
        </select>
      </label>

      <label>
        Delimeter:
        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}  >
          <option value="comma">comma</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </label>
                <label htmlFor="">Has Header</label>
                <input type="checkbox"  checked={hasHeader}
            onChange={() => setHasHeader(!hasHeader)}/>
            </div>
            <div className='grid'>
                <p>step 3: Display Handling</p>
                <p>Select the fields to be displayed</p>
                <div className="property-selector-container">
      <div className="properties-box">
        <h2>Available Properties</h2>
        <ul>
          {availableProperties.map((property) => (
            <li key={property} onClick={() => handlePropertySelect(property)}>
              {property}
            </li>
          ))}
        </ul>
      </div>

      <div className="properties-box">
        <h2>Selected Properties</h2>
        <ul>
          {selectedProperties.map((property) => (
            <li key={property} onClick={() => handlePropertyRemove(property)}>
              {property}
            </li>
          ))}
        </ul>
      </div>
    </div>
            </div>
        </div>

      <button className='btn1' onClick={handleFileChange}>next</button>
      <button className='btn2'  >Cancel</button>
      {displaytable ? <ProductTable data={fileContent} selectedProperties = {selectedProperties}/>:null}
    </div>
    </>
  );
};

export default Second;
