import React from "react";
const initialState = {};
//added
export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity: 1,
        },
      };
    }
    case "REMOVE_ITEM": {
      const stateCopy = { ...state };
      delete stateCopy[action.item.id];
      return {
        ...stateCopy,
      };
    }

    case "UPDATE_QUANTITY": {
      return {
        ...state,
        [action.itemId]: {
          ...state[action.itemId],
          quantity: action.quantity,
        },
      };
    }
    default:
      return state;
  }
}

export const getStoreItemArray = (state) => Object.values(state);
