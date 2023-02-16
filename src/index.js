import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import NewQuestion from './components/NewQuestion';
import Answer from './components/Answer';
import EditStatement from './components/EditStatement';
import NewStatement from './pages/NewStatement';
import AddDropdowns from './pages/AddDropdowns';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/options" element={<AddDropdowns />} />
        <Route exact path="/edit" element={<EditStatement />} />
        <Route exact path="/new" element={<NewStatement />} />
        <Route exact path="answer/:id" element={<Answer />}/>
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
