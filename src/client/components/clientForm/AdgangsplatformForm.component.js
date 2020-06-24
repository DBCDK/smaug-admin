import React from 'react';
import {useState, useEffect} from 'react';

export default function AdgangsplatformForm(props) {
  const {updateJEditor, toggleJson, jsonConfig, jsonEditState} = props;

  const isJSON = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const checkForUses = type => {
    let retvar = false;
    if (Array.isArray(jsonConfig.uses)) {
      retvar = jsonConfig.uses.filter(t => t === type).length > 0;
    }
    return retvar;
  };
  const checkForAttributes = type => {
    return jsonConfig.attributes
      ? Object.keys(jsonConfig.attributes).filter(t => t === type).length > 0
      : false;
  };
  const checkForIdProviders = type => {
    let retvar = false;
    if (Array.isArray(jsonConfig.identityProviders)) {
      retvar = jsonConfig.identityProviders.filter(t => t === type).length > 0;
    }
    return retvar;
  };
  const checkForSignOut = () => {
    if (jsonConfig.logoutScreen) {
      return jsonConfig.logoutScreen !== ('skip' || false);
    }
  };

  const [openPlatform, setOpenplatform] = useState(
    checkForUses('OpenPlatform')
  );
  const [bib, setBib] = useState(checkForUses('Login.bib.dk'));
  const [userCPR, setUserCPR] = useState(checkForAttributes('cpr'));
  const [userID, setUserID] = useState(checkForAttributes('userId'));
  const [uniqueID, setUniqueID] = useState(checkForAttributes('uniqueId'));
  const [libraries, setLibraries] = useState(checkForAttributes('libraries'));
  const [muniNo, setMuniNo] = useState(
    checkForAttributes('municipalityAgencyId')
  );
  const [borchk, setBorchk] = useState(checkForIdProviders('borchk'));
  const [nemLogin, setNemLogin] = useState(checkForIdProviders('nemlogin'));
  const [uniLogin, setUniLogin] = useState(checkForIdProviders('unilogin'));
  const [showSignOut, setShowSignOut] = useState(checkForSignOut());

  const getSignOutPath = () => {
    return jsonConfig.singleLogoutPath ? jsonConfig.singleLogoutPath : '';
  };
  const getAgencyId = () => {
    return jsonConfig.agencyId ? jsonConfig.agencyId : '';
  };
  const getLogo = () => {
    return jsonConfig.logoColor ? jsonConfig.logoColor : '';
  };
  const getDisplayName = () => {
    return jsonConfig.displayName ? jsonConfig.displayName : '';
  };
  const getredirectUris = () => {
    let incomingURIs = isJSON(jsonConfig.redirectUris)
      ? jsonConfig.redirectUris
      : JSON.stringify(jsonConfig.redirectUris, null, 2);
    return incomingURIs;
  };

  const [agencyId, setAgencyId] = useState(getAgencyId());
  const [logoColor, setLogoColor] = useState(getLogo());
  const [displayName, setDisplayName] = useState(getDisplayName());
  const [singleSignoutPath, setSingleSignoutPath] = useState(getSignOutPath());
  const [redirectUris, setRedirectUris] = useState(getredirectUris());

  const getUses = () => {
    let arr = [];
    bib ? arr.push('Login.bib.dk') : arr.filter(e => e === 'Login.bib.dk');
    openPlatform
      ? arr.push('OpenPlatform')
      : arr.filter(e => e === 'OpenPlatform');
    return arr;
  };
  const getAttributes = () => {
    let attObj = {...jsonConfig.attributes};
    userCPR ? (attObj['cpr'] = {}) : delete attObj.cpr;
    userID ? (attObj['userId'] = {}) : delete attObj.userId;
    uniqueID ? (attObj['uniqueId'] = {}) : delete attObj.uniqueId;
    libraries ? (attObj['libraries'] = {}) : delete attObj.libraries;
    muniNo ? (attObj['MuniNo'] = {}) : delete attObj.MuniNo;
    return attObj;
  };
  const getIdProviders = () => {
    let arr = [];
    borchk ? arr.push('borchk') : arr.filter(e => e === 'borchk');
    nemLogin ? arr.push('nemlogin') : arr.filter(e => e === 'nemlogin');
    uniLogin ? arr.push('unilogin') : arr.filter(e => e === 'unilogin');
    return arr;
  };

  const formatAndSetRedirectUris = json => {
    let formattedJson = isJSON(json) ? JSON.parse(json) : json;
    setRedirectUris(formattedJson);
  };

  const saveTextToJSON = (e, fn) => {
    let jsonOUT = {...props.jsonConfig};
    fn(e.target.value);
    jsonOUT[e.target.id] = e.target.value;
    // clean up
    if (!e.target.value) {
      delete jsonOUT[e.target.id];
    }
    if (e.target.id === 'redirectUris') {
      jsonOUT[e.target.id] = isJSON(e.target.value)
        ? JSON.parse(e.target.value)
        : e.target.value;
    }
    // send
    updateJEditor(jsonOUT);
  };

  const getEditJsonBtnTitle = () => {
    return jsonEditState
      ? 'Hide JSON formatting'
      : 'Edit configuration in JSON format';
  };

  useEffect(() => {
    let jsonOUT = jsonConfig;
    jsonOUT['attributes'] = getAttributes();
    jsonOUT['uses'] = getUses();
    jsonOUT['identityProviders'] = getIdProviders();
    jsonOUT['logoutScreen'] = showSignOut;

    // clean up
    if (jsonOUT.uses.length < 1) {
      delete jsonOUT.uses;
    }
    if (jsonOUT.identityProviders.length < 1) {
      delete jsonOUT.identityProviders;
    }
    if (Object.keys(jsonOUT.attributes).length < 1) {
      delete jsonOUT.attributes;
    }
    // send
    updateJEditor(jsonOUT);
  }, [
    openPlatform,
    bib,
    userCPR,
    userID,
    uniqueID,
    libraries,
    muniNo,
    borchk,
    nemLogin,
    uniLogin,
    showSignOut
  ]);

  return (
    <div className="adgangsForm-line">
      <span className="adgangsForm-title-top">
        <div className="adgangsForm-title">
          <label>Services</label>
        </div>
        <div className="adgangsForm-toggle" onClick={toggleJson}>
          {getEditJsonBtnTitle()}
        </div>
      </span>
      <div className="adgangsForm">
        <div className="adgangsForm-choosePlatform-container" id="uses">
          <div className="input-label">Use client for selected services</div>
          <span className="openPlatform input-label">
            <input
              id="openPlatform"
              type="checkbox"
              checked={openPlatform}
              onChange={() => setOpenplatform(!openPlatform)}
            />
            <input-label className="input-label">OpenPlatform</input-label>
          </span>
          <span className="bib input-label">
            <input
              id="bib"
              type="checkbox"
              checked={bib}
              onChange={() => setBib(!bib)}
            />
            <input-label>Login.bib.dk</input-label>
          </span>
        </div>
        {bib && !jsonEditState && (
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
                defaultValue={agencyId}
                placeholder="Type library no of agency"
                onChange={e => saveTextToJSON(e, setAgencyId)}
                required="required"
              />
              <div className="input-label">Logo color</div>
              <input
                id="logoColor"
                type="text"
                defaultValue={logoColor}
                placeholder="Type color as HEX value"
                onChange={e => saveTextToJSON(e, setLogoColor)}
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
                    checked={userCPR}
                    onChange={() => setUserCPR(!userCPR)}
                  />
                  <input-label>User CPR</input-label>
                </span>
                <span className="userID">
                  <input
                    id="userID"
                    type="checkbox"
                    checked={userID}
                    onChange={() => setUserID(!userID)}
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
                    checked={uniqueID}
                    onChange={() => setUniqueID(!uniqueID)}
                  />
                  <input-label>Unique ID (from CULR)</input-label>
                </span>
                <span className="libraries">
                  <input
                    id="libraries"
                    type="checkbox"
                    checked={libraries}
                    onChange={() => setLibraries(!libraries)}
                  />
                  <input-label>Libraries</input-label>
                </span>
                <span className="muniNo">
                  <input
                    id="muniNo"
                    type="checkbox"
                    checked={muniNo}
                    onChange={() => setMuniNo(!muniNo)}
                  />
                  <input-label>Municipality no</input-label>
                </span>
              </div>
              <div className="input-label">Display name</div>
              <input
                id="displayName"
                type="text"
                defaultValue={displayName}
                placeholder="Type name to display to user"
                onChange={e => saveTextToJSON(e, setDisplayName)}
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
                    checked={borchk}
                    onChange={() => setBorchk(!borchk)}
                  />
                  <input-label>Borchk</input-label>
                </span>
                <span>
                  <input
                    id="nemlogin"
                    type="checkbox"
                    checked={nemLogin}
                    onChange={() => setNemLogin(!nemLogin)}
                  />
                  <input-label>NemLogin</input-label>
                </span>
                <span>
                  <input
                    id="unilogin"
                    type="checkbox"
                    checked={uniLogin}
                    onChange={() => setUniLogin(!uniLogin)}
                  />
                  <input-label>UniLogin</input-label>
                </span>
              </div>

              {/* Sign out screen  */}
              <div
                className="adgangsForm-checkbox-section input-label"
                id="logoutScreen"
              >
                Sign out screen
                <span>
                  <input
                    id="showSignOut"
                    type="checkbox"
                    checked={!!showSignOut}
                    onChange={() => setShowSignOut(!showSignOut)}
                  />
                  <input-label>
                    {' '}
                    Show sign out screen to user, when signing out
                  </input-label>
                </span>
              </div>

              <div className="input-label"> Single sign out path</div>
              <input
                id="singleLogoutPath"
                type="text"
                defaultValue={singleSignoutPath}
                placeholder="Type URL to redirect to, when user signs out"
                onChange={e => saveTextToJSON(e, setSingleSignoutPath)}
              />

              <div className="input-label">Redirect URIs</div>
              <textarea
                id="redirectUris"
                defaultValue={redirectUris}
                placeholder=" Type allowed URLs which the user can be redirected to, when signing out"
                onChange={e => saveTextToJSON(e, formatAndSetRedirectUris)}
                required="required"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
