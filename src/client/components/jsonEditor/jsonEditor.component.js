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
      "mode": "code",
      "indentation": 2
    };
    this.editor = new JSONEditor(container, options);
    this.editor.set(this.props.json);
  }

  render() {
    return (
      <div id="jsoneditor"></div>
    );
  }
}
