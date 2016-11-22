import React from 'react';
import Contact from './contact.component';

export default class ContactContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: this.parseContacts(props.contacts || {}),
    };
  }

  parseContacts(contacts) {
    if (Object.keys(contacts).length === 0) {
      contacts.owner = {};
    }
    return Object.keys(contacts).map((role) => {
      return {
        role,
        contact: contacts[role]
      }
    }).sort(contact => {
      return contact.role.toLowerCase() != "owner";
    });
  }

  addContact(e) {
    e.preventDefault();
    this.setState({contacts: this.state.contacts.concat([{role: '', contact: ''}])})
  }

  removeContact(e, index) {
    e.preventDefault();
    this.setState({contacts: this.state.contacts.filter((c, i) => i !== index)})
  }
  render() {
    return (
      <Contact contacts={this.state.contacts} addContact={e => this.addContact(e)} removeContact={(e, index) => this.removeContact(e, index)} />
    );
  }
}
