import React, { Component } from "react";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import SubmitPage from "./SubmitPage";
import brace from "brace";
import AceEditor from "react-ace";

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

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      fields: [`Models: \n \n`],
      stage: 1,
      text: "",
      readyToSubmit: false,
    };
    this.handleName = this.handleName.bind(this);
    this.handleProperties = this.handleProperties.bind(this);
    this.handleAddCurrentModel = this.handleAddCurrentModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStage = this.handleStage.bind(this);
    this.handleStructure = this.handleStructure.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  handleStage(num = 1) {
    this.setState({ stage: this.state.stage + num });
  }

  handleName(name) {
    const newModel = ` - ${name}:\n\n`;
    this.setState({
      fields: [...this.state.fields, newModel]
    });
  }

  handleText() {
    this.setState({ text: this.state.fields.join("") });
  }

  handleProperties(name, value) {
    const newProperty = `      - ${name}: ${value}\n`;
    this.setState({
      fields: [...this.state.fields, newProperty]
    });
  }

  handleAddCurrentModel(event, crud, extraActions) {
    event.preventDefault();

    !crud ? (crud = `\n    CRUD: false\n`) : (crud = ``);

    let actions = `\n     Actions:\n`;

    if (extraActions.length) {
      let actions = extraActions.split(" ").map(action => {
        return `      - ${action}\n`;
      });
      actions = actions.concat(actions);
    }

    this.setState({
      stage: 1,
      fields: [...this.state.fields, crud, actions, '\n']
    });
  }

  handleSubmit(event, crud, extraActions) {
    event.preventDefault();

    !crud ? (crud = `\n    CRUD: false\n`) : (crud = ``);

    let header = `\n    Actions:\n`;

    if (extraActions.length) {
      let actions = extraActions.split(" ").map(action => {
        return `      - ${action}\n`;
      });

      header = header.concat(actions);
    }

    this.setState({
      readyToSubmit: true,
      fields: [...this.state.fields, crud, header]
    });
  }

  handleStructure(event) {
    event.preventDefault();
    if(this.state.fields[0].startsWith('Structure:')){
      let splice = this.state.fields.splice(0)
      splice[0] = `Structure: ${event.target.value}\n\n`
      this.setState({ fields: splice })
    } else {
      let header = `Structure: ${event.target.value}\n\n`;
      this.setState({
        fields: [header, ...this.state.fields]
      });
    }
  }

  render() {
    let toRender = [
      <StageOne handleStage={this.handleStage} handleName={this.handleName} />,
      <StageTwo
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
        {this.state.readyToSubmit ? (
          <SubmitPage
            data={this.state.fields}
            handleStructure={this.handleStructure}
          />
        ) : (
          <form className="staged-form" autoComplete="off">
            {toRender[stage - 1]}
          </form>
        )}
        <AceEditor
          mode="yaml"
          theme="solarized_light"
          id="submit-page-right"
          value={text}
          width={'25%'}
          height={'75%'}
          editorProps={{ $blockScrolling: true }}
          readOnly={true}
          fontSize={18}
        />
      </div>
    );
  }
}
