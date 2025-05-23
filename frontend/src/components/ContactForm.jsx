import React, { useState, useEffect } from 'react';
import './ContactForm.css';

function ContactForm({ contactToEdit, onSaved }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhone(contactToEdit.phone);
    } else {
      setName('');
      setPhone('');
    }
  }, [contactToEdit]);

  const handleSubmit = async e => {
    e.preventDefault();
    // Validação do telefone: formato 00 00000-0000
    if (!/^\d{2} \d{5}-\d{4}$/.test(phone)) {
      alert('Telefone inválido! Use o formato xx xxxxx-xxxx');
      return;
    }
    const token = localStorage.getItem('token');
    const method = contactToEdit ? 'PUT' : 'POST';
    const url = contactToEdit
      ? `${import.meta.env.VITE_API_URL}/contacts/${contactToEdit._id}`
      : `${import.meta.env.VITE_API_URL}/contacts`;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, phone })
    });

    if (res.ok) {
      setName('');
      setPhone('');
      onSaved && onSaved();
    } else {
      alert('Erro ao salvar contato');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>{contactToEdit ? 'Editar Contato' : 'Novo Contato'}</h2>
      <label>
        Nome
        <input
          type="text"
          placeholder="Digite o nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Telefone
        <input
          type="tel"
          placeholder="Digite o telefone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="btn-primary">
        {contactToEdit ? 'Atualizar' : 'Salvar'}
      </button>
    </form>
  );
}

export default ContactForm;