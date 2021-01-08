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
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
