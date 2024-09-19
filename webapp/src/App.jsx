import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ClienteDetalle from './components/ClienteDetalle';
import ClientesList from './components/ClientesList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ClientesList />} />
          <Route path="/cliente/:id" element={<ClienteDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;