import React from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/yaml';
import 'brace/theme/solarized_light';

const DocumentationText = () => {
  const text1 = `Structure: Ducks # Two options: Rails || Ducks

Models:
  - Ducks:

    Slice:
      - Name: String
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    CRUD: false

    Actions:
      - countDucks
      - migrateDucks

    Thunks:
      - getAll:
        - "/api/Ducks"
        - countDucks
      - getOne:
        - "/api/Ducks/:ducks"
        - migrateDucks

  - CobraChicken:

    Slice:
      - Rage: Boolean
      - Goslings: Array
      - Feathers: String

    Actions:
      - attackTarget
      - defecateEverywhere

    Thunks:
      - getAll:
        - "api/geese"
        - countGeese
      - getOne: "api/geese/:gooseId"
`;

  const text2 = `
// lamp.config.yml

...

Models:
  - Ducks:

    Slice:
      - Name: String
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    CRUD: false

...
  `;
  const text3 = `
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
        - getOne: "api/terminator/:terminator"`;

  return (
    <div id="documentation-container" className="form-style">

      <h1 id="reduxgenie">Redux Genie</h1>

      <h3 id="cheatcodesforredux">Summon the Genie!</h3>

      <p>
        Redux Genie is a development tool that writes the boilerplate code for your Redux components. You can create a store from scratch, and then inject new files and their corresponding code into your project through the command line interface. Now you can spend less time managing your Redux store without abstracting its functionality, while avoiding some common errors.
      </p>

      <h2 id="store-declaration">Using this site</h2>

      <p>
        By utilizing our companion website, you can easily generate a YML configuration file that contains the parameters you need to construct your Redux store. Place the YML file within your project's root directory, and then summon the genie to automatically create your front-end boilerplate.
      </p>

      <p>
        Redux Genie makes starting a new project quick and simple, allowing you to get straight to writing your own code.
      </p>

      <p>
        Your wish is our command!
      </p>

      <h2 id="store-declaration">
        Getting Started
      </h2>

      <p>
        To begin, go to your project's root directory in your terminal and write:
      </p>

      <pre>
        <code>$ npm install redux-genie</code>
      </pre>

      <p>
        With Redux Genie now installed, all you need to get started is a YML file.
      </p>

      <h2 id="store-declaration">
        What's a YML file?
      </h2>

      <p>
        A YML file (*.yml) is a human-readable text file that allows you to define the parameters of your project's state. Redux Genie seeks out the <b>lamp.config.yml</b> file in your root directory, and like magic constructs the store according to the parameters it contains!
      </p>

      <div id="d-editor-one">
        <AceEditor
          mode="yaml"
          theme="solarized_light"
          id="submit-page-right"
          value={text1}
          height={'100%'}
          width={'100'}
          editorProps={{ $blockScrolling: true }}
          readOnly={true}
          fontSize={16}
        />
      </div>

      <blockquote>
        <p><i>A sample lamp.config.yml file.</i></p>
      </blockquote>

      <p>
        If this is your first time using a YML file, it is recommended you use our online tool to assist you in building your first one. The YML is a very sensitive file, where a tab off or a misplaced space can prevent the program from rendering the store properly. You should always exercise caution when creating your own YML file from scratch. If you wish to see a sample of a fully functional YML file simply enter:
      </p>

      <pre>
        <code>
          $ genie sample
        </code>
      </pre>

      <p>
        This will generate a sample lamp.config.yml file that you can use as a template to write your own YML.
      </p>

      <p>
        Want to get started building your first YML file using our online tool? Just click here!
      </p>

      <h2 id="store-declaration">
        Structure
      </h2>

      <p>
        Structure determines your folder structure when you create your store. We provide users with two style options - Rails and Ducks.
      </p>

      <p>
        Rails style separates folders for “actions”, “constants”, and “reducers”. It is most useful for smaller apps that won't have a lot of defined models.
      </p>

      <p>
        Ducks style, on the other hand, separates folders per model. This is most useful for large projects or ones that will eventually grow with scale.
      </p>

      <h2 id="store-declaration">
        Models
      </h2>

      <p>
        Models represent large domains of state, e.g. "users" or "countries." If the piece of state is broad enough that it requires its own reducer, then consider it a model.
      </p>

      <p>
        When writing your model names, you should only use alphabetical characters. It should not include spaces, numbers, or special characters.
      </p>

      <p>
        Ideally, they should be written in camelcase, e.g. 'duckDodger' or 'darkwingDuck'.
      </p>

      <h2 id="store-declaration">
        Properties
      </h2>

      <p>
        Properties, also referred to as your model's Slice, represent the categories of your state, e.g. "name", "address", or "phoneNumber" for a user.
      </p>

      <p>Like models, you cannot user numbers or special characters, and you should write them in camel case.</p>

      <h2 id="store-declaration">
        C.R.U.D.
      </h2>

      <p>
        Redux Genie provides basic C.R.U.D. (Create, Read, Update, Delete) routes when it builds your models.
      </p>

      <p>
        If you do not need these routes for a particular model, you can set CRUD to false, and that will prevent Redux Genie from creating them on store generation.
      </p>

      <h2 id="store-declaration">
        Actions
      </h2>

      <p>
        In the YML file, this section is defining your action creators - functions that create actions.
      </p>

      <p>
        Actions are payloads of information that send data from your application to your store; they are the only source of information for the store.
      </p>

      <h2 id="store-declaration">
        Thunks
      </h2>

      <p>
        Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
      </p>

      <p>
        For each model, you can define whether or not it will receive Thunks. Simply add the name of the Thunk and its endpoint, and Redux Genie will take care of the rest!
      </p>

      <p>
        Additionally, you may also choose to have your Thunks written into a seperate file from Actions.
      </p>

      <h2 id="store-declaration">
        Logging
      </h2>

      <p>
        By default, Redux Genie provides basic logging middleware using Redux-logger and Redux-devtools.
      </p>

      <p>
        If you wish, you can disable this option when creating your YML file.
      </p>

{/* <hr />

      <p>Output file structure:</p>

      <pre>
        <div className="code-background">
          <code>
            {` └─┬ store
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

      <h3 id="ducks-style">Ducks Style</h3>

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
      <div id="d-editor-two">
        <AceEditor
          mode="yaml"
          theme="solarized_light"
          id="submit-page-right"
          value={text2}
          height={'100%'}
          width={'100%'}
          editorProps={{ $blockScrolling: true }}
          readOnly={true}
          fontSize={16}
        />
      </div>
      <h3 id="thunks">Thunks</h3>

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

      <h3 id="logging">Logging</h3>

      <p>
        Redux logger is wired into the store by default, but can be excluded.
      </p>

      <pre>
        <code>Logging: false</code>
      </pre>

      <h4>Example of Full Configuration File:</h4>
      <div id="d-editor-three">
        <AceEditor
          mode="yaml"
          theme="solarized_light"
          id="submit-page-right"
          value={text3}
          height={'100%'}
          width={'100%'}
          editorProps={{ $blockScrolling: true }}
          readOnly={true}
          fontSize={16}
        />
      </div>
      <h2 id="cli-interface">CLI interface</h2>

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

      <h4 id="generate">genie update</h4>

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

      <h4 id="add">genie add</h4>

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

      <h4 id="list">genie list ( genie ls )</h4>

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
          <code>
            {`
genie locate <model name> <file type>

        eg: genie locate Dux action types // $ ./store/actions

genie locate <domain name> <file type>

        eg: genie locate navbar reducer // $ ./store/navbar/reducers
`}
          </code>
        </div>
      </pre>

      <h4 id="edit">genie edit</h4>

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
      </pre> */}
    </div>
  );
};

export default DocumentationText;
