import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData: orderData,
    orderId: id,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = (orderData) => {
  return (dispatch) => {
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const orderDataFail = (err) => {
  return {
    type: actionTypes.ORDER_DATA_FAILED,
    error: err,
  };
};

export const orderDataSuccess = (orderData) => {
  return {
    type: actionTypes.ORDER_DATA_SUCCESS,
    orderData: orderData,
  };
};

export const startOrderData = () => {
  return {
    type: actionTypes.START_ORDER_DATA,
    loading: true,
  };
};

export const fetchOrderData = () => {
  return (dispatch) => {
    dispatch(startOrderData());
    axios
      .get("orders.json")
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        dispatch(orderDataSuccess(orders));
      })
      .catch((error) => dispatch(orderDataFail(error)));
  };
};
