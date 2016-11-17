import React from 'react';
import JEditor from '../jsonEditor/jsonEditor.component';
import Contacts from '../contact/contactContainer.component';

export default function ClientForm({name = '', contact = null, config  = {},  setErrorState, hasErrors}) {
  return (
    <div className="client">
      <form method="post" onSubmit={e => this.onSubmit(e)}>
        <div className="element name">
          <label htmlFor="name">Name</label>
          <input name="name" type="text" defaultValue={name} placeholder="the name of the service client" required="required"/>
        </div>
        <JEditor name="config" json={config} setErrorState={setErrorState}/>
        <h2>Contacts</h2>
        <Contacts contacts={contact}/>
        <div className="element submit">
          <input type="submit" value="Submit" disabled={hasErrors}/>
        </div>
      </form>
    </div>
  );
}
