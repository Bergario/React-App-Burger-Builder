import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
};

const INGREDIENTS_PRICE = {
  Salad: 0.6,
  Cheese: 0.8,
  Meat: 1.3,
  Bacon: 0.9,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const newPrice =
        state.totalPrice + INGREDIENTS_PRICE[action.ingredientName];
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: Math.round(newPrice * 10) / 10,
      };

    case actionTypes.REMOVE_INGREDIENT:
      const updatePrice =
        state.totalPrice - INGREDIENTS_PRICE[action.ingredientName];
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: Math.round(updatePrice * 10) / 10,
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          Salad: action.ingredients.Salad,
          Bacon: action.ingredients.Bacon,
          Cheese: action.ingredients.Cheese,
          Meat: action.ingredients.Meat,
        },
        totalPrice: action.totalPrice,
        error: false,
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return { ...state.error, error: true };

    default:
      return state;
  }
};

export default reducer;
