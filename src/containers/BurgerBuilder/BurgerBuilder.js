import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Redirect, Route } from "react-router-dom";

const INGREDIENTS_PRICE = {
  Salad: 0.6,
  Cheese: 0.8,
  Meat: 1.3,
  Bacon: 0.9,
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: true,
    purchase: false,
    loader: false,
    error: false,
    redirect: null,
  };

  componentDidMount = () => {
    axios
      .get("ingredients.json")
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCount;

    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const price = oldPrice + priceAddition;
    const newPrice = Math.round(price * 100) / 100;

    this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateIngredients = {
      ...this.state.ingredients,
    };
    if (oldCount > 0) {
      const updateCount = oldCount - 1;
      updateIngredients[type] = updateCount;

      const priceAddition = INGREDIENTS_PRICE[type];
      const oldPrice = this.state.totalPrice;
      const price = oldPrice - priceAddition;
      const newPrice = Math.round(price * 10) / 10;

      this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
    }
    this.updatePurchaseState(updateIngredients);
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((num, el) => {
        return num + el;
      }, 0);

    this.setState({ purchasable: sum <= 0 }); //to be false
  };

  purchaseHanlder = (event) => {
    event.preventDefault();
    this.setState({ purchase: !this.state.purchase });
  };

  purchaseContinueHandler = () => {
    this.setState({ loader: true });
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Bemby",
        address: {
          street: "Yogyakarta",
          zipCode: "59155",
          country: "Indonesia",
        },
        email: "asudah@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => this.setState({ loader: false, purchase: false }))
      .catch((error) => this.setState({ loader: false, purchase: false }));

    this.setState({ redirect: <Redirect to="/checkout" /> });
  };

  render() {
    const redirect = this.state.redirect;
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let OrderSummarys = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner margin="300px auto" />
    );

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientsAdded={this.addIngredientHandler}
            ingredientsRemove={this.removeIngredientHandler}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchase={this.purchaseHanlder}
            disabled={disableInfo}
          />
        </Auxiliary>
      );

      OrderSummarys = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchase={this.purchaseHanlder}
          continue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loader) {
      OrderSummarys = <Spinner />;
    }
    console.log(this.props);

    return (
      <Auxiliary>
        {redirect}
        <Modal show={this.state.purchase} purchase={this.purchaseHanlder}>
          {OrderSummarys}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
