import React, { Component } from "react";
import ls from "local-storage";

export default class StageTwo extends Component {
  constructor(props) {
    super();
    this.state = {
      property_name: "",
      property_value: "",
      errors: false,
      errorMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  checkValidity(event, button) {
    event.preventDefault();
    const { handleName, handleStage } = this.props;
    const name = this.state.property_name;
    const value = this.state.property_value;
    if (name.length === 0) {
      this.setState({
        errors: true,
        errorMessage: "Properties gotta have names dude!"
      });
    } else if (name.match(/[^a-zA-Z]/g) !== null) {
      this.setState({
        errors: true,
        errorMessage: `Properties cannot have spaces, numbers, \n or special characters.`
      });
    } else if (name.length >= 30) {
      this.setState({
        errors: true,
        errorMessage: "Ok Proust. Max length is 20 chars."
      });
    } else if (value.length === 0) {
      this.setState({
        errors: true,
        errorMessage: "Please select a property data type."
      });
    } else {
      button === "add" ? this.handleAdd(event) : this.handleNext(event);
    }
  }

  handleNext(event) {
    event.preventDefault();
    const { handleProperties, handleStage } = this.props;
    const { property_name, property_value } = this.state;
    handleProperties(property_name, property_value);
    handleStage();
  }

  handleAdd(event) {
    event.preventDefault();
    const { handleProperties, handleStage } = this.props;
    const { property_name, property_value } = this.state;
    handleProperties(property_name, property_value);
    handleStage(0);
    this.setState({ property_name: "", property_value: "" });
  }

  componentDidMount() {
    const data = ls.get("form");
    if (data !== null) {
      this.props.handleLocalStorage();
    }
  }

  render() {
    const { errors, errorMessage } = this.state;
    return (
      <div id="stage-two-container" className="form-style">
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
        <span className={errors ? "invalid-input" : "valid-input"}>
          {errorMessage}
        </span>
        <div id="stage-two-buttons">
          <button
            onClick={() => this.checkValidity(event, "add")}
            className="btn"
          >
            ADD ANOTHER
          </button>
          <button
            className="btn"
            onClick={() => this.checkValidity(event, "next")}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  }
}
