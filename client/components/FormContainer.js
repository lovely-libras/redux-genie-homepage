import React, { Component } from "react";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";

export default class FormContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      fields: [],
      stage: 1,
      currentModel: {
        name: '',
        properties: [

        ]
      }
    };
    this.handleName = this.handleName.bind(this)
    this.handleProperties = this.handleProperties.bind(this)
    this.handleStage = this.handleStage.bind(this);
  }

  handleStage(num = 1) {
    this.setState({ stage: this.state.stage + num });
  }

  handleName(ele) {
    this.setState({ currentModel: {...this.state.currentModel, name: ele}}, () => console.log(this.state))
  }

  handleProperties(property){
    let {properties} = this.state.currentModel
    this.setState({ currentModel: {...this.state.currentModel, properties: properties.concat(property)}}, () => console.log(this.state))
  }

  render() {
    let toRender = [<StageOne handleStage={this.handleStage} handleName={this.handleName} />, <StageTwo handleStage={this.handleStage} handleProperties={this.handleProperties} />, <StageThree />]
    let {stage} = this.state
    return (
      <div>
        <form>
          {toRender[stage - 1]}
        </form>
      </div>
    );
  }
}
