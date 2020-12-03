import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/burgerbuilder" component={BurgerBuilder} exact />
            <Route path="/checkout" component={Checkout} />
            <Redirect from="/" to="/burgerbuilder" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
