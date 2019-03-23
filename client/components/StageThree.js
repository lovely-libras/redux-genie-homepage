import React, { Component } from "react";

export default class StageThree extends Component {
  constructor() {
    super();
    this.state = {
      crud: false,
      extraActions: "",
      errors: false,
      errorMessage: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  checkValidity(event, button) {
    event.preventDefault();
    let {crud, extraActions} = this.state
    if(extraActions.replace(/\s/g, "").match(/[^a-zA-Z]/g) !== null){
      this.setState({ errors: true, errorMessage: "Check your format. No special characters or numbers."})
    } else {
      button === "submit"
      ?
      this.props.handleSubmit(crud, extraActions)
      :
      this.props.addModel(crud, extraActions)
    }
  }

  handleChange(event) {
    if (event.target.name === "crud") {
      this.setState({ crud: !this.state.crud });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    const { errors, errorMessage } = this.state;
    return (
      <div
        onChange={() => this.handleChange(event)}
        id="stage-three-container"
        className="form-style"
      >
        <h1>Extras</h1>
        <div id="stage-three-crud">
          <label name="crud">CRUD for Actions?</label>
          <input name="crud" type="checkbox" />
        </div>
        <div id="stage-three-actions">
          <label name="extraActions" className="tooltip">
            List any additional actions, separated by a space:
            <span className="tooltiptext">
              The genie grants you three wishes!
            </span>
          </label>
          <span />
          <input type="text" name="extraActions" placeholder="flyTogether" />
        </div>
          <span className={errors ? "invalid-input" : "valid-input"}>
            {errorMessage}
          </span>
        <div id="stage-three-buttons">
          <button
            className="btn"
            onClick={() =>
              this.checkValidity(event, "add")
            }
          >
            ADD ANOTHER MODEL
          </button>
          <button
            className="btn"
            onClick={() =>
              this.checkValidity(event, "submit")
            }
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}
