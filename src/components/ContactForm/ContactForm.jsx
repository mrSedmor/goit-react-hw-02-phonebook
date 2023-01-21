import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './contact-form.module.css';
import sharedCss from 'shared.module.css';
import getNextId from 'utils/getNextId';

export default class ContactForm extends Component {
  static INITIAL_FORM_STATE = {
    name: '',
    number: '',
  };

  state = { ...ContactForm.INITIAL_FORM_STATE };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  resetForm() {
    this.setState({ ...ContactForm.INITIAL_FORM_STATE });
  }

  handleAddContact = event => {
    event.preventDefault();
    this.props.onAddContact({ ...this.state });

    this.resetForm();
  };

  nameId = getNextId();
  numberId = getNextId();

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleAddContact}>
        <div className={css.wrapper}>
          <label htmlFor={this.nameId} className={css.label}>
            Name
          </label>
          <input
            id={this.nameId}
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Rosie Simpson"
            required
            onChange={this.handleChange}
            value={name}
          />

          <label htmlFor={this.numberId} className={css.label}>
            Number
          </label>
          <input
            id={this.numberId}
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="459-12-56"
            onChange={this.handleChange}
            value={number}
          />
        </div>

        <button className={sharedCss.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
