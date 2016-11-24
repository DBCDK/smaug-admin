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
    var container = document.getElementById('jsoneditor');
    var options = {
      mode: 'code',
      onChange: () => this.onChange()
    };
    this.editor = new JSONEditor(container, options, this.props.json);
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
    }
    catch (e) {
      return false;
    }
  }

  render() {
    return (
      <div className={`element ${this.props.name}`}>
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <div id="jsoneditor" style={{width: '100%', height: '400px'}}></div>
        <input type="hidden" name={this.props.name} id={this.props.name} value={this.state.json}/>
      </div>

    );
  }
}
