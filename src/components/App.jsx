import { React, Component } from 'react';

import { ContactsList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from './Container/Container.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    try {
      const getData = JSON.parse(localStorage.getItem('contacts'));
      if (!getData) {
        return;
      } else {
        this.setState({ contacts: getData });
      }
    } catch (error) {
      return;
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  onFindChange = inputValue => {
    this.setState({ filter: inputValue });
  };

  addNewContact = newContact => {
    if (this.state.contacts.find(el => el.name === newContact.name)) {
      alert(`${newContact.name} has already exists`);
      return false;
    }
    this.setState(prevContacts => {
      return {
        contacts: [...prevContacts.contacts, newContact],
      };
    });
    return true;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const normalize = this.state.filter.toLowerCase().trim();
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().trim().includes(normalize);
    });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={css.container}>
        <ContactForm addNewContact={this.addNewContact} />

        {this.state.contacts.length ? (
          <>
            <Filter onFilterInput={this.onFindChange} />{' '}
            <ContactsList
              filteredContacts={filteredContacts}
              deleteContact={this.deleteContact}
            />
          </>
        ) : (
          <p>There are no contacts in your list</p>
        )}
      </div>
    );
  }
}
