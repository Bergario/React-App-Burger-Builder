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
      {controls.map((ctrl) => {
        console.log(props.disabled["Salad"]);
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
    </div>
  );
};

export default BuildControls;
