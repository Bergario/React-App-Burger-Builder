import React from "react";
import Layout from "../../hoc/Layout/Layout";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.Checkout}>
      <h1>We hope it tastes well!</h1>
      <Layout>
        <div style={{ width: "100%", margin: "auto" }}>
          <Burger ingredients={props.ingredients} />
        </div>
        <Button btnType="Danger" clicked={props.cancelCheckout}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.continousCheckout}>
          Continues
        </Button>
      </Layout>
    </div>
  );
};

export default CheckoutSummary;
