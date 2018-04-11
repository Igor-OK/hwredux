import React, { Component } from 'react';
import {createStore} from 'redux';
// import logo from './logo.svg';
import './App.css';

import {Fetch} from './components/Fetch/Fetch';

let store = createStore(
  (state) => state
);

store.subscribe(() => {
  console.log('changed by the store')
});



setInterval(()=>{
  store.dispatch({type:'TEST'});
}, 1000);

class App extends Component {
  render() {
    return (
      <Fetch />
    );
  }
}

export default App;
