import React, { Component } from "react";

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleNext(event) {
    event.preventDefault();
    const { handleName, handleStage } = this.props;
    handleName(this.state.name);
    handleStage();
  }

  render() {
    return (
      <div id="stage-one-container" className="form-style">
        <h1 id="stage-one-header">Model Name</h1>
        <span id="stage-one-underline">
        </span>
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            name="name"
            id="stage-one-input"
            placeholder="Ducks, Geese, etc"
            required
          />
        <button className="btn" onClick={() => this.handleNext(event)}>Next</button>
      </div>
    );
  }
}
