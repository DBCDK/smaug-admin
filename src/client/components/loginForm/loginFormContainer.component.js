import React from 'react';
import LoginForm from './loginForm.component';

export default class LoginFormContainer extends React.Component {

  render() {
    return LoginForm({...this.props});
  }
}
