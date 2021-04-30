const initialState = {};

export default function itemReducer(state = initialState, action) {
 
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
      return {
        ...state,
        [action.itemId]: {
          ...state[action.itemId],
          quantity: action.quantity,
        },
      };
    }
    case "CLEAR_CART": {
      return state = initialState;
    }

    default:
      return state;
  }
}

export function getStoreItemArray(state) {
  return Object.values(state.item);
};
