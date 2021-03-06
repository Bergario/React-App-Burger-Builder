import { put, delay, call } from "redux-saga/effects";

import * as actions from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
  // yield localStorage.removeItem("token");
  // yield localStorage.removeItem("expiredTime");
  // yield localStorage.removeItem("userId");

  // ALTERNATIF CODE DIATAS JIKA PAKE SAGA
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expiredTime");
  yield call([localStorage, "removeItem"], "userId");

  yield put(actions.logoutSucced());
}

export function* timeOutLogoutSaga(action) {
  console.log(action);
  yield delay(action.timeout);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8UOf3Tf630Q6ackIDZQqRWZIQ32AAZcU";

  if (action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8UOf3Tf630Q6ackIDZQqRWZIQ32AAZcU";
  }

  try {
    const response = yield axios.post(url, authData);

    const expiredDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expiredTime", expiredDate);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.expiredTime(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expired = yield new Date(localStorage.getItem("expiredTime"));
    if (expired <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.expiredTime((expired.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
}
