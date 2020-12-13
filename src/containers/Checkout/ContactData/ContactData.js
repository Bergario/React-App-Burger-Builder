import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      dileveryMethod: {
        elementType: "select",
        elementConfig: {
          option: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loader: true,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loader: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ loader: false }));
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updateOrderForm = {
      ...this.state.orderForm,
    };

    const updateFormElement = {
      ...updateOrderForm[inputIdentifier],
    };

    updateFormElement.value = event.target.value;
    updateOrderForm[inputIdentifier] = updateFormElement;
    this.setState({ orderForm: updateOrderForm });
    console.log(updateOrderForm);
  };

  render() {
    let orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    return (
      <div className={classes.Contact}>
        <h4>Enter Your Contact Data</h4>
        <form>
          {orderFormArray.map((element) => {
            return (
              <Input
                key={element.id}
                elementtype={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.inputChangeHandler(event, element.id)}
              />
            );
          })}
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
