import React from 'react';
import ContactRow from './contactRow.component';

export default function Contacts({contacts, removeContact, addContact}) {
  const contactRows = contacts.map((contact, index) => <ContactRow key={contact.role + index} {...contact} removeContact={removeContact} index={index} />);
  return (
    <div className="contact">
      {contactRows}
      <div className="element add">
        <a href="#addContact" onClick={addContact}><span className="icon add"/>Add Contact</a>
      </div>
    </div>
  );
}
