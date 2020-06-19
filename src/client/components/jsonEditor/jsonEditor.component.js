import React from 'react';
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js';

export default class JEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: JSON.stringify(this.props.json)
    };
  }

  componentDidMount() {
    var container = this.refs.jsoneditor;
    var options = {
      mode: 'code',
      onChange: () => this.onChange()
    };
    this.editor = new JSONEditor(container, options, this.props.json);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.json) !== this.state.json) {
      this.setState({json: JSON.stringify(this.props.json)});
      this.editor.set(this.props.json);
    }
  }

  onChange() {
    const json = this.editor.getText();
    this.setState({json});
    this.props.setErrorState(!this.validateJson(json));
  }

  validateJson(json) {
    try {
      JSON.parse(json);
      return true;
    } catch (error) {
      return false;
    }
  }

  render() {
    return (
      <div
        className={'element ' + this.props.name + ' ' + this.props.isVisible}
      >
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <div ref="jsoneditor" style={{width: '100%', height: '400px'}} />
        <input
          type="hidden"
          name={this.props.name}
          id={this.props.name}
          value={this.state.json}
        />
      </div>
    );
  }
}
