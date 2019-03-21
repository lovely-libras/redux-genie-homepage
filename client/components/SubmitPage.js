import React, { Component } from 'react'

export default class SubmitPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      file_structure: '',      
    }
  }

  render(){
    console.log(this.props.data)
    return (
      <div>
        WELCOME TO THE SUBMIT PAGE!
        <div>
          <input
            type="radio"
            id="ducks"
            name="file_structure"
            value="ducks"
            required
          />
          <label forhtml="ducks">Ducks</label>
          <input
            type="radio"
            id="rails"
            name="file_structure"
            value="rails"
            required
          />
          <label forhtml="rails">Rails</label>
        </div>
      </div>
    )
  }

}