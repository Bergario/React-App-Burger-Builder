import { put, delay } from "redux-saga/effects";
// import delay from "redux-saga";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
  console.log(action);
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expiredTime");
  yield localStorage.removeItem("userId");

  yield put(actions.logoutSucced());
}

export function* timeOutLogoutSaga(action) {
  console.log(action);
  yield delay(action.timeout);
  yield put(actions.logout());
}
