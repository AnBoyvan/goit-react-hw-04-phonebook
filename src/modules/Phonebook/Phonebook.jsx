import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './Phonebook.module.css';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const checkName = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (checkName) {
      alert(`${contact.name} has already added in contacts`);
      return;
    }

    setContacts(prevContacts => {
      contact = {
        id: nanoid(),
        name: contact.name,
        number: contact.number,
      };
      return [...prevContacts, contact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = search => {
    setFilter(search);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {!Boolean(contacts.length) && (
        <p className={css.notification}>
          There are no contacts in the phonebook
        </p>
      )}
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default Phonebook;
