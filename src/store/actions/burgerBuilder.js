import * as actionTypes from "./actionTypes";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
    totalPrice: 0,
  };
};

// USE REDUX SAGA
export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};

// USE GENERAL REDUX - MOVE TO SAGA/BURGERBUILDER
// export const initIngredients = () => {
//   return (dispatch) => {
//     axios
//       .get("ingredients.json")
//       .then((response) => dispatch(setIngredients(response.data)))
//       .catch((error) => {
//         dispatch(fetchIngredientsFailed());
//       });
//   };
// };
