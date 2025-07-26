import React, { useState } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  // Variables to store the Contact List, the contact being edited, and the search query
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add or update a contact
  const handleSave = (contact) => {
    // Cancel editing
    if (contact === null) {
      setEditingContact(null);
      return;
    }

    // Update existing contact
    if (contact.id) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === contact.id ? contact : c
        )
      );
    } 
    
    // Add new contact with unique ID
    else {
      contact.id = Date.now();
      setContacts((prev) => [...prev, contact]);
    }

    // Clear the input form after updating contact
    setEditingContact(null);
  };

  // Delete a contact
  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Start editing a contact
  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Contact Manager</h1>

      <SearchBar onSearch={setSearchQuery} />

      <ContactForm
        onSave={handleSave}
        editingContact={editingContact}
      />

      <ContactList
        contacts={filteredContacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;