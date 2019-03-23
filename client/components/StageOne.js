import React, { Component } from "react";

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      errors: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this)
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }


  checkValidity(event){
    event.preventDefault();
    const { handleName, handleStage } = this.props;
    const {name} = this.state
    if(name.length === 0){
      this.setState({ errors: true, errorMessage: "Models gotta have names dude!"})
    } else if(name.match(/[^a-zA-Z]/g) !== null){
      this.setState({ errors: true, errorMessage: `Models cannot have spaces, numbers, \n or special characters.`})
    } else if(name.length >= 30){
      this.setState({ errors: true, errorMessage: "Ok Proust. Max length is 30 chars."})
    }else {
      handleName(this.state.name);
      handleStage();
    }
  }

  render() {
    const {errors, errorMessage} = this.state
    return (
      <div id="stage-one-container" className="form-style">
        <h1 id="stage-one-header">Model Name</h1>
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            name="name"
            id="stage-one-input"
            placeholder="Ducks, Geese, etc"
            required
          />
          <span className={errors ? 'invalid-input' : 'valid-input'}>{errorMessage}</span>
        <button className="btn" onClick={() => this.checkValidity(event)}>
          NEXT
        </button>
      </div>
    );
  }
}
