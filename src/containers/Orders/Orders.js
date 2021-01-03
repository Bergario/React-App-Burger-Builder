import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/index";

class Orders extends Component {
  state = {
    loader: true,
  };
  componentDidMount() {
    this.props.onStartOrderData();
  }

  render() {
    console.log(this.state.loader);

    let Orders = this.props.orders.map((order) => {
      console.log(order);
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
          name={order.orderData.name}
        />
      );
    });
    if (!this.props.orders) {
      Orders = null;
    }

    if (this.state.error) {
      Orders = <p style={{ margin: "10px" }}>Orders can't be loaded!</p>;
    }

    return <div>{Orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orderData,
  loader: state.orders.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onStartOrderData: () => dispatch(orderActions.startOrderData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
