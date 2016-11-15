import React from 'react';
import JEditor from '../jsonEditor/jsonEditor.component';

function ContactRow({index, role, contact, remove}) {
  return (
    <div className="contact">
      <div className="element role">
        <label htmlFor="role">Role</label>
        <input name={`contact[${index}].role`} readOnly={role === 'owner' && true} type="text" defaultValue={role || ''} placeholder="Contact role"/>
      </div>
      <div className="element name">
        <label htmlFor="name">Name</label>
        <input name={`contact[${index}].name`} type="text" defaultValue={contact.name || ''}
               placeholder="Contact name"/>
      </div>
      <div className="element email">
        <label htmlFor="email">Email</label>
        <input name={`contact[${index}].email`} type="email" defaultValue={contact.email || ''}
               placeholder="Contact email"/>
      </div>
      <div className="element phone">
        <label htmlFor="phone">Phone</label>
        <input name={`contact[${index}].phone`} type="text" defaultValue={contact.phone || ''}
               placeholder="Contact phone"/>
      </div>
      {role !== 'owner' && <a href="#deleteContactRow" onClick={e => remove(e, index)}>Remove contact</a>}
    </div>
  );
}

export default class client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: JSON.stringify(props.config || {}),
      contacts: this.parseContacts(props.contact || {}),
    }
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
    });
  }

  onSubmit(e) {
    if (this.hasError) {
      e.preventDefault();
      alert('The config JSON is not valid');
    }

  }

  setConfig(config) {
    try {
      JSON.parse(config);
      this.hasError = false;
    }
    catch (e) {
      this.hasError = true;
    }
    this.setState({config});
  }

  addContact(e) {
    e.preventDefault();
    this.setState({contacts: this.state.contacts.concat([{role: '', contact: ''}])})
  }

  removeContact(e, index) {
    console.log(index, this.state.contacts[index]);
    e.preventDefault();
    this.setState({contacts: this.state.contacts.filter((c, i) => i !== index)})
  }

  render() {
    console.log(this.state.contact);
    return (
      <div className="client">
        <form method="post" onSubmit={e => this.onSubmit(e)}>
          <div className="element name">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" defaultValue={this.props.name} placeholder="the name of the service client"/>
          </div>
          <input type="hidden" name="config" id="config" value={this.state.config}/>
          <JEditor json={this.props.config} onChange={(config) => this.setConfig(config)}/>
          <h2>Contacts</h2>
          {this.state.contacts.map((contact, i) => <ContactRow key={contact.role + i} index={i} {...contact} remove={this.removeContact.bind(this)} />)}
          <a href="#addContact" onClick={e => this.addContact(e)}>Add Contact</a>
          <div className="element submit">
            {!this.hasError && <input type="submit" value="Submit"/> || ''}
          </div>
        </form>
      </div>
    );
  }
}
