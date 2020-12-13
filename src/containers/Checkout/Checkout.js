import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
// import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: null,
    error: false,
    loader: false,
    cancel: null,
    continous: null,
    price: 0,
  };

  componentDidMount() {
    // this.setState({ loader: true });
    // axios
    //   .get("orders/-MMUlR9E8aJZnPKoJw-q/ingredients.json")
    //   .then((response) => this.setState({ ingredients: response.data }))
    //   .catch((error) => this.setState({ error: true }));

    // this.setState({ loader: false });

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad', '1']
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients, price });
  }

  continousHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };

  cancelHandler = () => {
    this.setState({ cancel: this.props.history.goBack() });
  };

  render() {
    console.log(this.state.price);

    let checkoutsummary = this.state.error ? (
      <p>Something went wrong!</p>
    ) : (
      <div style={{ margin: "300px auto" }}>
        <Spinner />
      </div>
    );

    if (this.state.ingredients == null) {
      checkoutsummary = (
        <div style={{ margin: "300px auto" }}>
          <Spinner />
        </div>
      );
    } else {
      checkoutsummary = (
        <CheckoutSummary
          ingredients={this.state.ingredients}
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
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
