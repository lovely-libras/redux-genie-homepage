import React from "react";

const StageZero = (props) => {
  return (
    <div className="form-style" id="stage-zero-container">
      <h1>The Magic Lamp</h1>
      <div id="stage-zero-text">
        <p>
          This editor will guide you through creating a configuration file for
          Redux Genie.
        </p>
        <p>
          One model at a time, enter in your models' name and properties. You'll
          also be asked about CRUD actions types and creators, file structure,
          and additional middleware.
        </p>
        <p>
          Make a mistake? Don't worry, you can always edit the file after it's
          created, just follow the syntax specifications in the comments.
        </p>
      </div>
      <button className="btn" id="lamp-button">
        <img
          id="lamp-button-image"
          onClick={() => props.handleStage()}
          src={
            "https://flaticons.net/gd/makefg.php?i=icons/Miscellaneous/Genie-Lamp.png&r=255&g=255&b=255"
          }
        />
      </button>
    </div>
  );
};

export default StageZero;
