import React from 'react';
import Token from '../token/tokenContainer.component';
import ClientEnableSwitch from '../switch/clientEnableSwitch.component';

function clientListElement({id, name, contact, enabled}) {
  const submit = e => {
    const confirmed = confirm(`Are you sure you want to delete:\n${name}?`); // eslint-disable-line no-alert
    if (!confirmed) {
      e.preventDefault();
    }
  };
  return (
    <div className="client" key={id}>
      <a href={`/client/${id}`} className="name">
        {name}
      </a>
      <a href={`/client/${id}`} className="id">
        {id}
      </a>
      <a href={`/client/${id}`} className="owner">
        {(contact.owner && contact.owner.name) || ''}
      </a>
      <div>
        <ClientEnableSwitch id={id} initEnabled={enabled} name={name} />
      </div>
      <Token client={{id, name}} />
      <form onSubmit={submit} action={`/remove/${id}`} method="post">
        <input className="deleteclient" type="submit" value="delete" />
      </form>
    </div>
  );
}

function ClientList({list}) {
  return (
    <div className="clientlist">
      <div className="clients">
        <div className="labels">
          <label className="label-name">Name</label>
          <label className="label-id">ID</label>
          <label className="label-owner">Owner</label>
          <label className="label-owner">Enabled</label>
          <label className="label-owner">token</label>
          <label className="label-owner">Delete</label>
        </div>
        <div className="elements">{list.map(clientListElement)}</div>
      </div>
      <a className="createclient" href="/add">
        + Create a new client
      </a>
    </div>
  );
}

function ClientListError({error}) {
  return <div className="clientlist error">{error}</div>;
}

function ClientListEmpty() {
  return (
    <div className="clientlist empty">
      <p>No clients created yet.</p>
      <a className="createclient" href="/add">
        + Create a new client
      </a>
    </div>
  );
}

export default function ClientListContainer({error, list = []}) {
  if (error) {
    return ClientListError({error});
  } else if (list.length === 0) {
    return ClientListEmpty();
  }

  return ClientList({list});
}
