import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = (email, password) => {
  return {
    type: actionTypes.AUTH_START,
    email: email,
    password: password,
  };
};
export const authSuccess = (tokenId, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: tokenId,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const expiredTime = (timeout) => {
  console.log(timeout);
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, timeout * 1000);
  };
};
export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8UOf3Tf630Q6ackIDZQqRWZIQ32AAZcU";

    if (isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8UOf3Tf630Q6ackIDZQqRWZIQ32AAZcU";
    }

    axios
      .post(url, authData)
      .then((response) => {
        console.log(response.data.expiresIn);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(expiredTime(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
