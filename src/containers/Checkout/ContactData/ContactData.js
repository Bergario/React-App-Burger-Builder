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
        validation: {
          required: true,
          minLength: 2,
          maxLength: 15,
        },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 15,
        },
        valid: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 20,
        },
        valid: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 15,
        },
        valid: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 15,
        },
        valid: false,
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
        valid: false,
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
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateOrderForm[inputIdentifier] = updateFormElement;
    this.setState({ orderForm: updateOrderForm });
    console.log(updateFormElement);
  };

  checkValidity = (value, validation) => {
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }
    if (validation.minLength) {
      isValid = value.length > validation.minLength && isValid;
    }

    return isValid;
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
            console.log(element.config.validation);

            return (
              <Input
                key={element.id}
                elementtype={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                inValid={!element.config.valid}
                shouldValidate={element.config.validation}
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
