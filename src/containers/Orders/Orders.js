import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loader: true,
    error: null,
  };
  componentDidMount() {
    axios
      .get("orders.json")
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        this.setState({ loader: false, orders });
      })
      .catch((err) => this.setState({ error: err, loader: true }));
  }

  render() {
    console.log(this.state.loader);

    let Orders = this.state.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
        />
      );
    });

    if (this.state.error) {
      Orders = <p style={{ margin: "10px" }}>Orders can't be loaded!</p>;
    }

    return <div>{Orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
