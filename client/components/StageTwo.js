import React, { Component } from "react";
import ls from "local-storage";
import Joyride from "react-joyride";

export default class StageTwo extends Component {
  constructor(props) {
    super();
    this.state = {
      property_name: "",
      property_value: "",
      errors: false,
      errorMessage: "",
      steps: [
        {
          target: "#step-one",
          content:
            "What's a property on your model? If it's a user do will they have an email address? First name? Favorite CLI tools? Name it here.",
          disableBeacon: true
        },
        {
          target: "#step-two",
          content:
            "What kind of data type will this property be? Let us know so state can be initialized for that type",
          disableBeacon: true
        },
        {
          target: "#step-three",
          content:
            "Click here if you want to add another property, or...",
          disableBeacon: true
        },
        {
          target: "#step-four",
          content:
            "Click here to proceed on.",
          disableBeacon: true
        }
      ]
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
    const { errors, errorMessage, steps } = this.state;
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
            id="step-one"
            value={this.state.property_name}
          />
          <select
            onChange={this.handleChange}
            name="property_value"
            value={this.state.property_value}
            id="step-two"
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
            id="step-three"
          >
            ADD ANOTHER
          </button>
          <button
            className="btn"
            id="step-four"
            onClick={() => this.checkValidity(event, "next")}
          >
            NEXT
          </button>
        </div>
        <Joyride steps={steps} showProgress={true} continuous={true} showSkipButton={true} />
      </div>
    );
  }
}
