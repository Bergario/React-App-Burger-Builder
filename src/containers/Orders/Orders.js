import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrderData(this.props.token);
  }

  render() {
    let Orders = this.props.loader ? <Spinner margin="300px auto" /> : null;
    if (!this.props.loader) {
      if (this.props.orders.length === 0) {
        Orders = (
          <p style={{ padding: "100px", textAlign: "center" }}>
            Order Data is Empty
          </p>
        );
      } else {
        Orders = this.props.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.totalPrice}
              name={order.orderData.name}
            />
          );
        });
      }
    }

    if (this.props.error) {
      Orders = <p style={{ margin: "10px" }}>Orders can't be loaded!</p>;
    }

    return <div>{Orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orderData,
  loader: state.orders.loading,
  error: state.orders.error,
  token: state.auth.tokenId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrderData: (token) => dispatch(orderActions.fetchOrderData(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
