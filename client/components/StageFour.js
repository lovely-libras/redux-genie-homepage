import React, { Component } from "react";
import ls from "local-storage";
import Joyride from "react-joyride";

export default class StageFour extends Component {
  constructor(props) {
    super();
    this.state = {
      thunk_name: "",
      thunk_route: "",
      thunk_action: "",
      errors: false,
      errorMessage: "",
      steps: [
        {
          target: "#stage-four-input",
          content:
            "If you know you want thunks and you know what your backend will look like, provide that information here.",
          disableBeacon: true
        },
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this)
    this.checkNameValidity = this.checkNameValidity.bind(this)
    this.checkRouteValidity = this.checkRouteValidity.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  checkNameValidity(name, type){
    if (name.length === 0) {
      this.setState({
        errors: true,
        errorMessage: `${type} gotta have names dude!`
      });
    } else if (name.match(/[^a-zA-Z]/g) !== null) {
      this.setState({
        errors: true,
        errorMessage: `Names cannot have spaces, numbers, \n or special characters.`
      });
    } else if (name.length >= 30) {
      this.setState({
        errors: true,
        errorMessage: "Ok Proust. Max length is 20 chars."
      });
    } else {
      return true
    }
  }

  checkRouteValidity(route){
    if(route.length === 0){
      this.setState({
        errors: true,
        errorMessage: "Routes gotta have names dude!"
      });
    } else if(route.match(/[\s]/g !== null)){
      this.setState({
        errors: true,
        errorMessage: "Routes can't have spaces"
      });
    } else {
      return true
    }
  }

  checkValidity(name, route, action, button) {
    const { handleThunks, handleStage, handleNewModel } = this.props;
    const { thunk_name, thunk_route, thunk_action } = this.state
    if( thunk_name.length + thunk_route.length + thunk_action.length === 0 && button === "next"){
      handleStage()
    } else if( thunk_name.length + thunk_route.length + thunk_action.length === 0 && button === "newModel"){
      handleStage(-3)
    }else {
      if(this.checkNameValidity(thunk_name, "Thunk") && this.checkNameValidity(thunk_action, "Action") && this.checkRouteValidity(thunk_route)){
        if(button === "new"){
          handleThunks(name, route, action)
          handleStage(0)
          this.setState({ thunk_name: '', thunk_route: '', thunk_action: ''})
        } else if(button === "newModel"){
          handleNewModel(name, route, action)
        }else {
          // "next case"
          handleThunks(name, route, action)
          handleStage()
        }
      }
    }
  }

  render() {
    const {
      thunk_name,
      thunk_route,
      thunk_action,
      errors,
      errorMessage,
      steps
    } = this.state;
    return (
      <div id="stage-four-container" className="form-style">
        <h1>Thunks</h1>
        <div id="stage-four-input">
          <input
            placeholder="migrateSouthThunk"
            onChange={this.handleChange}
            type="text"
            name="thunk_name"
            id="step-one"
            value={thunk_name}
          />
          <input
            placeholder="/api/quackForceOne"
            onChange={this.handleChange}
            type="text"
            name="thunk_route"
            id="step-one"
            value={thunk_route}
          />
          <input
            placeholder="migrateSouth"
            onChange={this.handleChange}
            type="text"
            name="thunk_action"
            id="step-one"
            value={thunk_action}
          />
        </div>
        <span className={errors ? "invalid-input" : "valid-input"}>
          {errorMessage}
        </span>
        <div id="stage-four-buttons">
          <button
            onClick={() => {
              event.preventDefault();
              this.checkValidity(thunk_name, thunk_route, thunk_action, "new");
            }}
            className="btn"
            id="step-three"
          >
            ADD ANOTHER THUNK
          </button>
          <button
            className="btn"
            id="step-four"
            onClick={() => {
              event.preventDefault();
              this.checkValidity(thunk_name, thunk_route, thunk_action, "next");
            }}
          >
            NEXT
          </button>
          <button
            onClick={() => this.checkValidity(thunk_name, thunk_route, thunk_action, "newModel")}
            className="btn"
            id="step-three"
          >
            ADD ANOTHER MODEL
          </button>
        </div>
        <Joyride
          steps={steps}
          showProgress={true}
          continuous={true}
          showSkipButton={true}
        />
      </div>
    );
  }
}
