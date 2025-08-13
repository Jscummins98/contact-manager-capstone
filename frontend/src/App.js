import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

// Replaced localhost:5000 with https://contact-manager-capstone-2.onrender.com to connect to live backend on render

  // Get contacts from backend when app loads
  useEffect(() => {
    fetch('http://https://contact-manager-capstone-2.onrender.com/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error('Error loading contacts:', err));
  }, []);

  // Add or update contact
  const handleSave = (contact) => {
    if (contact._id) {
      // UPDATE contact with PUT method
      fetch(`http://https://contact-manager-capstone-2.onrender.com/api/contacts/${contact._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      })
        .then(res => res.json())
        .then(updated => {
          setContacts(prev =>
            prev.map(c => (c._id === updated._id ? updated : c))
          );
          setEditingContact(null);
        });
    } else {
      // ADD new contact with POST method
      fetch('http://https://contact-manager-capstone-2.onrender.com/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      })
        .then(res => res.json())
        .then(newContact => {
          setContacts(prev => [...prev, newContact]);
        });
    }
  };

  // Delete a contact with DELETE method
  const handleDelete = (id) => {
    fetch(`http://https://contact-manager-capstone-2.onrender.com/api/contacts/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setContacts(prev => prev.filter(c => c._id !== id));
      });
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Contact Manager</h1>

      <SearchBar onSearch={setSearchQuery} />

      <ContactForm 
        onSave={handleSave} 
        editingContact={editingContact} 
      />

      <ContactList
        contacts={filteredContacts}
        onEdit={setEditingContact}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;