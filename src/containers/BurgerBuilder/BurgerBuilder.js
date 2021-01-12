import React, { Component } from "react";
import { connect } from "react-redux";

import * as burgerBuilderActions from "../../store/actions/index";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchase: false,
  };

  componentDidMount = () => {
    this.props.onIntIngredients();
  };

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
    if (this.props.isAuth) {
      this.setState({ purchase: !this.state.purchase });
    } else {
      this.props.history.push("/auth");
    }
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

    let burger = this.props.error ? (
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
            isAuthenticated={this.props.isAuth}
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
    ings: state.builder.ingredients,
    totalPrc: state.builder.totalPrice,
    error: state.builder.error,
    isAuth: state.auth.tokenId !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onIntIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
