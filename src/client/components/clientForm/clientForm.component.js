import React from 'react';
import JEditor from '../jsonEditor/jsonEditor.component';
import Contacts from '../contact/contactContainer.component';

function ClientSecret({secret}) {
  return (
    <div className="element secret">
      <label htmlFor="name">Client Secret</label>
      <div className="value">{secret}</div>
      <div className="notice">NB! Secret will not be shown again</div>
    </div>
  );
}

function ClientID({id}) {
  return (
    <div className="element id">
      <label htmlFor="name">Client ID</label>
      <div className="value">{id}</div>
    </div>
  );
}

export default function ClientForm({
  id,
  secret,
  name = '',
  contact = null,
  config = {},
  onSubmit,
  setErrorState,
  hasErrors
}) {
  return (
    <div className="clientform">
      <form method="post" onSubmit={onSubmit}>
        {(id && ClientID({id})) || ''}
        {(secret && ClientSecret({secret})) || ''}
        <div className="element name">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={name}
            placeholder="the name of the service client"
            required="required"
          />
        </div>
        <label>Contacts</label>
        <Contacts contacts={contact} />
        <JEditor name="config" json={config} setErrorState={setErrorState} />
        <div className="element submit">
          <input type="submit" value="Save Client" disabled={hasErrors} />
        </div>
      </form>
    </div>
  );
}
