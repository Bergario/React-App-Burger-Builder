import { takeEvery } from "redux-saga/effects";
import { logoutSaga, timeOutLogoutSaga, authUserSaga } from "./auth";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_TIMEOUT, timeOutLogoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
