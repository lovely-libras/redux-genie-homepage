import React, { Component } from "react";
import FileSaver from "file-saver";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/yaml";
import "brace/theme/solarized_light";

export default class SubmitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file_structure: "Ducks",
      text: ''
    };

    this.handleStructure = this.handleStructure.bind(this);
    this.handleCreateFile = this.handleCreateFile.bind(this);
  }

  handleStructure(event) {
    let header = `Structure: ${event.target.value}\n`;
    let modelFields = this.props.data.map(model => {
      let crud = ``;
      if (!model.crud) {
        crud = `    CRUD: false\n\n`;
      }
      let actions;
      if (model.extraActions.length) {
        let header = [`    Actions:\n`];
        actions = model.extraActions.split(" ").map(action => {
          return `      - ${action}\n`;
        });
        actions = header.concat(actions);
      }
      return [
        ` - ${model.name}:\n\n`,
        `    Slice:\n`,
        model.properties.map(property => {
          let name = Object.keys(property)[0];
          return `      - ${name}: ${property[name]}\n`;
        }),
        `\n`,
        crud,
        actions,
        `\n`
      ];
    });
    modelFields = modelFields.flat(2);
    modelFields.unshift(header, "\n", `Models: \n \n`);
    this.setState({ file_structure: event.target.value, text: modelFields.join('') });
  }

  handleCreateFile() {
    event.preventDefault();
    let modelFields = this.state.text.split('')
    modelFields = modelFields.map(ele => [ele]);
    let file = new File(modelFields, "lamp.config.yml", {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(file);
  }

  render() {
    return (
      <div id="submit-page-container">
        <div id="submit-page-left">
          <div
            onChange={() => this.handleStructure(event)}
            id="submit-left-inputs-container"
          >
            <h3>Please select a folder structure</h3>
            <div id="submit-left-inputs">
              <div>
                <label forhtml="ducks">Ducks</label>
                <input
                  type="radio"
                  id="ducks"
                  name="file_structure"
                  value="Ducks"
                  required
                />
              </div>
              <div>
                <label forhtml="rails">Rails</label>
                <input
                  type="radio"
                  id="rails"
                  name="file_structure"
                  value="Rails"
                  required
                />
              </div>
            </div>
          </div>
          <div id="submit-left-button">
            <h3>Click the submit button to generate your file</h3>
            <button onClick={() => this.handleCreateFile(event)}>Click</button>
          </div>
        </div>

        <AceEditor
          mode="yaml"
          theme="solarized_light"
          id="submit-page-right"
          value={this.state.text}
          editorProps={{ $blockScrolling: true }}
          readOnly={true}
          fontSize={16}
        />
      </div>
    );
  }
}
