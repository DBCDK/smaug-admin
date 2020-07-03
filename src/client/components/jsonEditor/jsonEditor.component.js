import React from 'react';
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js';

export default class JEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var container = this.refs.jsoneditor;
    var options = {
      mode: 'code',
      onChange: () => {
        this.onChange();

        try {
          const json = this.editor.get();
          this.props.onChange(json);
        } catch (e) {
          //invalid json - don't invoke callback
        }
      }
    };
    this.editor = new JSONEditor(container, options, this.props.json);
  }

  onChange() {
    const json = this.editor.getText();
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
      <div className={'element ' + this.props.name}>
        <div ref="jsoneditor" style={{width: '100%', height: '400px'}} />
      </div>
    );
  }
}
