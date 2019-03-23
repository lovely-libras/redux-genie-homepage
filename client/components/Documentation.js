import React from "react";
import { Link } from "react-router-dom";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/yaml";
import "brace/theme/solarized_light";

const Documentation = () => {
  const text1 =
`Structure: Ducks # Two options: Rails || Ducks 

        Models: 
          - Dux: 

            Slice:
              - Name: string 
              - Quacking: Boolean 
              - Ducklings: Object 
              - Fly2Gether: Boolean 

            CRUD: false 

            Actions: 
              - countDux 
              - migrateDux 
              - quackOne

            Thunks: 
              - getAll: "/api/Dux" 
              - getOne: "/api/Dux/:dux" 
              - Terminator:

            Slice: 
              - WillBeBack: Boolean 
              - OneLiners: Array 
              - Sequels: Number

            Actions: 
              - killJohnConnor 
              - backInTime 
            Thunks: 
              - getAll: "api/terminator" 
              - getOne: "api/terminator/:terminator"`

  const text2 =`
// lamp.config.yml 

... 

Models: 
  
  - Dux: 
    
    Slice: 

      - Name: string 
      - Quacking: Boolean 
      - Ducklings: Object 
      - Fly2Gether: Boolean 
    CRUD: false 
  
...
  `
  const text3 =`
  Structure: Ducks # Rails || Ducks 
  Thunks: included # thunks in the same file as the actions 
  Logging: false # configures logging middleware 
  
  Models: 
  
    - Dux: 
  
      Slice: 
  
        - Name: string 
        - Quacking: Boolean 
        - Ducklings: Object 
        - Fly2Gether: Boolean 
        
      CRUD: false 
  
      Actions:
        - countDux 
        - migrateDux 
        - quackOne 
        
      Thunks: 
        - getAll: "/api/Dux" 
        - getOne: "/api/Dux/:dux"
  
    - Terminator: 
    
      Slice: 
  
        - WillBeBack: Boolean 
        - OneLiners: Array 
        - Sequels: Number 
        
      Actions: 
        - killJohnConnor 
        -backInTime 
        
      Thunks: 
        - getAll: "api/terminator" 
        - getOne: "api/terminator/:terminator"`
  
                
  return (
    <div id="documenation-container" className="form-style">
      <h1 id="reduxgenie">Redux Genie</h1>

      <h3 id="cheatcodesforredux">cheat codes for redux</h3>

      <p>
        Redux Genie isn't a "starter kit" or a library of helper methods. It
        actually writes your Redux boilerplate code, either creating new files
        or injecting code into existing store files. This makes the writing
        process easier to start, easier to manage as you progress, and less
        error-prone, without abstracting over any functionality of Redux itself.
      </p>

      <p>
        The genie can be comprehensive- generating the whole Redux store from
        the outset of a project- or granular- creating or operating on a
        specific slice of state for an existing project.
      </p>

      <h2>
        Store Declaration at the beginning of a project
      </h2>

      <p>
        To generate a store, Redux Genie's configuration file- lamp.config.yml -
        will need define the total store structure.{" "}
      </p>

      <p>
        Define your slices of state. We refer to them as "Models", but they can
        correspond to database models, domains ("landing page"), features
        ("checkout"), or any other way you want to slice your state. The genie
        automatically generates and configures all CRUD methods with separate
        subreducers for each Model, with Thunks linked to the Redux-Thunk
        middleware calling your defined API endpoints.
      </p>

      <p>
        Choose from the two of the file structures outlined in the Redux FAQs:
        https://redux.js.org/faq/code-structure
      </p>

      <pre>
        <code>File Structure: Rails || Ducks</code>
      </pre>

      <h3>Rails-Style</h3>

      <blockquote>
        <p>
          Rails-style: separate folders for “actions”, “constants”, “reducers”,
          “containers”, and “components”{" "}
        </p>
      </blockquote>

      <p>
        Define the models for the store. In Rails-style, each model will each
        receive its own sub-reducer, and the genie will assign your defined
        types to each sub-reducer.
      </p>

      <p>Full Rails-style lamp.config.yml file: </p>
      <AceEditor
        mode="yaml"
        theme="solarized_light"
        id="submit-page-right"
        value={text1}
        height={"550px"}
        width={"550px"}
        editorProps={{ $blockScrolling: true }}
        readOnly={true}
        fontSize={16}
      />
      <p>
        Place the lamp.config.yml file in the project root directory, navigate
        there, then run:
      </p>

      <pre>
        <code>genie generate store</code>
      </pre>

      <p>Output file structure:</p>

      <pre>
        <div className="code-background">
          <code>
            {
` └─┬ store 
   ├─store.js 
   ├─┬ actions
   │ ├── action_types_for_Terminator.js
   │ └── action_types_for_Dux.js 
   ├─┬ constants 
   │ └── action_constants.js
   └─┬ reducers 
     ├── combine_reducers.js 
     ├── Dux_reducer.js 
     └──Terminator_reducer.js`}
          </code>
        </div>
      </pre>

      <h3>Ducks-Style</h3>

      <blockquote>
        <p>“Ducks”: separate folders per feature or domain</p>
      </blockquote>

      <h3>Options</h3>

      <p>Options to customize the generate call.</p>

      <h4>CRUD = false</h4>

      <p>
        Each model is automatically generated with CRUD methods. These can be
        excluded from the generate call as follows:
      </p>
      
      <AceEditor
        mode="yaml"
        theme="solarized_light"
        id="submit-page-right"
        value={text2}
        height={"320px"}
        width={"550px"}
        editorProps={{ $blockScrolling: true }}
        readOnly={true}
        fontSize={16}
      />

      <h4>Thunks</h4>

      <p>Thunks can optionally be included in the same file as the actions: </p>
      <br />
      <pre>
        <code className="code-background">Thunks: included</code>
      </pre>
      <br />
      <p>
        If "Thunks" are excluded in the model definition, they will be omitted
        from the generate call. These can be added later via "genie update" (see
        below).
      </p>

      <h4>Logging</h4>

      <p>
        Redux logger is wired into the store by default, but can be excluded.
      </p>

      <pre>
        <code>Logging: false</code>
      </pre>

      <h4>Normalizr</h4>

      <p>
        While this will obviously be specific to your use case, the genie can
        begin the wiring for normalizr inside the appropriate store files.
      </p>

      <pre>
        <code>Normalize: Associate:</code>
      </pre>

      <h4>
        Example of Full Configuration File:
      </h4>

      <AceEditor
        mode="yaml"
        theme="solarized_light"
        id="submit-page-right"
        value={text3}
        height={"700px"}
        width={"550px"}
        editorProps={{ $blockScrolling: true }}
        readOnly={true}
        fontSize={16}
      />

      <h2>CLI interface</h2>

      <h4>genie generate</h4>

      <p>
        To initialize a project, write the yaml configuration file and call:
      </p>

      <pre>
        <br />
        <code className="code-background">genie generate</code>
        <br />
        <br />
      </pre>

      <h4>genie update</h4>

      <p>
        After the store is initialized, the genie can add to the store in two
        ways: from the yml configuration file via "genie update," or from the
        command line via "genie add".
      </p>

      <p>To perform a yml update, add or alter the yaml file and then call: </p>

      <pre>
        <br />
        <code className="code-background">genie update store</code>
        <br />
        <br />
      </pre>

      <p>
        The genie will diff the new yml config to previous version and generate
        any required updates.
      </p>

      <p>
        Note: Logging, CRUD, and thunk separation choices cannot be changed
        after initial generate.
      </p>

      <h4>genie add</h4>

      <p>Add directly from the command line, declaring the same information:</p>

      <pre>
        <div className="code-background">
          <code>
{`genie generate model <model name> // generates a model with crud methods 

        eg: genie generate model Terminator // one model
        eg: genie generate model Terminator Dux // two models

Note: will prompt if the root combiner isn't defined in the yaml file.

options: 

--crudless // create store code without defining any crud methods

        eg: genie generate model Dux --crudless

genie generate model <model name> action <action name> 

        eg: genie generate model Terminator action getIsBack

genie generate thunk <thunk name> <thunk endpoints>

        eg: genie generate model Lolz

genie generate domain <feature name>

        eg: genie generate domain 

genie generate thunk <thunk name> <thunk endpoint>

genie generate action <action name> <model assignment> `}
          </code>
        </div>
      </pre>

      <h4>genie list ( genie ls )</h4>

      <p>genie list store</p>

      <p>Returns the total file structure of the store:</p>

      <pre>
        <div className="code-background">
          <code>
{`e.g. (Rails-Style)

├─┬ store
│ ├─┬ actions
│ │ ├── action_types_for_Terminator.js
│ │ └── action_types_for_Dux.js
│ ├─┬ constants
│ │ └── action_constants.js
│ └─┬ reducers
│   ├── combine_reducers.js
│   ├── Dux_reducer.js
│   └── Terminator_reducer.js
└── store.js`}
          </code>
        </div>
      </pre>

      <p>genie list models genie list actions mine genie list thunks</p>

      <h4 id="genielocategenieloc">genie locate ( genie loc )</h4>

      <p>Returns the file path of a store sub-directory to the command line.</p>

      <pre>
        <div className="code-background">
          <code class="bash language-bash">
{`
genie locate <model name> <file type>

        eg: genie locate Dux action types // $ ./store/actions

genie locate <domain name> <file type>

        eg: genie locate navbar reducer // $ ./store/navbar/reducers
`}
          </code>
        </div>
      </pre>

      <h4>genie lamp</h4>

      <p>Prints a sample lamp.config.yml file. </p>

      <h4>genie edit</h4>

      <p>Edit the template files.</p>

      <pre>
        <div className="code-background">
          <code>
{`
genie edit <File Structure> <file type>

genie edit ducks actions
`}
          </code>
        </div>
      </pre>
    </div>
  );
};

export default Documentation;
