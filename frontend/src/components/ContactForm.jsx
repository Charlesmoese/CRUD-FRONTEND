import React, { useState, useEffect } from 'react';
import API_URL from '../config';

function ContactForm({ contactToEdit, onSaved }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhone(contactToEdit.phone);
    }
  }, [contactToEdit]);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const method = contactToEdit ? 'PUT' : 'POST';
    const url = contactToEdit
      ? `${API_URL}/contacts/${contactToEdit._id}`
      : `${API_URL}/contacts`;

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
    <form onSubmit={handleSubmit}>
      <h2>{contactToEdit ? 'Editar Contato' : 'Novo Contato'}</h2>
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} required />
      <button type="submit">{contactToEdit ? 'Atualizar' : 'Salvar'}</button>
    </form>
  );
}

export default ContactForm;
