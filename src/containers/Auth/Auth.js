import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    orderForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        validation: {
          required: true,
          error: "Input a valid Email!",
          minLength: 0,
        },
        valid: false,
        touched: false,
        value: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        validation: {
          required: true,
          minLength: 0,
          error: "Password too low!",
        },
        valid: false,
        touched: false,
        value: "",
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
    console.log(event.target.value);

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
    console.log(isValid);
    if (validation.minLength) {
      isValid = value.length > validation.minLength && isValid;
    }

    return isValid;
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.formIsValid);
    if (this.state.formIsValid) {
      this.props.onAuth(
        this.state.orderForm.email.value,
        this.state.orderForm.password.value
      );
    } else {
      const updateOrderForm = {
        ...this.state.orderForm,
      };
      for (let key in updateOrderForm) {
        const touched = updateOrderForm[key];
        touched.touched = true;
        this.setState({ touched: touched.touched });
      }
    }
  };

  render() {
    let orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    const form = orderFormArray.map((element) => {
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
        <Button clicked={this.submitHandler} btnType="Success">
          Submit
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => {
      dispatch(actions.auth(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Auth);
