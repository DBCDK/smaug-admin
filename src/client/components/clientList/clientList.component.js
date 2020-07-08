import React, {useState, useEffect} from 'react';
import _, {orderBy, get} from 'lodash';
import request from 'superagent';
import sortByKeys from '../../../utils/sortByKeys';
import Token from '../token/tokenContainer.component';
import ClientEnableSwitch from '../switch/clientEnableSwitch.component';

const COLUMNS = {
  label: {displayName: 'Label', path: 'label', paramName: 'label'},
  name: {displayName: 'Name', path: 'name', paramName: 'name'},
  owner: {displayName: 'Owner', path: 'owner', paramName: 'owner'},
  enabled: {displayName: 'Enabled', path: 'enabled', paramName: 'enabled'},
  token: {displayName: 'Token', path: 'token', paramName: 'token'},
  last30Login: {
    displayName: '/login',
    path: 'stats./login.last30',
    paramName: 'last30Login',
    type: 'stats'
  },
  last30Work: {
    displayName: '/work',
    path: 'stats.work.last30',
    paramName: 'last30Work',
    type: 'stats'
  },
  last30Suggest: {
    displayName: '/suggest',
    path: 'stats.suggest.last30',
    paramName: 'last30Suggest',
    type: 'stats'
  },
  last30Search: {
    displayName: '/search',
    path: 'stats.search.last30',
    paramName: 'last30Search',
    type: 'stats'
  },
  last30Storage: {
    displayName: '/storage',
    path: 'stats.storage.last30',
    paramName: 'last30Storage',
    type: 'stats'
  },
  last30User: {
    displayName: '/user',
    path: 'stats.user.last30',
    paramName: 'last30User',
    type: 'stats'
  },
  last30Order: {
    displayName: '/order',
    path: 'stats.order.last30',
    paramName: 'last30Order',
    type: 'stats'
  },
  last30Recommend: {
    displayName: '/recommend',
    path: 'stats.recommend.last30',
    paramName: 'last30Recommend',
    type: 'stats'
  }
};

const ClientListElement = ({data, columns}) => {
  const {id, name, contact, config, enabled} = data;

  let label = config.label || '';
  if (label === 'zzz') {
    label = null;
  }

  return (
    <div className="client" key={id} data-cy={`client-${name}`}>
      {columns.includes(COLUMNS.label) && (
        <span
          href={`/client/${id}`}
          className="label"
          data-cy={`label-${label}`}
        >
          {label && <a href={`/find/${label}`}>{label}</a>}
        </span>
      )}
      {columns.includes(COLUMNS.name) && (
        <a href={`/client/${id}`} className="name">
          {name}
        </a>
      )}
      {columns.includes(COLUMNS.owner) && (
        <a href={`/client/${id}`} className="owner">
          {(contact.owner && contact.owner.name) || ''}
        </a>
      )}

      {columns.includes(COLUMNS.enabled) && (
        <div>
          <ClientEnableSwitch id={id} initEnabled={enabled} name={name} />
        </div>
      )}
      {columns.includes(COLUMNS.token) && <Token client={{id, name}} />}
      {Object.values(COLUMNS)
        .filter(col => col.type === 'stats' && columns.includes(col))
        .map(col => (
          <span
            className="label stats-column"
            key={col.path}
            data-cy={`${col.displayName}-${get(data, col.path, 0)}`}
          >
            {get(data, col.path, 0)}
          </span>
        ))}
    </div>
  );
};

const Group = ({name, group, i, columns}) => {
  const [collapsed, setCollapsed] = useState(false);
  const collapsedClass = collapsed ? 'collapsed' : '';
  const label = name === 'zzz' ? 'Labelless' : name;

  return (
    <div className="elements-group" data-cy={`group-${label}`}>
      <div className="group-name" onClick={() => setCollapsed(!collapsed)}>
        <div>
          {collapsed ? <span>▼</span> : <span>▲</span>}
          <h2>{label}</h2>
        </div>
      </div>
      <div className={`group-clients-wrap ${collapsedClass}`}>
        {group.map(c => (
          <ClientListElement key={c.id} data={c} columns={columns} />
        ))}
      </div>
    </div>
  );
};

