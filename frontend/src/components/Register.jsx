import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      alert('Cadastro realizado! Faça login.');
      navigate('/login');
    } else {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Criar Conta</h2>
      <label>
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Senha
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button className="btn-primary" type="submit">Cadastrar</button>
      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}

export default Register;