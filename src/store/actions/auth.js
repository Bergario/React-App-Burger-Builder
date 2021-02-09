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
  // localStorage.removeItem("token");
  // localStorage.removeItem("expiredTime");
  // localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
    loading: true,
  };
};

export const logoutSucced = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
    path: "/",
    loading: false,
  };
};

export const expiredTime = (timeout) => {
  return {
    type: actionTypes.AUTH_TIMEOUT,
    timeout: timeout * 1000,
  };
};

// MENGGUNAKAN SAGA
export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp,
  };
};

// JIKA MENGGUNAKAN REDUX BIASA
// export const auth = (email, password, isSignUp) => {
//   return (dispatch) => {
//     dispatch(authStart());
//     const authData = {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     };

//     let url =
//       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8UOf3Tf630Q6ackIDZQqRWZIQ32AAZcU";

//     if (isSignUp) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8UOf3Tf630Q6ackIDZQqRWZIQ32AAZcU";
//     }

//     axios
//       .post(url, authData)
//       .then((response) => {
//         const expiredDate = new Date(
//           new Date().getTime() + response.data.expiresIn * 1000
//         );
//         localStorage.setItem("token", response.data.idToken);
//         localStorage.setItem("userId", response.data.localId);
//         localStorage.setItem("expiredTime", expiredDate);
//         dispatch(authSuccess(response.data.idToken, response.data.localId));
//         dispatch(expiredTime(response.data.expiresIn));
//       })
//       .catch((err) => {
//         dispatch(authFail(err.response.data.error.message));
//       });
//   };
// };

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expired = new Date(localStorage.getItem("expiredTime"));
      if (expired <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          expiredTime((expired.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
