import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Axios from "../../axios-orders";

export default class Orders extends Component {
  state = {
    orders: [],
    loader: true,
  };
  componentDidMount() {
    Axios.get("orders.json")
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        this.setState({ loader: false, orders });
      })
      .catch((err) => err);
  }

  render() {
    const Orders = this.state.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
        />
      );
    });

    return <div>{Orders}</div>;
  }
}
