import React from 'react';
import request from 'superagent';

export function TokenForm({onSubmit}) {
  return (
    <div className="tokenform"><a className="createtoken" href="#getToken" onClick={onSubmit}>Token</a></div>
  );
}

export function TokenView({client, token, close}) {
  const expiresOptions = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  };
  return (
    <div className="tokenview">
      <div className="overlay background" onClick={close}></div>
      <div className="overlay content">
        <h2>{`Token for ${client.name}`}</h2>
        <div className="element token">
          <label>Token ID</label>
          <div className="value">{token.id}</div>
        </div>
        <div className="element expires">
          <label>The token expires on:</label>
          <div className="value">{(new Date(token.expires)).toLocaleTimeString('us-US', expiresOptions)}</div>
        </div>
      </div>
    </div>
  );
}


export default class TokenContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showToken: false,
      token: {}
    };
  }

  onClose() {
    this.setState({showToken: false});
  }

  onSubmit(e, client) {
    e.preventDefault();
    if (this.state.token.id) {
      this.setState({showToken: true});
    }
    else {
      request.get(`/token/${client.id}`).end((err, res) => {
        this.setState({showToken: true, token: JSON.parse(res.text)});
      });
    }
  }

  render() {
    return this.state.showToken
      && TokenView({client: this.props.client, token: this.state.token, close: () => this.onClose()})
      || TokenForm({client: this.props.client, onSubmit: (e) => this.onSubmit(e, this.props.client)});
  }
}
