import React from "react";
const initialState = {};

export const calculateTotal = (updatedCart) => {
  const totalCartQuantity = Object.values(updatedCart).reduce((total, item) => Number(total + item.quantity), 0);
  const totalCartCost = Object.values(updatedCart).reduce((totalCost, item) => totalCost + (item.quantity * item.price), 0);
  return { totalCartQuantity, totalCartCost };
}



export default function itemReducer(state = initialState, action) {
  console.log(Object.values(state));
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item._id]: {
          ...action.item,
          quantity: state[action.item._id]
            ? state[action.item._id].quantity + 1
            : 1,
        },
      };
    }
    case "REMOVE_ITEM": {
      const stateCopy = { ...state };
      delete stateCopy[action.itemId];

      return {
        ...stateCopy,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = {
        ...state,
        [action.item._id]: {
            ...action.item,
            quantity: action.newQuantity,
        } 
    }
    return updatedCart;
}
    default:
      return state;
  }
}

export const getStoreItemArray = (state) => {
  return Object.values(state);
};
