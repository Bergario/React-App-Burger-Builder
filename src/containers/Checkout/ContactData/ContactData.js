import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/index";
import { objectUpdate, checkValidity } from "../../../shared/utility";

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
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          isEmail: true,
          required: true,
          minLength: 2,
          maxLength: 15,
        },
        valid: false,
        touched: false,
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
        touched: false,
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
          isNumeric: true,
        },
        valid: false,
        touched: false,
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
        touched: false,
      },
      dileveryMethod: {
        elementType: "select",
        elementConfig: {
          option: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {
          required: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
    },
    loader: true,
    formIsValid: false,
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
      ingredients: this.props.ings,
      totalPrice: this.props.totalPrc,
      orderData: formData,
      userId: this.props.userId,
    };

    if (this.state.formIsValid) {
      this.props.onPurchaseBurgerStart(order, this.props.token);
      this.props.history.push("/");
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

  inputChangeHandler = (event, inputIdentifier) => {
    const updateFormElement = objectUpdate(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
      }
    );

    const updateOrderForm = objectUpdate(this.state.orderForm, {
      [inputIdentifier]: updateFormElement,
    });

    let formIsValid = true;
    for (let key in updateOrderForm) {
      formIsValid = updateOrderForm[key].valid && formIsValid;
    }
    this.setState({ orderForm: updateOrderForm, formIsValid });
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
                inValid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                error={`Please enter a valid ` + element.id}
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

const mapStateToProps = (state) => {
  return {
    ings: state.builder.ingredients,
    totalPrc: state.builder.totalPrice,
    loader: state.orders.loader,
    token: state.auth.tokenId,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurgerStart: (orderData, token) =>
      dispatch(orderActions.purchaseBurgerStart(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
