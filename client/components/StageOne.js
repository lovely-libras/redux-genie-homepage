import React, { Component } from "react";

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
    this.handleNext = this.handleNext.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({name: event.target.value})
  }

  handleNext(event){
    event.preventDefault()
    const {handleName, handleStage} = this.props
    handleName(this.state.name)
    handleStage()
  }

  render() {
    return (
      <div>
        <h1>Please Enter your Model Name!</h1>
        <input
          onChange={(event) => this.handleChange(event)}
          type="text"
          name="name"
          placeholder="Ducks, Geese, etc"
        />
        <button onClick={() => this.handleNext(event)}>Next</button>
      </div>
    );
  }
}
