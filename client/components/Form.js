import React, { Component } from 'react';
import FileSaver from 'file-saver'

export default class YMLForm extends Component {
  constructor () {
    super();
    this.state = {
      file_structure: '',
      model: '',
      property_name: '',
      property: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state);
    let file = new File([
      [`Structure: ${this.state.file_structure}\n`],
      ['\n'],
      ['Models:\n'],
      [`  - ${this.state.model}:\n`],
      [`    - ${this.state.property_name}: ${this.state.property}`]
    ], "lamp.config.yml", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);
  }
  render() {
    return (
      <div>
        <form onChange={(event) => this.handleChange(event)} className="yml_form">
          <div>
            <input type="radio" id="ducks" name="file_structure" value="ducks" required />
            <label forhtml="ducks">Ducks</label>
            <input type="radio" id="rails" name="file_structure" value="rails" required />
            <label forhtml="rails">Rails</label>
          </div>
            <label forhtml="model">Model</label>
            <input type="text" name="model" required />
            <label forhtml="property">Properties</label>
            <input type="text" name="property_name" required />
            <select name="property" required>
              <option value="string">String</option>
              <option value="boolean">Boolean</option>
              <option value="number">Number</option>
              <option value="array">Array</option>
              <option value="object">Object</option>
            </select>
        </form>
        <button type="button" onClick={() => this.handleSubmit(event)}>SUBMIT</button>
      </div>
    );
  }
}

