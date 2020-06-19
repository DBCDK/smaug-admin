import React, {useState} from 'react';

import Client from './clientForm.component';

export default function ClientFormContainer(props) {
  const [hasError, setHasError] = useState(false);

  const onSubmit = e => {
    if (hasError) {
      e.preventDefault();
      alert('The config JSON is not valid'); // eslint-disable-line no-alert
    }
  };

  return <Client onSubmit={onSubmit} setErrorState={setHasError} {...props} />;
}
