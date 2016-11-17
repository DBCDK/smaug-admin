import React from 'react';


function clientListElement({id, name}) {
  return (
    <div>
      <a href={`/client/${id}`} className="client-list-element">
        <div className="id">{id}</div>
        <div className="name">{name}</div>
      </a>
      <form action={`/remove/${id}`} method="post">
        <input type="submit" value="delete"/>
      </form>
    </div>

  );
}

export default function ClientList ({list = []}) {
  return (
    <div className="client-list">
      {list.map(clientListElement)}
    </div>
  );
}
