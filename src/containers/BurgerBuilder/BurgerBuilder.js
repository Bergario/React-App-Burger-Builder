import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemove={this.removeIngredientHandler}
          price={this.state.totalPrice}
          disabled={disableInfo}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
