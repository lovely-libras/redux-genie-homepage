import React, { Component } from 'react';
import FileSaver from 'file-saver';
import ModelEntry from './ModelEntry';

export default class Form extends Component {
  constructor () {
    super();
    this.state = {
      file_structure: '',
      models: [],
      numForms: 1,
      forms: {
        ME0: { // === event.target.dataSet.modelName
          name: '',
          properties: {
            PE0: {
              name: 'property',
              type: 'string'
            }
          }
        }
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addModelEntry = this.addModelEntry.bind(this)
    this.handleParentChange = this.handleParentChange.bind(this)
    this.setModelName = this.setModelName.bind(this)
  }

  // handleChange (event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  setModelName (event){
    const {modelName} = event.target.dataset
    const {forms} = this.state
    const modelObj = this.state.forms[modelName]
    const {properties} = this.state.modelName.forms
    this.setState({ forms: {...forms, [modelName]: {...modelObj, name: event.target.value}, properties: [...properties]} }, () => console.log(this.state))
  }

  setPropertName(event){
    // const {modelName} = event.target.dataset
    // const {forms} = this.state
    // const modelObj = this.state.forms[modelName]
    // let {properties} = this.state.modelName.forms
    // this.setState({ forms: {...forms, [modelName]: {...modelObj, properties: }}})
  }

  handleParentChange(event){
    if(event.target.name === "model"){
      setModelName(event)
    } else if(event.target.name === "property_name"){
      console.log("Property input",event.target)
    } else if(event.target.name === "property"){
      console.log("Property select",event.target)
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    let file = new File([
      [`Structure: ${this.state.file_structure}\n`],
      ['\n'],
      ['Models:\n'],
      [`  - ${this.state.model}:\n`],
      [`    - ${this.state.property_name}: ${this.state.property}`]
    ], "lamp.config.yml", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);
  }

  addModelEntry(){
    this.setState({ numForms: this.state.numForms + 1, forms: {...this.state.forms, [`ME${this.state.numForms}`]: {
      name: ''
    }}})
  }


  render() {
    let modelForms = []

    for(let i = 0; i < this.state.numForms; i++){
        modelForms.push(<ModelEntry data={`ME${i}`} handleData={this.handleData} key={`ME${i}`}/>)
    }

    return (
      <div className="yml_form" onChange={(event) => this.handleParentChange(event)}>
        <form >
          <div className="structure-entry">
            <input type="radio" id="ducks" name="file_structure" value="ducks" required />
            <label forhtml="ducks">Ducks</label>
            <input type="radio" id="rails" name="file_structure" value="rails" required />
            <label forhtml="rails">Rails</label>
          </div>
          {modelForms}
        </form>
        <button onClick={this.addModelEntry}>New Model</button>
        <button type="button" onClick={() => console.log(this.state)}>SUBMIT</button>
      </div>
    );
  }
}

