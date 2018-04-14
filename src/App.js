import React, { Component } from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {mainReducer} from './reducers/mainReducer'

import './App.css';

import {Fetch} from './components/Fetch/Fetch';


function middleware ({dispatch, getState}){
  return next => action => {
    if(typeof action ==='function'){
      return action(dispatch, getState);
    }
    return next(action);
  };
}

let store = createStore( 
  mainReducer,
  undefined,
  compose( // не работает в  opera и firefox !!!!!!!
    applyMiddleware(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) 
);

store.subscribe(() => {
  console.log('Subscribe', store.getState())
});

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
