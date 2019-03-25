import React, { Component } from "react";
import StageZero from "./StageZero";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import SubmitPage from "./SubmitPage";
import brace from "brace";
import AceEditor from "react-ace";
import ls from "local-storage";

import "brace/mode/yaml";
import "brace/theme/solarized_light";

const dummyProps = [
  {
    crud: true,
    extraActions: "flyFurther, flyHigher",
    name: "Ducks",
    properties: [{ Feathers: "string" }, { Quacks: "boolean" }]
  },
  {
    crud: false,
    extraActions: "oneLiners, mutate",
    name: "Terminator",
    properties: [{ Model: "number" }, { isBack: "boolean" }]
  }
];

const style = {
  animation: "fadein 1s",
  boxShadow: "0px 2px 2px  rgb(175, 175, 175)"
};

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      fields: [`Models: \n \n`],
      stage: 0,
      text: "",
      readyToSubmit: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleProperties = this.handleProperties.bind(this);
    this.handleAddCurrentModel = this.handleAddCurrentModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStage = this.handleStage.bind(this);
    this.handleStructure = this.handleStructure.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handeLocalStorage = this.handleLocalStorage.bind(this);
    this.startOver = this.startOver.bind(this);
  }

  startOver() {
    ls.remove("form");
    this.setState({
      fields: [`Models: \n \n`],
      stage: 0,
      text: "",
      readyToSubmit: false
    });
  }

  handleStage(num = 1) {
    this.setState({ stage: this.state.stage + num });
  }

  handleName(name) {
    const newModel = ` - ${name}:\n\n`;
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

  handleAddCurrentModel(crud, extraActions) {
    !crud ? (crud = `\n    CRUD: false\n`) : (crud = ``);

    let header = `\n     Actions:\n`;
    let actions = ``;
    if (extraActions.length) {
      let fields = extraActions.split(" ").map(action => {
        return `      - ${action}\n`;
      });
      actions = fields.join("");
    }

    this.setState(
      {
        stage: 1,
        fields: [...this.state.fields, crud, header, actions, "\n"]
      },
      () => ls.set("form", [this.state.stage, this.state.fields])
    );
  }

  handleSubmit(crud, extraActions) {
    !crud ? (crud = `\n    CRUD: false\n`) : (crud = ``);

    let header = `\n     Actions:\n`;
    let actions = ``;
    if (extraActions.length) {
      let fields = extraActions.split(" ").map(action => {
        return `      - ${action}\n`;
      });
      actions = fields.join("");
    }

    this.setState(
      {
        stage: 4,
        fields: [...this.state.fields, crud, header, actions, "\n"]
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
    console.log("this is before setState", [stage, fields]);
    if (stage > this.state.stage) {
      this.setState({ stage, fields }, () =>
        console.log("This is after setState", [
          this.state.stage,
          this.state.fields
        ])
      );
    }
  }

  componentDidMount() {
    const data = ls.get("form");
    if (data !== null) {
      console.log("heading to handleLocalStorage");
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
      <StageThree
        addModel={this.handleAddCurrentModel}
        handleSubmit={this.handleSubmit}
      />
    ];

    let { stage } = this.state;

    const text = this.state.fields.join("");

    return (
      <div className="form-container">
        <div id="form-and-editor-container">
          {stage > 3 ? (
            <SubmitPage
              ready={this.state.readyToSubmit}
              data={this.state.fields}
              handleStructure={this.handleStructure}
            />
          ) : (
            <form className="staged-form" autoComplete="off">
              {toRender[stage]}
            </form>
          )}
          <AceEditor
            mode="yaml"
            theme="solarized_light"
            style={style}
            value={text}
            width={"25%"}
            height={"100%"}
            editorProps={{ $blockScrolling: true }}
            readOnly={true}
            fontSize={17}
          />
        </div>
        <button className="btn" id="start-over-btn" onClick={this.startOver}>
          START OVER
        </button>
      </div>
    );
  }
}
