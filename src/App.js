import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [data, setData] = useState({});
  const [result, setResult] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(data.split(/(\s+)/).filter((e) => e.trim().length > 0));
  };


  return (
    <div className="App">
      <h1>Questions editor</h1>
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => { setData(e.target.value); }} />
        <input type="submit" value="submit" />
      </form>

      <ul>
        {result.length > 0 && result.map((item, index) => (
          <li key={uuidv4()}>
          <a href="#">{item}</a>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
