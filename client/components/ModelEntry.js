import React, { Component } from "react";
import PropertyEntry from "./PropertyEntry";

export default class ModelEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: "",
      properties: [],
      numProperties: 1
    };

    // this.handleChange = this.handleChange.bind(this);
    this.createObject = this.createObject.bind(this);
    this.addPropertyEntry = this.addPropertyEntry.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  createObject() {
    let obj = {};
    obj[this.state.model] = [];

    let innerObj = {};
    innerObj[this.state.property_name] = this.state.property;
    obj[this.state.model].push(innerObj);

    this.props.handleData(obj);
  }

  addPropertyEntry() {
    this.setState({ numProperties: this.state.numProperties + 1 });
  }

  render() {
    let propertyEntries = [];

    for (let i = 0; i < this.state.numProperties; i++) {
      propertyEntries.push(<PropertyEntry  key={`PE${i}`} model-name={this.props.data}/>);
    }
    return (
      <div className="model-entry">
        <div className="model-name-entry">
          <label forhtml="model">Model</label>
          <input data-model-name={this.props.data} type="text" name="model" required />
        </div>
        <label forhtml="property">Properties</label>
        {propertyEntries}
        <div className="property-buttons">
          <button onClick={() => this.addPropertyEntry()}>New property</button>
          <button className="modelButton" onClick={() => this.createObject()}>
            Add model to file
          </button>
        </div>
      </div>
    );
  }
}
