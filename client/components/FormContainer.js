import React, { Component } from "react";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import FileSaver from "file-saver";
import SubmitPage from "./SubmitPage";

const dummyProps = {
  fields: [
    {
      crud: true,
      extraActions: "flyFurther, flyHigher",
      name: "Ducks",
      properties: [{ Feathers: "string" }, { Quacks: "boolean" }]
    },
    {
      crud: true,
      extraActions: "oneLiners, mutate",
      name: "Terminator",
      properties: [{Model: "number"}, {isBack: "boolean"}]
    }
  ]
};

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      fields: [],
      stage: 1,
      currentModel: {
        name: "",
        properties: [],
        crud: false,
        extraActions: ""
      },
      readyToSubmit: true
    };
    this.handleName = this.handleName.bind(this);
    this.handleProperties = this.handleProperties.bind(this);
    this.handleAddCurrentModel = this.handleAddCurrentModel.bind(this);
    this.handleCreateFile = this.handleCreateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStage = this.handleStage.bind(this);
  }

  handleStage(num = 1) {
    this.setState({ stage: this.state.stage + num });
  }

  handleName(ele) {
    this.setState(
      { currentModel: { ...this.state.currentModel, name: ele } },
      () => console.log(this.state)
    );
  }

  handleProperties(property) {
    let { properties } = this.state.currentModel;
    this.setState(
      {
        currentModel: {
          ...this.state.currentModel,
          properties: properties.concat(property)
        }
      },
      () => console.log(this.state)
    );
  }

  handleAddCurrentModel(event, crud, extraActions) {
    event.preventDefault();
    let addToFields = this.state.currentModel;
    addToFields.crud = crud;
    addToFields.extraActions = extraActions;
    this.setState(
      {
        stage: 1,
        fields: this.state.fields.concat(addToFields),
        currentModel: {
          name: "",
          properties: [],
          crud: false,
          extraActions: ""
        }
      },
      () => console.log(this.state)
    );
  }

  handleSubmit(event, crud, extraActions) {
    event.preventDefault();
    let addToFields = this.state.currentModel;
    addToFields.crud = crud;
    addToFields.extraActions = extraActions;
    this.setState({
      readyToSubmit: true,
      fields: this.state.fields.concat(addToFields)
    });
  }

  handleCreateFile() {
    event.preventDefault();
    console.log(this.state);
    let file = new File(
      [
        [`Structure: ${this.state.file_structure}\n`],
        ["\n"],
        ["Models:\n"],
        [`  - ${this.state.model}:\n`],
        [`    - ${this.state.property_name}: ${this.state.property}`]
      ],
      "lamp.config.yml",
      { type: "text/plain;charset=utf-8" }
    );
    FileSaver.saveAs(file);
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
    return (
      <div>
        {this.state.readyToSubmit ? (
          <SubmitPage data={dummyProps} />
        ) : (
          <form>{toRender[stage - 1]}</form>
        )}
      </div>
    );
  }
}
