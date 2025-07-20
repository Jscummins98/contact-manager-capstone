import React from 'react';

// Create the contacts list that lets a user edit or delete each contact
function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <div>
                <strong>{contact.firstName} {contact.lastName}</strong>
                <p>{contact.phone}</p>
              </div>
              <div className="btn-group">
                <button onClick={() => onEdit(contact)}>Edit</button>
                <button onClick={() => onDelete(contact.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;