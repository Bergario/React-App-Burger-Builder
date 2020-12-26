import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  state = {
    purchase: false,
    loader: false,
    error: false,
  };

  componentDidMount = () => {
    // if (!this.state.ingredients) {
    //   axios
    //     .get("ingredients.json")
    //     .then((response) => this.setState({ ingredients: response.data }))
    //     .catch((error) => {
    //       this.setState({ error: true });
    //     });
    // }
  };

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updateCount = oldCount + 1;
  //   const updateIngredients = {
  //     ...this.props.ings,
  //   };
  //   updateIngredients[type] = updateCount;

  //   const priceAddition = INGREDIENTS_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const price = oldPrice + priceAddition;
  //   const newPrice = Math.round(price * 100) / 100;

  //   this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(updateIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updateIngredients = {
  //     ...this.props.ings,
  //   };
  //   if (oldCount > 0) {
  //     const updateCount = oldCount - 1;
  //     updateIngredients[type] = updateCount;

  //     const priceAddition = INGREDIENTS_PRICE[type];
  //     const oldPrice = this.state.totalPrice;
  //     const price = oldPrice - priceAddition;
  //     const newPrice = Math.round(price * 10) / 10;

  //     this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
  //   }
  //   this.updatePurchaseState(updateIngredients);
  // };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((num, el) => {
        return num + el;
      }, 0);

    return sum <= 0; //to be false
  };

  purchaseHanlder = (event) => {
    event.preventDefault();
    this.setState({ purchase: !this.state.purchase });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
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

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={(type) => this.props.onIngredientAdded(type)}
            ingredientsRemove={this.props.onIngredientRemoved}
            price={this.props.totalPrc}
            purchasable={this.updatePurchaseState(this.props.ings)}
            purchase={this.purchaseHanlder}
            disabled={disableInfo}
          />
        </Auxiliary>
      );

      OrderSummarys = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.totalPrc}
          purchase={this.purchaseHanlder}
          continue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loader) {
      OrderSummarys = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchase} purchase={this.purchaseHanlder}>
          {OrderSummarys}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrc: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
