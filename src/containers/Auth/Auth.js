import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";

export default class Auth extends Component {
  state = {
    orderForm: {
      email: {
        elementType: "email",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        validation: {
          required: true,
          error: "Input a valid Email!",
          minLength: 2,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "password",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        validation: {
          required: true,
          minLength: 6,
          error: "Password too low!",
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
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
    updateFormElement.touched = true;
    updateOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for (let key in updateOrderForm) {
      formIsValid = updateOrderForm[key].valid && formIsValid;
    }
    this.setState({ orderForm: updateOrderForm, formIsValid });
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
    console.log(this.state.orderForm.email.touched);

    let orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    const form = orderFormArray.map((element) => {
      console.log(element.config.touched);

      return (
        <Input
          key={element.id}
          elementtype={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          inValid={!element.config.valid}
          shouldValidate={element.config.validation}
          touched={element.config.touched}
          error={element.config.validation.error}
          changed={(event) => this.inputChangeHandler(event, element.id)}
        />
      );
    });

    return (
      <div className={classes.Auth}>
        {form}
        <Button btnType="Success">Login</Button>
      </div>
    );
  }
}
