import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    Meat: 0,
    Cheese: 0,
    Salad: 0,
    Bacon: 0,
  },
  totalPrice: 0,
};

const INGREDIENTS_PRICE = {
  Salad: 0.6,
  Cheese: 0.8,
  Meat: 1.3,
  Bacon: 0.9,
};

const reducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default reducer;
