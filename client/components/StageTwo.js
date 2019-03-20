import React, { Component } from "react";

export default class StageTwo extends Component {
  constructor(props) {
    super();
    this.state = {
      properties: [],
      property_name: '',
      property_value: ''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange(event){
    console.log(event.target.dataset.name)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNext(event){
    event.preventDefault()
    const {handleProperties, handleStage} = this.props
    const {property_name, property_value} = this.state

    let obj = {}
    obj[property_name] = property_value
    handleProperties(obj)
    handleStage()
  }

  handleAdd(event){
    event.preventDefault()
    const {handleProperties, handleStage} = this.props
    const {property_name, property_value} = this.state

    let obj = {}
    obj[property_name] = property_value
    handleProperties(obj)
    handleStage(0)
  }

  render() {
    return (
      <div>
        <h1>Please enter your models property names and thier types</h1>
        <div onChange={this.handleChange}>
          <input type="text" data-name='cheese' name="property_name" placeholder="Property Name" />
          <select name="property_value">
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
          </select>
        </div>
        <button onClick={() => this.handleAdd(event)}>Add Another Property</button>        
        <button onClick={() => this.handleNext(event)}>Next</button>
      </div>
    );
  }
}