import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  orderHandler = (event) => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: "Bemby",
        address: {
          street: "Yogyakarta",
          zipCode: "59155",
          country: "Indonesia",
        },
        email: "asudah@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loader: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ loader: false }));
  };

  render() {
    return (
      <div className={classes.Contact}>
        <h4>Enter Your Contact Data</h4>
        <form>
          <Input
            inputtype={"input"}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <Input
            inputtype={"input"}
            type="email"
            name="email"
            placeholder="Your Mail"
          />
          <Input
            inputtype={"input"}
            type="text"
            name="street"
            placeholder="Street"
          />
          <Input
            inputtype={"input"}
            type="text"
            name="postal"
            placeholder="Postal Code"
          />
        </form>
        {/* <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        /> */}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </div>
    );
  }
}

export default ContactData;
