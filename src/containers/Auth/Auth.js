import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

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
    isSignUp: false,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      return this.props.onSetAuthRedirectPath();
    }
  }

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
    if (validation.minLength) {
      isValid = value.length > validation.minLength && isValid;
    }

    return isValid;
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.formIsValid) {
      this.props.onAuth(
        this.state.orderForm.email.value,
        this.state.orderForm.password.value,
        this.state.isSignUp
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

  switchAuthHanlder = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    let orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = orderFormArray.map((element) => {
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

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p style={{ color: "#c10c0c" }}>{this.props.error}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button clicked={this.submitHandler} btnType="Success">
          {this.state.isSignUp ? "Sign In" : "Sign Up"}
        </Button>
        <br />
        <Button clicked={this.switchAuthHanlder} btnType="Danger">
          Switch to {this.state.isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    tokenId: state.auth.tokenId,
    userId: state.auth.userId,
    error: state.auth.error,
    isAuth: state.auth.tokenId !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.builder.bulding,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(actions.auth(email, password, isSignUp));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
