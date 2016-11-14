import React from 'react';
import JEditor from '../jsonEditor/jsonEditor.component';
import './client.css';

export default function client({id, name, config}) {
  return (
    <div className="client">
      <form method="post">
        <div className="element name">
          <label htmlFor="name">Name</label>
          <input name="name" type="text" defaultValue={name} placeholder="the name of the service client"/>
        </div>
        <div className="element config">
          <label htmlFor="config">config</label>
          <div className="description">JSON object with service client specific configurations</div>
          <textarea name="config" id="config" cols="30" rows="10">{JSON.stringify(config)}</textarea>
        </div>
        <JEditor json={config}/>
        <div className="element submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  );
}
