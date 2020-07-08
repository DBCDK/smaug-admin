import React from 'react';
import {get} from 'lodash';

/*
 * Get array at path
 * if its not of type array, return empty array
 */
const getArray = (obj, path) => {
  const res = get(obj, path);
  if (Array.isArray(res)) {
    return res;
  }
  return [];
};

/*
 * Toggle item en array
 */
const toggle = (arr, value) => {
  if (arr.includes(value)) {
    return arr.filter(el => el !== value);
  }
  return [...arr, value];
};

/*
 * Toggle entry in object
 * set value if key doesn't exist
 * remove entry if key exists
 */
const toggleInObject = (obj, key, value) => {
  obj = typeof obj === 'object' ? obj : {};

  if (obj[key]) {
    delete obj[key];
  } else {
    obj[key] = value;
  }

  if (Object.keys(obj).length === 0) {
    return null;
  }
  return obj;
};

/*
 * remove all entries in object
 * with falsy values
 */
const cleanUp = obj => {
  const copy = {...obj};
  Object.keys(obj).forEach(key => {
    if (!copy[key] || (Array.isArray(copy[key]) && copy[key].length === 0)) {
      delete copy[key];
    }
  });
  return copy;
};

export default function AdgangsplatformForm(props) {
  const {updateJEditor, jsonConfig, jsonEditState} = props;

  /*
   * clean up and notify parent
   */
  const update = obj => {
    const cleaned = cleanUp(obj);
    updateJEditor(cleaned);
  };

  return (
    <div>
      <div className="adgangsForm">
        <div className="adgangsForm-choosePlatform-container" id="uses">
          <div className="input-label">Use client for selected services</div>
          <span className="openPlatform input-label">
            <input
              id="openPlatform"
              type="checkbox"
              checked={getArray(jsonConfig, 'uses').includes('OpenPlatform')}
              onChange={e =>
                update({
                  ...jsonConfig,
                  uses: toggle(getArray(jsonConfig, 'uses'), 'OpenPlatform')
                })
              }
            />
            <input-label className="input-label">OpenPlatform</input-label>
          </span>
          <span className="bib input-label">
            <input
              id="bib"
              type="checkbox"
              checked={getArray(jsonConfig, 'uses').includes('Login.bib.dk')}
              onChange={e => {
                const json = {
                  ...jsonConfig,
                  uses: toggle(getArray(jsonConfig, 'uses'), 'Login.bib.dk')
                };
                if (!getArray(json, 'uses').includes('Login.bib.dk')) {
                  // we gotta clean up stuff related to login.bib.dk
                  [
                    'agencyId',
                    'logoColor',
                    'attributes',
                    'displayName',
                    'identityProviders',
                    'singleSignoutPath',
                    'redirectUris'
                  ].forEach(key => {
                    delete json[key];
                  });
                }
                update(json);
              }}
            />
            <input-label>Login.bib.dk</input-label>
          </span>
        </div>
        {getArray(jsonConfig, 'uses').includes('Login.bib.dk') &&
          !jsonEditState && (
            <div className="adgangsForm-formSection">
              <div className="adgangsForm-title-top">
                <div className="adgangsForm-title">
                  <label>Configure login.bib.dk</label>
                </div>
              </div>

              <div className="adgangsForm-formBg">
                <div className="adgangsForm-checkbox-section" id="grants">
                  <div className="input-label">Grant types</div>
                  {[
                    {label: 'Authorization code', key: 'authorization_code'},
                    {label: 'Password', key: 'password'},
                    {label: 'CAS', key: 'cas'}
                  ].map(({label, key}) => (
                    <span key={key}>
                      <input
                        type="checkbox"
                        checked={getArray(jsonConfig, 'grants').includes(key)}
                        onChange={e =>
                          update({
                            ...jsonConfig,
                            grants: toggle(getArray(jsonConfig, 'grants'), key)
                          })
                        }
                      />
                      <input-label>{label}</input-label>
                    </span>
                  ))}
                </div>

                <div className="input-label">Agency Id</div>
                <input
                  id="agencyId"
                  type="text"
                  defaultValue={jsonConfig.agencyId}
                  placeholder="Type library no of agency"
                  onChange={e =>
                    update({
                      ...jsonConfig,
                      agencyId: e.target.value
                    })
                  }
                  required="required"
                />
                <div className="input-label">Logo color</div>
                <input
                  className="colorpicker"
                  id="logoColor"
                  type="color"
                  defaultValue={jsonConfig.logoColor}
                  onChange={e =>
                    update({
                      ...jsonConfig,
                      logoColor: e.target.value
                    })
                  }
                />

                {/* User attributes at sign in */}
                <div className="adgangsForm-checkbox-section" id="attributes">
                  <div className="input-label">
                    User attributes to retrieve at sign in
                  </div>
                  {[
                    {label: 'CPR', key: 'cpr'},
                    {label: 'User ID (usually CPR)', key: 'userId'},
                    {label: 'Unique ID (CULR)', key: 'uniqueId'},
                    {
                      label: 'Libraries (libraries knowing the user)',
                      key: 'libraries'
                    },
                    {label: 'Unilogin ID', key: 'uniloginId'},
                    {label: 'Municipality NO (3 digit)', key: 'municipality'},
                    {
                      label: 'Municipality agency ID',
                      key: 'municipalityAgencyId'
                    },
                    {label: 'Birth date', key: 'birthDate'},
                    {label: 'Birth year', key: 'birthYear'},
                    {label: 'Gender', key: 'gender'},
                    {label: 'Authenticated token', key: 'authenticatedToken'}
                  ].map(({label, key}) => (
                    <span key={key}>
                      <input
                        type="checkbox"
                        checked={!!get(jsonConfig, `attributes.${key}`)}
                        onChange={() =>
                          update({
                            ...jsonConfig,
                            attributes: toggleInObject(
                              jsonConfig.attributes,
                              key,
                              {}
                            )
                          })
                        }
                      />
                      <input-label>{label}</input-label>
                    </span>
                  ))}
                </div>
                <div className="input-label">Display name</div>
                <input
                  id="displayName"
                  type="text"
                  defaultValue={jsonConfig.displayName}
                  placeholder="Type name to display to user"
                  onChange={e =>
                    update({
                      ...jsonConfig,
                      displayName: e.target.value
                    })
                  }
                  required="required"
                />

                {/* Identity providers  */}
                <div
                  className="adgangsForm-checkbox-section"
                  id="identityProviders"
                >
                  <div className="input-label">Identity providers</div>
                  {[
                    {label: 'Borchk', key: 'borchk'},
                    {label: 'Nemlogin', key: 'nemlogin'},
                    {label: 'Unilogin', key: 'unilogin'}
                  ].map(({label, key}) => (
                    <span key={key}>
                      <input
                        type="checkbox"
                        checked={getArray(
                          jsonConfig,
                          'identityProviders'
                        ).includes(key)}
                        onChange={e =>
                          update({
                            ...jsonConfig,
                            identityProviders: toggle(
                              getArray(jsonConfig, 'identityProviders'),
                              key
                            )
                          })
                        }
                      />
                      <input-label>{label}</input-label>
                    </span>
                  ))}
                </div>

                <div className="input-label">
                  Single logout path
                  <br />
                  <small>
                    Login.bib.dk will always use the host from the redirect_uri
                    provided at login, thus singleLogoutPath needs to be
                    relative to the root of the host
                  </small>
                </div>
                <input
                  id="singleLogoutPath"
                  type="text"
                  defaultValue={jsonConfig.singleLogoutPath || ''}
                  placeholder="Ex.: /single-logout"
                  onChange={e =>
                    update({
                      ...jsonConfig,
                      singleLogoutPath: e.target.value
                    })
                  }
                />

                <div className="input-label">Redirect URIs (one per line)</div>
                <textarea
                  id="redirectUris"
                  defaultValue={
                    Array.isArray(jsonConfig.redirectUris)
                      ? jsonConfig.redirectUris.join('\n')
                      : ''
                  }
                  placeholder=" Type allowed URLs which the user can be redirected to, when signing out"
                  onChange={e =>
                    update({
                      ...jsonConfig,
                      redirectUris: e.target.value && e.target.value.split('\n')
                    })
                  }
                  required="required"
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
