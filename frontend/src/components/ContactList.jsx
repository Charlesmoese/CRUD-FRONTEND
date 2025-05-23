import React, { useState, useEffect } from 'react';
import API_URL from '../config';
import ContactForm from './ContactForm';

function ContactList({ onLogout }) {
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
      {/* Botão de logout no topo direito */}
      <button
        onClick={onLogout}
        className="btn-logout"
        style={{ float: 'right', margin: '1rem' }}
      >
        Sair
      </button>
      <ContactForm contactToEdit={editing} onSaved={() => {
        setEditing(null);
        loadContacts();
      }} />
      <h2>Seus Contatos</h2>
      {contacts.length === 0 ? <p>Nenhum contato.</p> : (
        <ul>
          {contacts.map(c => (
            <li key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                <strong>{c.name}</strong> – {c.phone}
              </span>
              <span>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c._id)}>Excluir</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;