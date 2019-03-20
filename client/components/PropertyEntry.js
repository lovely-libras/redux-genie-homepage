import React, { Component } from 'react'

export default class PropertyEntry extends Component {
  render() {
    return (
      <div className="property-entry">
        <input type="text" name="property_name" data-model-name={this.props.model-name} required />
        <select name="property" data-model-name={this.props.data} required>
          <option value="string">String</option>
          <option value="boolean">Boolean</option>
          <option value="number">Number</option>
          <option value="array">Array</option>
          <option value="object">Object</option>
        </select>
      </div>
    )
  }
}