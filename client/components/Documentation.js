import React from "react";
import { Link } from "react-router-dom";
import brace from "brace";
import AceEditor from "react-ace";
import DocumentationText from "./DocumentationText";

import "brace/mode/yaml";
import "brace/theme/solarized_light";

const Documentation = () => {
  return (
    <div id="docs-container">
      <div className="sidenav">
        <a href="#top">About</a>
        <a href="#store-declaration">Store Declaration</a>
        <div className="sidenav-indent">
          <a href="#rails-style">Rails Style</a>
          <a href="#ducks-style">Ducks Style</a>
          <a href="#thunks">Thunks</a>
          <a href="#logging">Logging</a>
        </div>
        <a href="#cli-interface">CLI Interface</a>
        <div className="sidenav-indent">
          <a href="#generate">Generate</a>
          <a href="#update">Update</a>
          <a href="#add">Add</a>
          <a href="#list">List</a>
          <a href="#locate">Locate</a>
          <a href="#edit">Edit</a>
        </div>
      </div>
      <DocumentationText />
    </div>
  );
};

export default Documentation;
