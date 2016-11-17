import React from 'react';

export default function ContactRow({index, role, contact, removeContact}) {
  return (
    <div className="contact">
      <div className="element role">
        <label htmlFor="role">Role</label>
        <input name={`contact[${index}].role`} readOnly={role === 'owner' && true} type="text" defaultValue={role || ''}
               placeholder="Contact role" required="required"/>
      </div>
      <div className="element name">
        <label htmlFor="name">Name</label>
        <input name={`contact[${index}].name`} type="text" defaultValue={contact.name || ''}
               placeholder="Contact name" required="required"/>
      </div>
      <div className="element email">
        <label htmlFor="email">Email</label>
        <input name={`contact[${index}].email`} type="email" defaultValue={contact.email || ''}
               placeholder="Contact email" required="required"/>
      </div>
      <div className="element phone">
        <label htmlFor="phone">Phone</label>
        <input name={`contact[${index}].phone`} type="text" defaultValue={contact.phone || ''}
               placeholder="Contact phone" required="required"/>
      </div>
      {role !== 'owner' && <a href="#deleteContactRow" onClick={e => removeContact(e, index)}>Remove contact</a>}
    </div>
  );
}
