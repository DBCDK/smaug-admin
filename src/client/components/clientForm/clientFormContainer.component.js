import React from 'react';

import Client from './clientForm.component';

export default class ClientFormContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e) {
    if (this.hasError) {
      e.preventDefault();
      alert('The config JSON is not valid'); // eslint-disable-line no-alert
    }
  }

  setErrorState(hasError) {
    this.hasError = hasError;
  }

  render() {
    return (
      <Client onSubmit={e => this.onSubmit(e)} setErrorState={state => this.setErrorState(state)} {...this.props} />
    );
  }
}
