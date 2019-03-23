import React, { Component } from "react";
import FileSaver from "file-saver";

export default class SubmitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file_structure: "Ducks",
      text: ""
    };

    this.handleCreateFile = this.handleCreateFile.bind(this);
  }
  handleCreateFile() {
    event.preventDefault();
    console.log(this.props.data);
    let modelFields = this.props.data.map(ele => [ele]);
    let file = new File(modelFields, "lamp.config.yml", {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(file);
  }

  render() {
    return (
      <div id="submit-page-left">
        <div id="submit-left-inputs-container" className="form-style">
          <h3>Please select a folder structure</h3>
          <div
            id="submit-left-inputs"
            onChange={() => this.props.handleStructure(event)}
          >
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
        <div id="submit-left-button" className="form-style">
          <h3>I wish for a config file!</h3>
          <button
            className="btn"
            onClick={() => this.handleCreateFile(event)}
            id="lamp-button"
          ><img id="lamp-button-image"src={
            "https://flaticons.net/gd/makefg.php?i=icons/Miscellaneous/Genie-Lamp.png&r=255&g=255&b=255"
          }/></button>
        </div>
      </div>
    );
  }
}
