import * as actionTypes from "../actions/actionTypes";
import { objectUpdate } from "./utility";

const initialState = {
  orders: [],
  loading: true,
  orderData: [],
  error: null,
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  const purchaseUpdate = {
    loading: false,
    orders: state.orders.concat(newOrder),
  };
  return objectUpdate(state, purchaseUpdate);
};

const purchaseBurgerFail = (state, action) => {
  return objectUpdate(state, { loading: true, error: action.error });
};

const startOrder = (state) => {
  return objectUpdate(state, { loading: true });
};

const orderSucces = (state, action) => {
  const fetchData = {
    orderData: action.orderData,
    loading: false,
    error: action.error,
  };
  return objectUpdate(state, fetchData);
};

const orderFailed = (state) => {
  return objectUpdate(state, { loading: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.START_ORDER_DATA:
      return startOrder(state);
    case actionTypes.ORDER_DATA_SUCCESS:
      return orderSucces(state, action);

    case actionTypes.ORDER_DATA_FAILED:
      return orderFailed(state);
    default:
      return state;
  }
};

export default reducer;
