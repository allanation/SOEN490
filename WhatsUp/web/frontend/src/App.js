import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element = {<Dashboard />} />
        <Route path="/" element = {<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
