import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

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
  (state, action) => {
    if (!state) {
      return{
        tags: {
          current:'larimar'
        },
        feed:{
          cards: [],
          step: 1,
          loading: false
        }
      };
    }
    
    if (action.type === 'SET_TAG') {
      return{
        ...state,
        tags: {
          ...state.tags,
          current: action.tag
        }
      };
    }

    if (action.type === 'FETCH_LOADING'){
      return{
        ...state,
        feed: {
          ...state.feed,
          loading: action.loading
        }
      }
    }

    if (action.type === 'FETCH_ERROR'){
      return{
        ...state,
        feed: {
          ...state.feed,
          error: action.error
        }
      }
    }

    if (action.type === 'FETCH_APPEND_CARDS'){
      return{
        ...state,
        feed: {
          ...state.feed,
          cards: state.feed.cards.concat(action.cards),
          step: action.step
        }
      }
    }

    if (action.type === 'FETCH_RESET'){
      return{
        ...state,
        feed: {
          ...state.feed,
          cards: [],
          step: 1,
          error: null
        }
      }
    }

    return state;
  },
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
