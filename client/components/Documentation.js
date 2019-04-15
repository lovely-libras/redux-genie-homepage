import React from "react";
import DocumentationText from "./DocumentationText";
import Media from 'react-media'

const Documentation = () => {
  
  return (
    <div id="docs-container">

    <Media 
      query="(min-width: 1150px)"
      render={()=> {
        return(
        <div className="sidenav">
          <a href="#declaration">Store Declaration</a>
          <div className="sidenav-indent">
            <a href="#rail"> Rails-Style </a>
            <a href="#ducks"> Ducks-Style </a>
            <a href='#lamp'>lamp.config.yml</a>
          </div>
          <a href="#cli">CLI Methods</a>
          <div className="sidenav-indent">
            <a href="#generate">Generate</a>
            <a href="#update">Update</a>
            <a href="#add">Add</a>
            <a href='#sample'>Sample</a>
            <a href='#list'>List</a>
          </div>
        </div>        
        )
      }}
      />
      <DocumentationText />
    
    </div>
  );
};

export default Documentation;
