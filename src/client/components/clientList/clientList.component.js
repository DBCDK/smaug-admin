import React, {useState} from 'react';
import _, {orderBy} from 'lodash';
import sortByKeys from '../../../utils/sortByKeys';
import Token from '../token/tokenContainer.component';

const ClientListElement = ({data}) => {
  const {id, name, contact, config} = data;

  const submit = e => {
    const confirmed = confirm(`Are you sure you want to delete:\n${name}?`); // eslint-disable-line no-alert
    if (!confirmed) {
      e.preventDefault();
    }
  };

  let label = config.label || '';
  if (label === 'zzz') {
    label = null;
  }

  return (
    <div className="client" key={id}>
      <span href={`/client/${id}`} className="label">
        {label && <a href={`/find/${label}`}>{label}</a>}
      </span>
      <a href={`/client/${id}`} className="name">
        {name}
      </a>
      <a href={`/client/${id}`} className="id">
        {id}
      </a>
      <a href={`/client/${id}`} className="owner">
        {(contact.owner && contact.owner.name) || ''}
      </a>

      <Token client={{id, name}} />
    </div>
  );
};

const Group = ({name, group, i}) => {
  const [collapsed, setCollapsed] = useState(false);
  const collapsedClass = collapsed ? 'collapsed' : '';
  const label = name === 'zzz' ? 'Labelless' : name;

  return (
    <div className="elements-group">
      <div className="group-name" onClick={() => setCollapsed(!collapsed)}>
        <div>
          {collapsed ? <span>▼</span> : <span>▲</span>}
          <h2>{label}</h2>
        </div>
      </div>
      <div className={`group-clients-wrap ${collapsedClass}`}>
        {group.map(c => (
          <ClientListElement key={c.id} data={c} />
        ))}
      </div>
    </div>
  );
};

function ClientList({list}) {
  const [sort, setSort] = useState('name');

  // Map to groups
  const unsorted_groups = _.groupBy(
    list.map(c => ({
      ...c,
      config: {...c.config, label: c.config.label || 'zzz'}
    })),
    'config.label'
  );

  // Sort groups alphabetical
  const groups = sortByKeys(unsorted_groups);

  return (
    <div className="clientlist">
      <div className="clients">
        <div className="labels">
          <label className="label-label" onClick={() => setSort('label')}>
            <span>Label {sort === 'label' && <span>↓</span>}</span>
          </label>
          <label className="label-name" onClick={() => setSort('name')}>
            <span>Name {sort === 'name' && <span>↓</span>}</span>
          </label>
          <label className="label-id" onClick={() => setSort('id')}>
            <span>ID {sort === 'id' && <span>↓</span>}</span>
          </label>
          <label
            className="label-owner"
            onClick={() => setSort('contact.owner.name')}
          >
            <span>Owner {sort === 'contact.owner.name' && <span>↓</span>}</span>
          </label>
          <label className="label-owner">token</label>
        </div>

        {sort === 'label'
          ? Object.values(groups).map((g, i) => {
              return (
                <Group
                  key={Object.keys(groups)[i]}
                  name={Object.keys(groups)[i]}
                  group={g}
                  index={i}
                />
              );
            })
          : orderBy(list, [sort], ['asc']).map(c => (
              <ClientListElement key={c.id} data={c} />
            ))}
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
