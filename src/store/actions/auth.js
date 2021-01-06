import * as actionTypes from "./actionTypes";

export const authStart = (email, password) => {
  return {
    type: actionTypes.AUTH_START,
    email: email,
    password: password,
  };
};
export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS,
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
    dispatch(authStart(email, password));
  };
};
