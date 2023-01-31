import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    const { contacts } = this.state;
    const checkName = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    contact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    this.setState(prevState => {
      if (checkName) {
        alert(`${contact.name} has already added in contacts`);
        return { contacts: [...prevState.contacts] };
      }
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={css.section}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        {!Boolean(contacts.length) && (
          <p className={css.notification}>
            There are no contacts in the phonebook
          </p>
        )}
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
