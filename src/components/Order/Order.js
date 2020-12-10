import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  let ingredients = [];
  for (let ing in props.ingredients) {
    ingredients.push(ing + "  " + "(" + props.ingredients[ing] + ") ");
  }
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredients.map((ing, key) => {
          return <span key={key}>{ing}</span>;
        })}
      </p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
