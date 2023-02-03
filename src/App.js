import { useState, useId } from 'react';
import './App.css';
import Model from './components/Model';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropD from './components/Dropdowns';

function App() {
  const [data, setData] = useState({});
  const [result, setResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popupValue, setPopupVAlue] = useState('');
  const [createQuestion, setCreateQuestion] = useState(false);

  const id = useId();
  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(data.split(/(\s+)/).filter((e) => e.trim().length > 0));
  };

  const handleOption = (e) => {
    setPopupVAlue(e.target.name);
    setIsOpen((current) => !current);
  };

  const handleIsOpen = () => {
    setIsOpen(false);
  };

  const handleOnSaveData = () => {
    setCreateQuestion(true);
  };

  return (
    <div className="App">
      <h1>Questions editor</h1>
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => { setData(e.target.value); }} />
        <input type="submit" value="submit" />
      </form>
      <div className="splited__questions">
        {result.length > 0 && result.map((item) => (
          <button type="button" key={id} className="splited__questions" name={item} onClick={(e) => { handleOption(e); }}>{item}</button>
        ))}
      </div>
      {isOpen && <Model isOpen={handleIsOpen} onSaveData={handleOnSaveData} name={popupValue} />}

      {createQuestion && <DropD />}
    </div>
  );
}

export default App;
