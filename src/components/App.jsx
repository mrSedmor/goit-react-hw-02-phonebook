import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactFrom, Filter, ContactList } from 'components';
import css from './app.module.css';
import initialContacts from 'data/contacts.json';

function sortContacts(contacts) {
  const collator = new Intl.Collator('en', { sensitivity: 'base' }).compare;
  contacts.sort(({ name: a }, { name: b }) => collator(a, b));
  return contacts;
}

export default class App extends Component {
  state = {
    contacts: sortContacts(initialContacts),
    filter: '',
  };

  handleFilter = filter => {
    this.setState({ filter });
  };

  handleAddContact = contact => {
    const { contacts } = this.state;
    const normalizedName = contact.name.toLocaleUpperCase();
    // Чому це тут, див. коментар нижче
    if (
      contacts.find(({ name }) => name.toLocaleUpperCase() === normalizedName)
    ) {
      Notify.warning(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => {
      // Новий стан залежить від попереднього.
      // Повідоблення про наявність дублікатів формально треба вивидити тут,
      // але тоді чомусь повідомлення виводиться двічі
      // Перевірку на дублікати залишаю
      if (
        contacts.find(({ name }) => name.toLocaleUpperCase() === normalizedName)
      ) {
        return {};
      }

      const id = nanoid(8);

      let updatedContacts = sortContacts([{ id, ...contact }, ...contacts]);

      return { contacts: updatedContacts };
    });
  };

  handleDeleteContact = id => {
    this.setState(({ contacts }) => {
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: updatedContacts };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.trim().toLocaleUpperCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLocaleUpperCase().includes(normalizedFilter)
    );

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactFrom onAddContact={this.handleAddContact} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />

        <ContactList
          contacts={filteredContacts}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}
