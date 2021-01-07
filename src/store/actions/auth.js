import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = (email, password) => {
  return {
    type: actionTypes.AUTH_START,
    email: email,
    password: password,
  };
};
export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: data,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8UOf3Tf630Q6ackIDZQqRWZIQ32AAZcU",
        authData
      )
      .then((response) => {
        console.log(response.data);
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
