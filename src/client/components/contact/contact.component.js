import React from 'react';
import ContactRow from './contactRow.component';

export default function Contacts({contacts, removeContact, addContact}) {
  const contactRows = contacts.map((contact, index) => <ContactRow key={contact.role + index} {...contact} removeContact={removeContact} index={index} />);
  return (
    <div className="contacts">
      {contactRows}
      <a href="#addContact" onClick={addContact}>Add Contact</a>
    </div>
  );
}
