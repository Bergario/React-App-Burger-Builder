import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

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
        <p>
          <strong>Total Price: $ {props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={props.purchase} btnType="Danger">
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.continue}>
          CONTINUE
        </Button>
      </div>
    </Auxiliary>
  );
};

export default OrderSummary;
