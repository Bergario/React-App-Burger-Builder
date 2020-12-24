import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  let errorElement = null;

  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    errorElement = (
      <p className={classes.Errormessage}>Please enter a valid {props.error}</p>
    );
  }

  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        >
          <option value="">Select ...</option>
          {props.elementConfig.option.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorElement}
    </div>
  );
};

export default Input;
