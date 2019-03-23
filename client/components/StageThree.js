import React, { Component } from "react";

export default class StageThree extends Component {
  constructor() {
    super();
    this.state = {
      crud: false,
      extraActions: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "crud") {
      this.setState({ crud: !this.state.crud });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    return (
      <div onChange={() => this.handleChange(event)} id="stage-three-container">
        <h1>Extras</h1>
        <div id="stage-three-crud">
          <label name="crud">
            CRUD for Actions?
          </label>
          <input name="crud" type="checkbox" />
        </div>
        <div id="stage-three-actions">
          <label name="extraActions" className="tooltip">
            List any additional actions, separated by a comma:
            <span className="tooltiptext">
              The genie grants you three wishes!
            </span>
          </label>
          <span />
          <input
            type="text"
            name="extraActions"
            placeholder="flyTogether"
          />
        </div>
        <div id="stage-three-buttons">
          <button
            onClick={() =>
              this.props.addModel(
                event,
                this.state.crud,
                this.state.extraActions
              )
            }
          >
            Add another model!
          </button>
          <button
            onClick={() =>
              this.props.handleSubmit(
                event,
                this.state.crud,
                this.state.extraActions
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
