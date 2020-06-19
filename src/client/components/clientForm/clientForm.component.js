import React, {useState} from 'react';
import JEditor from '../jsonEditor/jsonEditor.component';
import Contacts from '../contact/contactContainer.component';
import AdgangsplatformForm from './AdgangsplatformForm.component';

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
  const [jsonConfig, setJsonConfig] = useState(config);
  const [showJson, setShowJson] = useState(false);

  const updateJEditor = config => {
    setJsonConfig({...config});
  };

  const toggleJson = () => {
    setShowJson(!showJson);
  };

  const remove = e => {
    const confirmed = confirm(`Are you sure you want to delete:\n${name}?`); // eslint-disable-line no-alert
    if (!confirmed) {
      e.preventDefault();
    }
  };
  const showEditor = () => {
    return showJson ? 'jeditor-visible' : 'jeditor-hide';
  };

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
        <AdgangsplatformForm
          jsonConfig={jsonConfig}
          updateJEditor={updateJEditor}
          toggleJson={toggleJson}
        />
        <JEditor
          name="config"
          json={jsonConfig}
          setErrorState={setErrorState}
          isVisible={showEditor()}
        />
        <div className="element submit updateclient">
          <input type="submit" value="Save Client" disabled={hasErrors} />
        </div>
      </form>
      <form
        onSubmit={remove}
        action={'/remove/' + id}
        method="post"
        className="removeclient "
      >
        <input className="element deleteclient" type="submit" value="Delete" />
      </form>
    </div>
  );
}
