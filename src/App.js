import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
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
  applyMiddleware(middleware)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  console.log('Subscribe', store.getState())
});



setInterval(()=>{
  if (store.getState().enabled) {
    store.dispatch({type:'TEST'});
  }
}, 1000);

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
