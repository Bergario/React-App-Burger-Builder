import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  orderData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state.loading,
        loading: true,
      };
    case actionTypes.ORDER_DATA:
      return {
        ...state.orderData,
        orderData: action.orderData,
      };

    default:
      return state;
  }
};

export default reducer;
