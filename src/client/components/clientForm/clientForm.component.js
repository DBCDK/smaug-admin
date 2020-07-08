import React, {useState} from 'react';
import JEditor from '../jsonEditor/jsonEditor.component';
import Contacts from '../contact/contactContainer.component';
import AdgangsplatformForm from './AdgangsplatformForm.component';
import ClientEnableSwitch from '../switch/clientEnableSwitch.component';
import AutoSuggester from '../suggester/suggester.component';

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
  hasError,
  enabled
}) {
  const [jsonConfig, setJsonConfig] = useState(config);
  const [showJson, setShowJson] = useState(false);

  const updateJEditor = config => {
    setJsonConfig({...config});
  };

  const toggleJson = () => {
    if (showJson && hasError) {
      alert('Fix JSON errors before proceeding');
    } else {
      setShowJson(!showJson);
    }
  };

  const remove = e => {
    const confirmed = confirm(`Are you sure you want to delete:\n${name}?`); // eslint-disable-line no-alert
    if (!confirmed) {
      e.preventDefault();
    }
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
            data-cy="name-input"
          />
        </div>
        <div className="element">
          <label htmlFor="label">Label</label>
          <AutoSuggester
            name="label"
            className="label-suggester"
            value={jsonConfig.label || ''}
            onChange={(e, {newValue}) => {
              updateJEditor({...jsonConfig, label: newValue});
            }}
            placeholder="label for service client"
          />
        </div>
        <div className="element">
          <label>Contacts</label>
          <Contacts contacts={contact} />
        </div>
        <div className="element">
          <label>Enabled</label>
          <div>
            <ClientEnableSwitch
              name={name}
              id={id}
              initEnabled={enabled}
              immediateUpdate={false}
            />
          </div>
        </div>
        <hr />
        <div className="element">
          <div className="flex-row-space-between">
            <h3>Services</h3>
            <div onClick={toggleJson} className="adgangsForm-toggle">
              {showJson
                ? 'Hide JSON formatting'
                : 'Edit configuration in JSON format'}
            </div>
          </div>

          <div>
            {!showJson && (
              <AdgangsplatformForm
                jsonConfig={jsonConfig}
                updateJEditor={updateJEditor}
                jsonEditState={showJson}
              />
            )}
            {showJson && (
              <JEditor
                name="config"
                json={jsonConfig}
                setErrorState={setErrorState}
                onChange={json => setJsonConfig({...json})}
              />
            )}
            <input
              type="hidden"
              name="config"
              id="config"
              value={JSON.stringify(jsonConfig)}
            />
          </div>
        </div>
        <hr />
        <div className="element submit updateclient">
          <input type="submit" value="Save Client" />
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
