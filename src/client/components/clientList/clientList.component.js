import React from 'react';


function clientListElement({id, name}) {
  return (
    <a href={`/client/${id}`} className="client-list-element">
        <div className="id">{id}</div>
        <div className="name">{name}</div>
    </a>
  );
}

export default function clientList ({list = []}) {
  return (
    <div className="client-list">
      {list.map(clientListElement)}
    </div>
  );
}
