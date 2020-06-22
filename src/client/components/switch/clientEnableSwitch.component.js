import React, {useState} from 'react';
import request from 'superagent';
import Switch from './switch.component';

export default ({id, name, initEnabled, immediateUpdate = true}) => {
  const [clientEnabled, setClientEnabled] = useState(initEnabled);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleEnable = () => {
    const toggled = !clientEnabled;
    setClientEnabled(toggled);

    if (immediateUpdate) {
      setIsLoading(true);
      request
        .post(`/client/${id}`)
        .type('form')
        .send({
          enabled: toggled
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          alert('Save client failed');
        });
    }
  };

  return (
    <Switch
      name="enabled"
      checked={clientEnabled}
      onChange={handleToggleEnable}
      data-cy={
        isLoading
          ? 'client-isloading'
          : `${name}-${clientEnabled ? 'enabled' : 'disabled'}`
      }
    />
  );
};
