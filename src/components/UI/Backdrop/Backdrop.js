import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = (props) =>
  props.show ? (
    <div onClick={props.purchase} className={classes.Backdrop}></div>
  ) : null;

export default Backdrop;
