import { useState, useId } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [data, setData] = useState({});
  const [result, setResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const id = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(data.split(/(\s+)/).filter((e) => e.trim().length > 0));
  };

  const handleOption = (e) => {
    setIsOpen((current) => !current);
    setSelectedWord(e.target.value);
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
          <li key={id + index}>
            <button
              type="button"
              onClick={() => {
                setSelectedWord(item);
                setIsOpen(true);
              }}
            >
              {item}
            </button>
            {selectedWord === item && (
              <select onChange={handleOption}>
                <option value="">Select an option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
