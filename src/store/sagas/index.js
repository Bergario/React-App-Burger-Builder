import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
  logoutSaga,
  timeOutLogoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerStartSaga, fetchOrderDataSaga } from "./order";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  // yield takeEvery(actionTypes.AUTH_TIMEOUT, timeOutLogoutSaga);
  // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  // yield takeEvery(actionTypes.AUTH_INITIAL_STATE, authCheckStateSaga);

  // CARA LAIN CODE DIATAS
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_TIMEOUT, timeOutLogoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_INITIAL_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  // yield takeEvery(actionTypes.PURCHASE_BURGER_START, purchaseBurgerStartSaga);
  // ALTERNATIF CODE DIATAS supaya tdk selalu dieksekusi
  yield takeLatest(actionTypes.PURCHASE_BURGER_START, purchaseBurgerStartSaga);
  yield takeEvery(actionTypes.FETCH_ORDER, fetchOrderDataSaga);
}
