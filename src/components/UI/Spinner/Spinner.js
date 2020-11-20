import React from "react";
import classes from "./Spinner.module.css";

const Spinner = (props) => {
  return (
    <div style={{ margin: props.margin }} className={classes.Loader}></div>
  );
};

export default Spinner;
