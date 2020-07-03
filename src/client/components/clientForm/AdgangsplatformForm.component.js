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
                  <span className="userCPR">
                    <input
                      id="userCPR"
                      type="checkbox"
                      checked={!!get(jsonConfig, 'attributes.userCpr')}
                      onChange={() =>
                        update({
                          ...jsonConfig,
                          attributes: toggleInObject(
                            jsonConfig.attributes,
                            'userCpr',
                            {}
                          )
                        })
                      }
                    />
                    <input-label>User CPR</input-label>
                  </span>
                  <span className="userID">
                    <input
                      id="userID"
                      type="checkbox"
                      checked={!!get(jsonConfig, 'attributes.userID')}
                      onChange={() =>
                        update({
                          ...jsonConfig,
                          attributes: toggleInObject(
                            jsonConfig.attributes,
                            'userID',
                            {}
                          )
                        })
                      }
                    />
                    <input-label>
                      User ID (retrieved from the library, which is selected at
                      sign in)
                    </input-label>
                  </span>
                  <span className="uniqueID">
                    <input
                      id="uniqueID"
                      type="checkbox"
                      checked={!!get(jsonConfig, 'attributes.uniqueId')}
                      onChange={() =>
                        update({
                          ...jsonConfig,
                          attributes: toggleInObject(
                            jsonConfig.attributes,
                            'uniqueId',
                            {}
                          )
                        })
                      }
                    />
                    <input-label>Unique ID (from CULR)</input-label>
                  </span>
                  <span className="libraries">
                    <input
                      id="libraries"
                      type="checkbox"
                      checked={!!get(jsonConfig, 'attributes.libraries')}
                      onChange={() =>
                        update({
                          ...jsonConfig,
                          attributes: toggleInObject(
                            jsonConfig.attributes,
                            'libraries',
                            {}
                          )
                        })
                      }
                    />
                    <input-label>Libraries</input-label>
                  </span>
                  <span className="muniNo">
                    <input
                      id="muniNo"
                      type="checkbox"
                      checked={
                        !!get(jsonConfig, 'attributes.municipalityAgencyId')
                      }
                      onChange={() =>
                        update({
                          ...jsonConfig,
                          attributes: toggleInObject(
                            jsonConfig.attributes,
                            'municipalityAgencyId',
                            {}
                          )
                        })
                      }
                    />
                    <input-label>Municipality no</input-label>
                  </span>
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
                  <span>
                    <input
                      id="borchk"
                      type="checkbox"
                      checked={getArray(
                        jsonConfig,
                        'identityProviders'
                      ).includes('borchk')}
                      onChange={e =>
                        update({
                          ...jsonConfig,
                          identityProviders: toggle(
                            getArray(jsonConfig, 'identityProviders'),
                            'borchk'
                          )
                        })
                      }
                    />
                    <input-label>Borchk</input-label>
                  </span>
                  <span>
                    <input
                      id="nemlogin"
                      type="checkbox"
                      checked={getArray(
                        jsonConfig,
                        'identityProviders'
                      ).includes('nemlogin')}
                      onChange={e =>
                        update({
                          ...jsonConfig,
                          identityProviders: toggle(
                            getArray(jsonConfig, 'identityProviders'),
                            'nemlogin'
                          )
                        })
                      }
                    />
                    <input-label>NemLogin</input-label>
                  </span>
                  <span>
                    <input
                      id="unilogin"
                      type="checkbox"
                      checked={getArray(
                        jsonConfig,
                        'identityProviders'
                      ).includes('unilogin')}
                      onChange={e =>
                        update({
                          ...jsonConfig,
                          identityProviders: toggle(
                            getArray(jsonConfig, 'identityProviders'),
                            'unilogin'
                          )
                        })
                      }
                    />
                    <input-label>UniLogin</input-label>
                  </span>
                </div>

                <div className="input-label"> Single sign out path</div>
                <input
                  id="singleLogoutPath"
                  type="text"
                  defaultValue={jsonConfig.singleSignoutPath || ''}
                  placeholder="Type URL to redirect to, when user signs out"
                  onChange={e =>
                    update({
                      ...jsonConfig,
                      singleSignoutPath: e.target.value
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
