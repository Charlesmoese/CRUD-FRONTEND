import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ContactList from './components/ContactList';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <ContactList /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contatos" element={isAuthenticated ? <ContactList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;