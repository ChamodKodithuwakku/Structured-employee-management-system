import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import CreateDriver from './components/createDriver'; // Assuming this component exists
import Update from './components/update'
import Report from './components/report'; // Assuming this component exists

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createDriver" element={<CreateDriver />} />
          <Route path="/updateItem/:id" element={<Update />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
