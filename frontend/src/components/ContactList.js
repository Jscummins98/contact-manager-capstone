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
              <div className='contact-item' key={contact.id}>
                <div className='contact-info'>
                  <strong>{contact.firstName} {contact.lastName}</strong>
                  <p>{contact.phone}</p>
                </div>
                <div className="contact-actions">
                  <button className='edit-btn' onClick={() => onEdit(contact)}>Edit</button>
                  <button className='delete-btn' onClick={() => onDelete(contact._id)}>Delete</button>
                </div>
              </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;