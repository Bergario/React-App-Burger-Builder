import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* purchaseBurgerStartSaga(action) {
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrderDataSaga(action) {
  yield put(actions.startOrderData());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo=  "' +
    action.userId +
    '" ';

  try {
    const response = yield axios.get("orders.json" + queryParams);
    let orders = [];
    for (let key in response.data) {
      orders.push({ ...response.data[key], id: key });
    }

    yield put(actions.orderDataSuccess(orders));
  } catch (err) {
    yield put(actions.orderDataFail(err));
  }
}
