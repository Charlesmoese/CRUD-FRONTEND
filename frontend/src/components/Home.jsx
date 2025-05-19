import React, { useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      <h1>Gerenciador de Contatos</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
}

<button onClick={() => {
  localStorage.removeItem('token');
  window.location.href = '/login';
}}>
  Sair
</button>


export default Home;
