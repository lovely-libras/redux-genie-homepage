import React, { Component } from "react";

export default class StageTwo extends Component {
  constructor(props) {
    super();
    this.state = {
      property_name: "",
      property_value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleNext(event) {
    event.preventDefault();
    const { handleProperties, handleStage } = this.props;
    const { property_name, property_value } = this.state;

    let obj = {};
    obj[property_name] = property_value;
    handleProperties(obj);
    handleStage();
  }

  handleAdd(event) {
    event.preventDefault();
    const { handleProperties, handleStage } = this.props;
    const { property_name, property_value } = this.state;

    let obj = {};
    obj[property_name] = property_value;
    handleProperties(obj);
    handleStage(0);
    this.setState({ property_name: "", property_value: "" });
  }

  render() {
    return (
      <div id="stage-two-container">
        <h1>Properties</h1>
        <div id="stage-two-input">
          <input
            placeholder="Feathers, isQuacking, etc"
            onChange={this.handleChange}
            type="text"
            name="property_name"
            placeholder="Feathers, etc"
            value={this.state.property_name}
          />
          <select
            onChange={this.handleChange}
            name="property_value"
            value={this.state.property_value}
          >
            <option value="">----</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
          </select>
        </div>
        <div id="stage-two-buttons">
          <button onClick={() => this.handleAdd(event)}>
            Add Another Property
          </button>
          <button onClick={() => this.handleNext(event)}>Next</button>
        </div>
      </div>
    );
  }
}
