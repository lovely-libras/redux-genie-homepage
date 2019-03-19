import React, { Component } from 'react';

export default class ModelEntry extends Component {
  render() {
    return (
      <div>
        <form onChange={(event) => this.props.handleChange(event)} className="yml_form">
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
      </div>
    );
  }
}

