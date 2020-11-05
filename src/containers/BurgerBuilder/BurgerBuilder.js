import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    ingredients: {
      Salad: 0,
      Cheese: 0,
      Meat: 0,
      Bacon: 0,
    },
    totalPrice: 0,
    purchasable: true,
    purchase: false,
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
    alert("Tareekk Sesss!");
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchase}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchase={this.purchaseHanlder}
            continue={this.purchaseContinueHandler}
          />
        </Modal>
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
  }
}

export default BurgerBuilder;
