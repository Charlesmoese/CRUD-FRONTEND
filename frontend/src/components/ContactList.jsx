import React, { useState, useEffect } from 'react';
import API_URL from '../config';
import ContactForm from './ContactForm';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadContacts = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setContacts(data);
  };

  const handleDelete = async id => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Tem certeza que deseja excluir este contato?')) return;

    const res = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) loadContacts();
    else alert('Erro ao excluir');
  };

  const handleEdit = contact => {
    setEditing(contact);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div>
      <ContactForm contactToEdit={editing} onSaved={() => {
        setEditing(null);
        loadContacts();
      }} />
      <h2>Seus Contatos</h2>
      {contacts.length === 0 ? <p>Nenhum contato.</p> : (
        <ul>
          {contacts.map(c => (
            <li key={c._id}>
              <strong>{c.name}</strong> – {c.phone}
              <button onClick={() => handleEdit(c)}>Editar</button>
              <button onClick={() => handleDelete(c._id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;