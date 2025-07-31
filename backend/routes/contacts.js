const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Defining all CRUD methods for use in backend application.
// This will connect to both the frontend UI and the database

// Get all contacts
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Create new contact
router.post('/', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
});

// Update contact
router.put('/:id', async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contact);
});

// Delete contact
router.delete('/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;