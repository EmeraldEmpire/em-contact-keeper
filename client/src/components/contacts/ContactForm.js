import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { current, addContact, updateContact, clearCurrent } = contactContext;
  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (!current) {
      clearContact();
      return;
    }

    setContact(current);
  }, [contactContext, current]);

  const bindInput = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const submitContact = e => {
    e.preventDefault();

    if (current) {
      updateContact(contact);
      return;
    }

    addContact(contact);
  };

  const clearContact = () =>
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });

  return (
    <form onSubmit={submitContact}>
      <h2 className="text-primary">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={bindInput}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={bindInput}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={bindInput}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={bindInput}
      />{' '}
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={bindInput}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearCurrent}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
