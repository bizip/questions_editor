import './App.css';

function App() {
  const handleSubmit = () => {

  };
  return (
    <div className="App">
      <h1>Questions editor</h1>
      <form onSubmit={handleSubmit}>
        <textarea />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
