import React from 'react';

export default function newClient({id, secret, name = ''}) {
  return (
    <div className="clientform">
      <div className="element name">
        <label htmlFor="name">Client Name</label>
        <div className="value">{name}</div>
      </div>
      <div className="element id">
        <label htmlFor="name">Client ID</label>
        <div className="value">{id}</div>
      </div>
      <div className="element secret">
        <label htmlFor="name">Client Secret</label>
        <div className="value">{secret}</div>
        <div className="notice">NB! Secret will not be shown again</div>
      </div>
      <a className="editclient btn" href={`/client/${id}`}>
        Edit Client
      </a>
      <a className="createclient btn" href="/add">
        Create another Client
      </a>
    </div>
  );
}
