import * as actionTypes from "../actions/actionTypes";
import { objectUpdate } from "./utility";

const initialState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return objectUpdate(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return objectUpdate(state, {
    error: null,
    loading: false,
    tokenId: action.tokenId,
    userId: action.userId,
  });
};
const authFail = (state, action) => {
  return objectUpdate(state, { error: action.error, loading: false });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    default:
      return state;
  }
};
