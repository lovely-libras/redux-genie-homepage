import React, { Component } from "react";

export default class StageThree extends Component {
  constructor() {
    super();
    this.state = {
      crud: false,
      extraActions: '',
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    if(event.target.name === 'crud'){
      this.setState({ crud: !this.state.crud})
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  render() {
    return (
      <div onChange={() => this.handleChange(event)}>
        <h1>Please select your extra options!</h1>
        <label name="crud">CRUD for Actions?</label>
        <input name="crud" type="checkbox" />
        <label name="extraActions">
          List any additional actions, separated by a common
        </label>
        <input
          type="text"
          name="extraActions"
          placeholder="countDucks, migrateDucks, flyTogether"
        />
        <div>
          <button onClick={() => this.props.addModel(event, this.state.crud, this.state.extraActions)}>Add another model!</button>
          <button onClick={() => this.props.handleSubmit(event, this.state.crud, this.state.extraActions)}>Submit</button>
        </div>
      </div>
    );
  }
}
