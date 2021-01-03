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
        dispatch(purchaseBurgerSuccess(response.data, orderData));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const orderDataFail = () => {
  return {
    type: actionTypes.ORDER_DATA_FAILED,
  };
};

export const orderData = (orderData) => {
  return {
    type: actionTypes.ORDER_DATA,
    orderData: orderData,
  };
};

export const startOrderData = () => {
  return (dispatch) => {
    axios
      .get("orders.json")
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        dispatch(orderData(orders));
      })
      .catch((err) => dispatch(orderDataFail()));
  };
};
