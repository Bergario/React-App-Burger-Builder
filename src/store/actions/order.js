import * as actionTypes from "./actionTypes";

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

// USE REDUX SAGA
export const purchaseBurgerStart = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    orderData: orderData,
    token: token,
  };
};

// USE GENERAL REDUX - MOVE TO SAGAS/ORDER
// export const purchaseBurgerStart = (orderData, token) => {
//   return (dispatch) => {
//     axios
//       .post("/orders.json?auth=" + token, orderData)
//       .then((response) => {
//         dispatch(purchaseBurgerSuccess(response.data.name, orderData));
//       })
//       .catch((error) => {
//         dispatch(purchaseBurgerFail(error));
//       });
//   };
// };

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
  };
};

// USE REDUX SAGA
export const fetchOrderData = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDER,
    token: token,
    userId: userId,
  };
};

// USE GENERAL REDUX - MOVE TO SAGAS/ORDER
// export const fetchOrderData = (token, userId) => {
//   return (dispatch) => {
//     dispatch(startOrderData());
//     const queryParams =
//       "?auth=" + token + '&orderBy="userId"&equalTo=  "' + userId + '" ';

//     axios
//       .get("orders.json" + queryParams)
//       .then((response) => {
//         let orders = [];
//         for (let key in response.data) {
//           orders.push({ ...response.data[key], id: key });
//         }
//         dispatch(orderDataSuccess(orders));
//       })
//       .catch((error) => dispatch(orderDataFail(error)));
//   };
// };
