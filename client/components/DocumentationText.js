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
        Redux Genie is a development tool that writes the boilerplate code for
        your Redux components. You can create a store from scratch, and then
        inject new files and their corresponding code into your project through
        the command line interface. Now you can spend less time managing your
        Redux store without abstracting its functionality, while avoiding some
        common errors.
      </p>
      <h2 id="store-declaration">Using this site</h2>
      <p>
        By utilizing our companion website, you can easily generate a YML
        configuration file that contains the parameters you need to construct
        your Redux store. Place the YML file within your project's root
        directory, and then summon the genie to automatically create your
        front-end boilerplate.
      </p>
      <p>
        Redux Genie makes starting a new project quick and simple, allowing you
        to get straight to writing your own code.
      </p>
      <p>Your wish is our command!</p>
      <h2 id="store-declaration">Getting Started</h2>
      <p>
        To begin, go to your project's root directory in your terminal and
        write:
      </p>
      <pre>
        <code>$ npm install redux-genie</code>
      </pre>
      <p>
        With Redux Genie now installed, all you need to get started is a YML
        file. It is recommended you use our online tool to assist you in
        building one - just click here.
      </p>
      <p>
        Otherwise, you can skip to the section below about using the command
        line interface.
      </p>
      <h2 id="store-declaration">Structure</h2>
      <p>
        Structure determines your folder structure when you create your store.
        We provide users with two style options - Rails and Ducks.
      </p>
      <p>
        Rails style separates folders for “actions”, “constants”, and
        “reducers”. It is most useful for smaller apps that won't have a lot of
        defined models.
      </p>
      <p>
        Ducks style, on the other hand, separates folders per model. This is
        most useful for large projects or ones that will eventually grow with
        scale.
      </p>
      <h2 id="store-declaration">Models</h2>
      <p>
        Models represent large domains of state, e.g. "users" or "countries." If
        the piece of state is broad enough that it requires its own reducer,
        then consider it a model.
      </p>
      <p>
        When writing your model names, you should only use alphabetical
        characters. It should not include spaces, numbers, or special
        characters.
      </p>
      <p>
        Ideally, they should be written in camelcase, e.g. 'duckDodger' or
        'darkwingDuck'.
      </p>
      <h2 id="store-declaration">Properties</h2>
      <p>
        Properties, also referred to as your model's Slice, represent the
        categories of your state, e.g. "name", "address", or "phoneNumber" for a
        user.
      </p>
      <p>
        Like models, you cannot user numbers or special characters, and you
        should write them in camel case.
      </p>
      <h2 id="store-declaration">C.R.U.D.</h2>
      <p>
        Redux Genie provides basic C.R.U.D. routes when it builds your models.
      </p>
      <p>
        If you do not need these routes for a particular model, you can set CRUD
        to false, and that will prevent Redux Genie from creating them on store
        generation.
      </p>
      <h2 id="store-declaration">Actions</h2>
      <p>
        In the YML file, this section is defining your action creators -
        functions that create actions.
      </p>
      <p>
        Actions are payloads of information that send data from your application
        to your store; they are the only source of information for the store.
      </p>
      <h2 id="store-declaration">Thunks</h2>
      <p>
        Redux Thunk middleware allows you to write action creators that return a
        function instead of an action. The thunk can be used to delay the
        dispatch of an action, or to dispatch only if a certain condition is
        met.
      </p>
      <p>
        For each model, you can define whether or not it will receive Thunks.
        Simply add the name of the Thunk and its endpoint, and Redux Genie will
        take care of the rest!
      </p>
      <p>
        Additionally, you may also choose to have your Thunks written into a
        seperate file from Actions.
      </p>
      <h2 id="store-declaration">Logging</h2>
      <p>
        By default, Redux Genie provides basic logging middleware using
        Redux-logger and Redux-devtools.
      </p>
      <p>
        If you wish, you can disable this option when creating your YML file.
      </p>
      <h2 id="store-declaration">Using the Command Line Interface</h2>
      <p>
        With your YML file prepared or downloaded, it is time to set up your
        project!
      </p>
      <p>
        Begin by importing the lamp.config.yml file into the root directory of
        your project.
      </p>
      <p>
        Once placed, open up your preferred terminal and change directories to
        your project's root.
      </p>
      <p>Now we can begin executing commands to generate your Redux store.</p>
      <h2 id="store-declaration">Genie Generate</h2>
      <p>
        <code>$ genie generate</code>
      </p>
      <p>
        Genie generate instructs Redux Genie to look at the lamp.config.yml in
        your current directory, and then proceeds with constructing the store's
        boilerplate according to the YML's parameters.
      </p>

      <p>
        Once invoked, you're done! You can begin editing the boilerplate to fit
        your project's needs.
      </p>

      <h2 id="store-declaration">Genie Update</h2>

      <p>
        <code>$ genie update</code>
      </p>

      <p>
        Should you need to make changes to your models once you've already run
        genie generate, you can edit the lamp.config.yml and then run the update
        command.
      </p>

      <h2 id="store-declaration">Genie Add</h2>

      <p>
        <code>$ genie add -m </code>
      </p>

      <p>
        The add command allows you to add specific properties or thunks to an
        existing model, or add an entirely new model with defined properties to
        an existing store.
      </p>

      <p>To create a new model, use -M flag followed by the model name.</p>

      <p>
        Additionally, if you'd like to create an action or thunk with that new
        model, use the -a or -t flag respectively along with a name.
      </p>

      <p>
        To create a new model without CRUD routes, append the --noCRUD argument
        to the command.
      </p>

      <p>To update an existing, use -m.</p>
    </div>
  );
};

export default DocumentationText;
