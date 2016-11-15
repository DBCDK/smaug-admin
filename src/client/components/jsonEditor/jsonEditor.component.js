import React from 'react';
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js';
//import 'jsoneditor/dist/jsoneditor.css';

export default class JEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var container = document.getElementById("jsoneditor");
    var options = {
      mode: "code",
      onChange: this.onChange.bind(this)
    };
    this.editor = new JSONEditor(container, options, this.props.json);
  }

  onChange() {
    this.props.onChange(this.editor.getText());
  }

  render() {
    return (
      <div id="jsoneditor" style={{width:'100%', height:'400px'}}></div>
    );
  }
}
