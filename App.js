import React from 'react';

import SomeTimeEntry from './components/SomeTimeEntry';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import auth from './components/reducers';
import thunk from 'redux-thunk';

const initialState = {};

const reducer = (state = initialState) => {
  return state;
}

const store = createStore(auth, applyMiddleware(thunk));


export default class App extends React.Component {


  render() {
    return (
      <Provider store={store}>
        <SomeTimeEntry />
      </Provider>
    )
  }

}