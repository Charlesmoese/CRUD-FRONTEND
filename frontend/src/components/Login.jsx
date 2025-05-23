import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      onLogin && onLogin();
      navigate('/contatos');
    } else {
      const error = await res.json().catch(() => ({}));
      alert(error.message || 'Email ou senha inválidos!');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Entrar</h2>
      <label>
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Senha
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button className="btn-primary" type="submit">Entrar</button>
      <p>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </form>
  );
}

export default Login;