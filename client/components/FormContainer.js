import React, { Component } from "react";
import StageZero from "./StageZero";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import StageFour from "./StageFour";
import SubmitPage from "./SubmitPage";
import brace from "brace";
import AceEditor from "react-ace";
import ls from "local-storage";

import "brace/mode/yaml";
import "brace/theme/solarized_light";

const style = {
  animation: "fadein 1s",
  boxShadow: "0px 2px 2px  rgb(175, 175, 175)"
};

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      fields: [`Models: \n \n`],
      stage: 4,
      text: "",
      readyToSubmit: false,
      thunksToggle: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleProperties = this.handleProperties.bind(this);
    this.handleExtras = this.handleExtras.bind(this);
    this.handleStage = this.handleStage.bind(this);
    this.handleStructure = this.handleStructure.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handeLocalStorage = this.handleLocalStorage.bind(this);
    this.startOver = this.startOver.bind(this);
    this.handleThunks = this.handleThunks.bind(this);
    this.handleNewModel = this.handleNewModel.bind(this);
  }

  startOver() {
    ls.remove("form");
    this.setState({
      fields: [`Models: \n`],
      stage: 0,
      text: "",
      thunksToggle: false,
      readyToSubmit: false
    });
  }

  handleStage(num = 1) {
    this.setState({ stage: this.state.stage + num });
  }

  handleName(name) {
    const newModel = `\n  - ${name}:\n\n    Slice:\n`;
    this.setState(
      {
        fields: [...this.state.fields, newModel]
      },
      () => ls.set("form", [this.state.stage, this.state.fields])
    );
  }

  handleText() {
    this.setState({ text: this.state.fields.join("") }, () =>
      ls.set("form", [this.state.stage, this.state.fields])
    );
  }

  handleProperties(name, value) {
    const newProperty = `      - ${name}: ${value}\n`;
    this.setState(
      {
        fields: [...this.state.fields, newProperty]
      },
      () => ls.set("form", [this.state.stage, this.state.fields])
    );
  }

  handleThunks(name, route, action) {
    let {thunksToggle} = this.state
    if (!thunksToggle) {
      let thunk = `    Thunks:\n    - ${name}:\n      - ${route}\n      - ${action}\n`;
      this.setState({ thunksToggle: true, fields: [...this.state.fields, thunk] }, () =>
        ls.set("form", [this.state.stage, this.state.fields])
      );
    } else {
      let thunk = `     - ${name}:\n      - ${route}\n      - ${action}\n`;
      this.setState({ fields: [...this.state.fields, thunk] }, () =>
        ls.set("form", [this.state.stage, this.state.fields])
      );
    }
  }

  handleNewModel(name, route, action) {
    let {thunksToggle} = this.state
    if (!thunksToggle) {
      let thunk = `    Thunks:\n    - ${name}:\n      - ${route}\n      - ${action}\n`;
      this.setState({ stage: 1, numModels: 1, fields: [...this.state.fields, thunk] });
    } else {
      let thunk = `     - ${name}:\n      - ${route}\n      - ${action}\n`;
      this.setState({ stage: 1, thunksToggle: false, numModels: 1, fields: [...this.state.fields, thunk] });
    }
  }

  handleExtras(crud, extraActions) {
    !crud ? (crud = `\n    CRUD: false\n`) : (crud = ``);

    let actions = ``;
    if (extraActions.length) {
      let header = `\n    Actions:\n`;
      let fields = extraActions.split(" ").map(action => {
        return `      - ${action}\n`;
      });
      fields.unshift(header);
      actions = fields.join("");
    }

    this.setState(
      {
        stage: 4,
        fields: [...this.state.fields, crud, actions, "\n"]
      },
      () => ls.set("form", [this.state.stage, this.state.fields])
    );
  }

  handleStructure(event) {
    if (this.state.fields[0].startsWith("Structure:")) {
      let splice = this.state.fields.splice(0);
      splice[0] = `Structure: ${event.target.value}\n\n`;
      this.setState({ fields: splice, readyToSubmit: true });
    } else {
      let header = `Structure: ${event.target.value}\n\n`;
      this.setState(
        {
          readyToSubmit: true,
          fields: [header, ...this.state.fields]
        },
        () => ls.set("form", [this.state.stage, this.state.fields])
      );
    }
  }

  handleLocalStorage() {
    const [stage, fields] = ls.get("form");
    if (stage > this.state.stage) {
      this.setState({ stage, fields });
    }
  }

  componentDidMount() {
    const data = ls.get("form");
    if (data !== null) {
      this.handleLocalStorage();
    }
  }

  render() {
    let toRender = [
      <StageZero handleStage={this.handleStage} />,
      <StageOne handleStage={this.handleStage} handleName={this.handleName} />,
      <StageTwo
        handleLocalStorage={this.handeLocalStorage}
        handleStage={this.handleStage}
        handleProperties={this.handleProperties}
      />,
      <StageThree handleExtras={this.handleExtras} />,
      <StageFour
        handleThunks={this.handleThunks}
        handleStage={this.handleStage}
        handleNewModel={this.handleNewModel}
      />
    ];

    let { stage } = this.state;

    const text = this.state.fields.join("");

    return (
      <div className="form-container">
        <div id="form-and-editor-container">
          {stage > 4 ? (
            <SubmitPage
              startOver={this.startOver}
              ready={this.state.readyToSubmit}
              data={this.state.fields}
              handleStructure={this.handleStructure}
            />
          ) : (
            <form className="staged-form" autoComplete="off">
              {toRender[stage]}
              <button
                className="btn"
                id="form-start-over-btn"
                onClick={this.startOver}
              >
                START OVER
              </button>
            </form>
          )}
          <div id="editor-container">
            <AceEditor
              mode="yaml"
              theme="solarized_light"
              style={style}
              value={text}
              width={"100%"}
              height={"100%"}
              editorProps={{ $blockScrolling: true }}
              readOnly={true}
              fontSize={17}
            />
          </div>
        </div>
      </div>
    );
  }
}
