import React, { Component } from "react";
import FileSaver from "file-saver";
import ls from 'local-storage';
import Joyride from "react-joyride";

const yamlComments = `
# Want to edit this file?
# Be careful! Make sure that models and properties always have a
# space between the dash and the name. Major fields
# (Models, Actions, Thunks, CRUD) should all have a colon after them.
# Also, the name of this file **must** be lamp.config.yaml or the code will not run.
#
# This is how your file should look:
#
# Structure: Ducks
#
# Models: 
# 
# - Ducks:
#
#      - feathers: number
#
#    CRUD: false
#
#     Actions:
#      - migrateSouth
#      - flyTogether
#
`;

export default class SubmitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file_structure: "",
      text: "",
      errors: false,
      errorMessage: "",
      steps: [
        {
          target: "#submit-left-inputs",
          content:
            "There are two main folder structure options: Ducks and Rails. Ducks will create folders for each model; Rails will create folders based on functionality. If you're unsure, choose Ducks!",
          disableBeacon: true
        },
        {
          target: "#lamp-button",
          content:
            "Click here to get your yaml file.",
          disableBeacon: true,
          placement: 'top'
        },
      ]
    };

    this.handleCreateFile = this.handleCreateFile.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  checkValidity() {
    if (!this.props.ready) {
      console.log("first condition")
      this.setState({
        errors: true,
        errorMessage: "Please select a folder structure."
      });
    } else {
      console.log("second condition")
      this.handleCreateFile();
      ls.remove('form')
    }
  }

  handleCreateFile() {
    event.preventDefault()
    console.log('trying to create the file')
    let modelFields = this.props.data.map(ele => [ele]);
    modelFields.push([yamlComments]);
    let file = new File(modelFields, "lamp.config.yml", {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(file);
  }

  render() {
    const { errors, errorMessage, steps } = this.state;

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
          <span className={errors ? "invalid-input" : "valid-input"}>
            {errorMessage}
          </span>
        </div>
        <div id="submit-left-button" className="form-style">
          <h3>I wish for a config file!</h3>
          <button
            className="btn"
            onClick={() => this.checkValidity(event)}
            id="lamp-button"
          >
            <img
              id="lamp-button-image"
              src={
                "https://flaticons.net/gd/makefg.php?i=icons/Miscellaneous/Genie-Lamp.png&r=255&g=255&b=255"
              }
            />
          </button>
        </div>
        <Joyride steps={steps} showProgress={true} continuous={true} showSkipButton={true} />
      </div>
    );
  }
}
