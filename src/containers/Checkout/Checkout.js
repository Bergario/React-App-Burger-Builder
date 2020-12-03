import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import axios from "../../axios-orders";

class Checkout extends Component {
  state = {
    ingredients: "",
  };

  componentDidMount() {
    axios
      .get("orders/-MMUlR9E8aJZnPKoJw-q/ingredients.json")
      .then((response) => this.setState({ ingredients: response.data }));
  }

  render() {
    console.log(this.state.ingredients);

    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;
