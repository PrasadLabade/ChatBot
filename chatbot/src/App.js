import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:5000/getresponse?input=${input}`);
      setResponse(result.data.response);
      console.log("Response : ", response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Python Server UI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input"
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Get Response</button>
      </form>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <p>Response: {response}</p>
        </div>
      )}
    </div>
  );
}

export default App;