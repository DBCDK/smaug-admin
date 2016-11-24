import React from 'react';
import LoginForm from './loginForm.component';

export default class LoginFormContainer extends React.Component {

  render() {
    console.log(this.props);
    return LoginForm({...this.props});
  }
}
