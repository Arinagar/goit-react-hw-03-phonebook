import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitForm = event => {
    event.preventDefault();

    const userData = {
      id: nanoid(10),
      name: this.state.name.trim().toLowerCase(),
      number: this.state.number,
    };
    const isSuccess = this.props.addNewContact(userData);
    if (isSuccess) {
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    return (
      <div className={css.form}>
        <form onSubmit={this.onSubmitForm}>
          <h2>Phonebook</h2>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, A"
              value={this.state.name}
              required
              onChange={this.onInputChange}
              className={css.input}
            />
          </label>
          <label>
            Telephone
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.onInputChange}
              className={css.input}
            />
          </label>
          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};
