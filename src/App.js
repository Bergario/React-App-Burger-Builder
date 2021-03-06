import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./containers/Auth/logout/Logout";
import * as actions from "./store/actions/index";
import { asyncComponent } from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrder = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" component={BurgerBuilder} exact />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" component={BurgerBuilder} exact />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.tokenId !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
