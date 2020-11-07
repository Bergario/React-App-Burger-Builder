import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Bacon", type: "Bacon" },
  { label: "Salad", type: "Salad" },
  { label: "Cheese", type: "Cheese" },
  { label: "Meat", type: "Meat" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <h3>
        <strong>Current price : </strong>$ {props.price.toFixed(2)}
      </h3>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            add={() => props.ingredientsAdded(ctrl.type)}
            remove={() => props.ingredientsRemove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        onClick={props.purchase}
        disabled={props.purchasable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
