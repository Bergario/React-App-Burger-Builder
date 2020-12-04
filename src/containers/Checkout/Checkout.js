import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
// import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends Component {
  state = {
    ingredients: null,
    error: false,
    loader: false,
    cancel: null,
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
    for (let param of query.entries()) {
      //['salad', '1']
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients });
  }

  cancelHandler = () => {
    this.setState({ cancel: this.props.history.goBack("/burgerbuilder") });
  };

  render() {
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
        />
      );
    }

    return <div>{checkoutsummary}</div>;
  }
}

export default Checkout;
