import React, { Component } from 'react';

export default class YMLForm extends Component {
  constructor () {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (event) {
    console.log(event.target);
  }
  render() {
    return (
      <form onChange={(event) => this.handleChange(event)} className="yml_form">
        <div>
          <input type="radio" id="ducks" name="file_structure" value="ducks" />
          <label forhtml="ducks">Ducks</label>
          <input type="radio" id="rails" name="file_structure" value="rails" />
          <label forhtml="rails">Rails</label>
        </div>
          <label forhtml="model">Model</label>
          <input type="text" name="model" />
          <label forhtml="property">Properties</label>
          <input type="text" name="property" />
          <select name="property">
            <option value="string">String</option>
            <option value="boolean">Boolean</option>
            <option value="number">Number</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
          </select>
      </form>
    );
  }
}

