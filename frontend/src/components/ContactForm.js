import React, { useState, useEffect } from 'react';

// Create the form that lets users add/update contact info
const ContactForm = ({ onSave, editingContact }) => {
  const [contact, setContact] = useState({ firstName: '', lastName: '', phone: '' });

  // Check if user is editing a contact to determine what should be in the input fields
  useEffect(() => {
    if (editingContact) {
      setContact(editingContact);
    } else {
      setContact({ firstName: '', lastName: '', phone: '' });
    }
  }, [editingContact]);

  // Make sure the correct contact is updated when form is submitted
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
    setContact({ firstName: '', lastName: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingContact ? 'Edit' : 'Add'} Contact</h2>
      <input name="firstName" value={contact.firstName} onChange={handleChange} placeholder="First Name" required />
      <input name="lastName" value={contact.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">{editingContact ? 'Update' : 'Add'} Contact</button>
    </form>
  );
};

export default ContactForm;