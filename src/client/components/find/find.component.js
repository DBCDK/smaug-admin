import React from 'react';
import {dot} from 'dot-object';
import Highlight from '../highlight/highlight.component';
import ClientEnableSwitch from '../switch/clientEnableSwitch.component';

const Hits = ({id, hits, search}) =>
  hits.map(hit => (
    <Highlight key={`${id}-${hit}`} highlight={search}>
      {hit}
    </Highlight>
  ));

const FindListElement = ({id, name, hits, search, enabled}) => (
  <div className="client" key={id}>
    <a href={`/client/${id}`} className="name">
      <Highlight highlight={search}>{name}</Highlight>
    </a>
    <a href={`/client/${id}`} className="hit">
      <Hits id={id} hits={hits} search={search} />
    </a>
    <div>
      <ClientEnableSwitch name={name} id={id} initEnabled={enabled} />
    </div>
  </div>
);

const FindListElements = ({list, search}) =>
  Object.entries(list).map(([key, {id, name, hits, enabled}]) => {
    return (
      <FindListElement
        key={key}
        id={id}
        name={name}
        hits={hits}
        search={search}
        enabled={enabled}
      />
    );
  });

const FindList = ({list, search}) => (
  <div className="find-list">
    <div className="find-clients clients" data-cy="searchResultTable">
      <div className="labels">
        <label className="label-name">
          <span>Name</span>
        </label>
        <label className="label-hits">
          <span>Hits</span>
        </label>
        <label className="label-enabled">
          <span>Enabled</span>
        </label>
      </div>
      <div className="elements">
        <FindListElements list={list} search={search} />
      </div>
    </div>
  </div>
);

const filteredItems = (lines, list) => {
  const foundItems = {};
  lines.forEach(str => {
    const regExtMatch = str.match(/^\[([0-9]+)\]\.(.*)/);
    const index = parseInt(regExtMatch[1], 10);
    const record = regExtMatch[2];
    if (!foundItems[index]) {
      foundItems[index] = {...list[index]};
    }
    if (Array.isArray(foundItems[index].hits)) {
      foundItems[index].hits.push(record);
    } else {
      foundItems[index].hits = [record];
    }
  });
  return foundItems;
};

const Find = ({searchString = '', list = []}) => {
  const clientDotConfigAsArray = Object.entries(dot(list)).map(
    ([key, value]) => `${key}:${value}`
  );
  const matching_lines = clientDotConfigAsArray.filter(lineInConfig =>
    lineInConfig.toLowerCase().includes(searchString.toLowerCase())
  );
  const foundItems = filteredItems(matching_lines, list);
  return (
    <div className="findform">
      <FindList list={foundItems} search={searchString} />
    </div>
  );
};

export default Find;