function ClientList({
  list,
  stats,
  columns,
  statsOpenplatform,
  isLoading,
  statsError
}) {
  const [sort, setSort] = useState('name');
  const [asc, setAsc] = useState(true);

  if (isLoading) {
    return <div>Indlæser</div>;
  }
  if (statsError) {
    return <div>Kunne ikke hente stats</div>;
  }

  const mergedWithStats = list.map(el => ({
    ...el,
    stats: {
      ...((stats && stats[el.id]) || {}),
      ...((statsOpenplatform && statsOpenplatform[el.id]) || {})
    }
  }));

  const handleSort = name => {
    if (name === sort) {
      setAsc(!asc);
      return;
    }

    setSort(name);
    setAsc(true);
  };

  // Map to groups
  const unsorted_groups = _.groupBy(
    mergedWithStats.map(c => ({
      ...c,
      config: {...c.config, label: c.config.label || 'zzz'}
    })),
    'config.label'
  );

  // Sort groups alphabetical
  const groups = sortByKeys(unsorted_groups, asc);
  const arrow = asc ? '↓' : '↑';

  return (
    <div className="clientlist">
      {!stats && (
        <a className="createclient" href="/add">
          + Create a new client
        </a>
      )}
      <div className="clients">
        <div className="labels">
          {columns.includes(COLUMNS.label) && (
            <label
              className="label-label"
              onClick={() => handleSort('label')}
              data-cy="label-label"
            >
              <span>Label {sort === 'label' && <span>{arrow}</span>}</span>
            </label>
          )}
          {columns.includes(COLUMNS.name) && (
            <label className="label-name" onClick={() => handleSort('name')}>
              <span>Name {sort === 'name' && <span>{arrow}</span>}</span>
            </label>
          )}
          {columns.includes(COLUMNS.owner) && (
            <label
              className="label-owner"
              onClick={() => handleSort('contact.owner.name')}
            >
              <span>
                Owner {sort === 'contact.owner.name' && <span>{arrow}</span>}
              </span>
            </label>
          )}

          {columns.includes(COLUMNS.enabled) && (
            <label
              className="label-owner"
              onClick={() => handleSort('enabled')}
            >
              <span>Enabled {sort === 'enabled' && <span>{arrow}</span>}</span>
            </label>
          )}
          {columns.includes(COLUMNS.token) && (
            <label className="label-owner">token</label>
          )}
          {Object.values(COLUMNS)
            .filter(col => col.type === 'stats' && columns.includes(col))
            .map(col => (
              <label
                className="label-name stats-column"
                onClick={() => handleSort(col.path)}
                key={col.path}
              >
                <span>
                  {col.displayName}
                  {sort === col.path && <span>{arrow}</span>}
                </span>
              </label>
            ))}
        </div>

        {sort === 'label'
          ? Object.values(groups).map((g, i) => {
              return (
                <Group
                  key={Object.keys(groups)[i]}
                  name={Object.keys(groups)[i]}
                  group={g}
                  index={i}
                  columns={columns}
                />
              );
            })
          : orderBy(
              mergedWithStats,
              c => get(c, sort, 0),
              asc ? ['asc'] : ['desc']
            ).map(c => (
              <ClientListElement
                key={c.id}
                data={c}
                stats={stats && stats[c.id]}
                columns={columns}
              />
            ))}
      </div>
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

export default function ClientListContainer({error, list = [], showStats}) {
  const [stats, setStats] = useState({isLoading: true});

  useEffect(() => {
    if (showStats) {
      request
        .get('/api/stats')
        .then(res => {
          setStats(res.body);
        })
        .catch(error => {
          setStats({error});
        });
    }
  }, []);

  if (error) {
    return ClientListError({error});
  } else if (list.length === 0) {
    return ClientListEmpty();
  }

  const columns = showStats
    ? [
        COLUMNS.label,
        COLUMNS.name,
        ...Object.values(COLUMNS).filter(col => col.type === 'stats')
      ]
    : [
        COLUMNS.label,
        COLUMNS.name,
        COLUMNS.owner,
        COLUMNS.enabled,
        COLUMNS.token
      ];

  return ClientList({
    list,
    stats: stats.hejmdalStats,
    columns,
    statsOpenplatform: stats.openplatformStats,
    isLoading: showStats && stats.isLoading,
    statsError: stats.error
  });
}
