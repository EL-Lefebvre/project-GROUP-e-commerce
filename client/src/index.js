import React from "react";
import { createStore, combineReducers } from "redux";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import reducer from "./reducers";
import App from "./components/App";
require("dotenv").config();

function saveToLocalStore(state) {
  try {
    const initState = JSON.stringify(state);
    localStorage.setItem("state", initState);
  } catch (e) {
    console.log(e);
  }
}
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 
const rootReducer = combineReducers({
  item: reducer,
});
const persistedItemState = loadState();

const store = createStore(
  rootReducer,
   persistedItemState ,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => saveToLocalStore(store.getState()));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")

);



