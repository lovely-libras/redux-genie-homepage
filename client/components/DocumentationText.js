import React from 'react';
import Gist from 'react-gist';

const DocumentationText = () => {
  
  const gistId = '6bab6ddad0f662366ff178850fe628d1'

  return (
    <div id="documentation-container" className="form-style">
      
      <h1 >Redux Genie</h1>
      <p>
Made for developers creating Javascript applications with Redux.
</p>

<p>
Redux Genie isn't a "starter kit" or a library of helper methods. It actually writes your Redux boilerplate code, either creating new files or injecting code into an existing store files. This makes the writing process easier to start, easier to manage as you progress, and less error-prone, without abstracting over the functionality of Redux itself.
</p>
<p>
The genie can be comprehensive- generating the whole Redux store from the onset of a project- or granular- creating or operating on a specific slice of state for an existing project.
</p>
<code>
$ npm install -g redux-genie
</code>



<h2 id='declaration'>Store Declaration at the beginning of a project</h2>
<p>
To generate a store, Redux Genie's configuration file- lamp.config.yml - will define the total store structure. 
</p>
<p>
Choose from one of two file structures:
</p>
<code>
Structure: Rails || Ducks
</code>
<p>
Define the slices of state. We refer to them as "Models", but they can correspond to database models, domains (e.g. "landing page"), features (e.g. "checkout"), or any other way you want to organize state. The genie automatically generates and configures all CRUD methods with separate subreducers for each Model, with Thunks linked to the Redux-Thunk middleware calling your defined API endpoints.
</p>

<Gist id={gistId} file='sample_yaml.md'/>

<p>
Place the lamp.config.yml file in the project root directory, then run:
</p>

<code>
$ genie generate store
</code>

<h3 id='rail'> Rails-Style </h3>

<blockquote> Rails-style: separate folders for “actions”, “constants”, and “reducers.” </blockquote>

Generated file structure:

<Gist id={gistId} file='railsFileStr.md' />

<h3 id='ducks'> Ducks-Style </h3>

<blockquote> “Ducks”: separate folders per feature or domain </blockquote>

Generated file structure:

<Gist id={gistId} file='ducksFileStr.md' />

<h2 id="lamp"> <i> lamp.config.yml options </i> </h2>

<h3> tldr : Example of Full Configuration File: </h3>

<Gist id={gistId} file='fullconfig.md' />

<h3> <i> Options to customize the generate call. </i> </h3>

<h3> CRUD: false </h3>

<p>
Each model is automatically generated with CRUD methods. These can be excluded as follows:
</p>

<Gist id={gistId} file='crud.md' />


<h3> Thunks: included </h3>
<p>
Thunks can be included in the same file as the actions: 
</p>
<p>
Note: if "Thunks" are excluded in the model definition, they will be omitted from the generate call. These can be added later via "genie update" (see below).
</p>

<Gist id={gistId} file='thunks.md' />

<h3> Logging: false </h3>

Redux logger is wired into the store by default, but can be excluded:

<Gist id={gistId} file='logging.md' />

<h2 id="cli"> CLI  </h2>

<h3 id='generate'> $ genie generate </h3>

Generate a new store. Requires lamp.config.yml file in the project root directory.

<h3 id='update'> $ genie update </h3>

Call after making changes to the lamp.config. The genie will diff the new yml config to previous version and generate required code injections.
<p>
Note: You cannot change the file structure that was created when the store was generated.
</p>

<h3 id='add'> $ genie add </h3>

Add specific properties or thunks to an existing model, or add an entirely new model with defined properties to an existing store directly from the CLI.

<p>
<code>
genie add [-m]/[-M] model_name [-a] action_name [-t] thunk_name
</code>
</p>

<p>
Add a new model:
</p>
<code>
<p>
 $ genie add --newmodel Terminator
</p>
<p>
 $ genie add -M Terminator
</p>
</code>
<p>
Add actions in new model call:
</p>
<code>
<p>
  genie add --newmodel Terminator -a getIsBack -a killJohnConnor 
</p>
<p>
  genie add --newmodel Terminator -a getIsBack --noCRUD
</p>
</code>

Add an action to specific model:

<code>
<p>
  genie add --action getIsBack -model Terminator 
</p> 
<p>     
  genie add -a getIsBack -m Terminator
</p>
</code>

Add a thunk to a specific model:

<code>
<p>
  genie add --thunk countDux --model Dux
</p>
<p>
  genie add -t countDux -m Dux
</p>
</code>

<h3 id='sample'> $ genie sample </h3>
<code>
$ genie sample
</code>
<p>
Outputs a lamp.config.yml file to the current working directory.
</p>

<h3 id='list'> $ genie list </h3>

<p>
Prints the store file structure: 
</p>

<Gist id={gistId} file='ducksFileStr.md' />

<h3> $ genie help (genie h) </h3>

<p>
Access the man entry
</p>
    
    </div>
  );
  
};

export default DocumentationText;

