import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Preencha todos os campos!');
      return;
    }
    // Validação simples de email
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Email inválido!');
      return;
    }
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (res.ok) {
      alert('Cadastro realizado! Faça login.');
      navigate('/login');
    } else {
      const error = await res.json().catch(() => ({}));
      alert(error.message || 'Erro ao cadastrar');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Criar Conta</h2>
      <label>
        Nome de usuário
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="btn-primary" type="submit">Cadastrar</button>
      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}

export default Register;