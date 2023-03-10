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
import Edit from './pages/Edit';
import FindSlution from './pages/FindSolution';
import ClinicalTrials from './components/ClinicalTrials/ClinicalTrials';
import RegulatoryAfairs from './components/RegulatoryAfairs/RegulatoryAfairs';
import PhalmacovIgilance from './components/PhalmaCovIgilance/PhalmacovIgilance';
import ClinicalTrialStudyProtocal from './components/ClinicalTrials/ClinicalTrialStudyProtocal/ClinicalTrialStudyProtocal';
import StudyStartUp from './components/ClinicalTrials/studyStartUp/StudyStartUp';
import ClinicalTrialApplication from './components/ClinicalTrials/ClinicatTrialApplication/ClinicalTrialApplication';
import Details from './components/Details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/clinicaltrials" element={<ClinicalTrials />} />
        <Route exact path="/clinicaltrials/clinicaltrialstudyprotocal" element={<ClinicalTrialStudyProtocal />} />
        <Route exact path="/clinicaltrials/clinicaltrialstudyprotocal/:id" element={<Details />} />
        <Route exact path="/clinicaltrials/studystartup" element={<StudyStartUp />} />
        <Route exact path="//clinicaltrials/clinicaltrialapplication" element={<ClinicalTrialApplication />} />
        <Route exact path="/regulatoryafairs" element={<RegulatoryAfairs />} />
        <Route exact path="/pharmacovigilance" element={<PhalmacovIgilance />} />
        <Route exact path="/options" element={<AddDropdowns />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/new" element={<NewStatement />} />
        <Route exact path="/clinicaltrials/clinicaltrialstudyprotocal/answer/:id" element={<FindSlution />} />
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
