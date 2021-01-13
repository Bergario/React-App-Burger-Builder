import * as actionTypes from "../actions/actionTypes";
import { objectUpdate } from "./utility";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  bulding: false,
};

const INGREDIENTS_PRICE = {
  Salad: 0.6,
  Cheese: 0.8,
  Meat: 1.3,
  Bacon: 0.9,
};

const addIngredient = (state, action) => {
  const newPrice = state.totalPrice + INGREDIENTS_PRICE[action.ingredientName];
  const updateIngs = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: Math.round(newPrice * 10) / 10,
    bulding: true,
  };
  return objectUpdate(state, updateIngs);
};

const removeIngredient = (state, action) => {
  const updatePrice =
    state.totalPrice - INGREDIENTS_PRICE[action.ingredientName];
  const removeIngs = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: Math.round(updatePrice * 10) / 10,
    bulding: true,
  };
  return objectUpdate(state, removeIngs);
};

const setIngredient = (state, action) => {
  const setIngs = {
    ingredients: {
      Salad: action.ingredients.Salad,
      Bacon: action.ingredients.Bacon,
      Cheese: action.ingredients.Cheese,
      Meat: action.ingredients.Meat,
    },
    totalPrice: action.totalPrice,
    error: false,
    bulding: false,
  };
  return objectUpdate(state, setIngs);
};

const fetchIngredientFail = (state) => {
  return objectUpdate(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFail(state);

    default:
      return state;
  }
};

export default reducer;
