import { useState, useId } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [data, setData] = useState({});
  const [result, setResult] = useState([]);
  const [isOpen,setIsOpen] =useState(false);
  const id = useId();
  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(data.split(/(\s+)/).filter((e) => e.trim().length > 0));
  };

  const handleOption = (e) => {
    setIsOpen((current) => !current);
  };

  return (
    <div className="App">
      <h1>Questions editor</h1>
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => { setData(e.target.value); }} />
        <input type="submit" value="submit" />
      </form>

      <ul>
        {result.length > 0 && result.map((item) => (
          <li key={id}>
            <button id={id} type="button" onClick={(e) => { handleOption(e); }}>{item}</button>
          </li>
        ))}
      </ul>


      {isOpen && 
        <ul>
        <li>Create Drop down</li>
        <li>Create List</li>
        <li>Create Radio</li>
      </ul>
      }
    </div>
  );
}

export default App;
