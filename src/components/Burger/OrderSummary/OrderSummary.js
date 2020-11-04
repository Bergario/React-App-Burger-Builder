import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const OrderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        {igKey} : {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <div>
        <h4>Your Order</h4>
        <p>Delicious Burger with your selected ingredients!</p>
        <ul>{ingredients}</ul>
        <button>Checkout</button>
        <button onClick={props.purchase}>Back</button>
      </div>
    </Auxiliary>
  );
};

export default OrderSummary;
