import React from "react";
import { Link } from "react-router-dom";
import brace from "brace";
import AceEditor from "react-ace";
import DocumentationText from './DocumentationText';

import "brace/mode/yaml";
import "brace/theme/solarized_light";

const Documentation = () => {
                
  return (
    <DocumentationText />
  );
};

export default Documentation;
