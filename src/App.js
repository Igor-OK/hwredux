import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './App.css';

import {Fetch} from './components/Fetch/Fetch';

let store = createStore( 
  (state, action) => {
    if (!state) {
      return{
        tags: {
          current:'dogs'
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

    return state;
  },
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
