import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './page/Registration/Registration';
import Login from './page/Login/Login';
import Dashboard from './page/Dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Registration />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
