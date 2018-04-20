import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { mainReducer } from "./reducers/mainReducer";

import "./App.css";

import { Fetch } from "./components/Fetch/Fetch";

function middleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : f => f;

let store = createStore(
  mainReducer,
  undefined,
  compose(applyMiddleware(middleware), enhancers)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fetch />
      </Provider>
    );
  }
}

export default App;
