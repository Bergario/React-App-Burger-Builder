import React, { Component } from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
// import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

class Checkout extends Component {
  state = {
    error: false,
  };
  continousHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };

  cancelHandler = () => {
    this.setState({ cancel: this.props.history.goBack() });
  };

  render() {
    let checkoutsummary = this.state.error ? (
      <p>Something went wrong!</p>
    ) : (
      <div style={{ margin: "300px auto" }}>
        <Spinner />
      </div>
    );

    if (this.props.ings == null) {
      checkoutsummary = (
        <div style={{ margin: "300px auto" }}>
          <Spinner />
        </div>
      );
    } else {
      checkoutsummary = (
        <CheckoutSummary
          ingredients={this.props.ings}
          cancelCheckout={this.cancelHandler}
          continousCheckout={this.continousHandler}
        />
      );
    }

    return (
      <div>
        {checkoutsummary}
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ings: state.builder.ingredients,
    totalPrc: state.builder.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
