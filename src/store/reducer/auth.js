import * as actionTypes from "../actions/actionTypes";
import { objectUpdate } from "../../shared/utility";

const initialState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
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

const authLogout = (state, action) => {
  return objectUpdate(state, {
    tokenId: null,
    userId: null,
    loading: false,
    authRedirectPath: action.path,
  });
};

const setAuthRedirectPath = (state, action) => {
  return objectUpdate(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    default:
      return state;
  }
};

export default reducer;
