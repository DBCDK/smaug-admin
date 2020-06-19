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

  setErrorState(hasError) {
    this.hasError = hasError;
  }

  render() {
    return (
      <Client
        onSubmit={e => this.onSubmit(e)}
        setErrorState={state => this.setErrorState(state)}
        {...this.props}
      />
    );
  }
}
