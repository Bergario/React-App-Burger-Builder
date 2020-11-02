import React from "react";
import classes from "./BuildControls.module.css";

const BuildControl = (props) => {
  return (
    <div classes={classes.BuildControls}>
      <div>{props.label}</div>
      <button>Less</button>
      <button>More</button>
    </div>
  );
};

export default BuildControl;
