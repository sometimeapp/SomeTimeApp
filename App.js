import React from 'react';

import SomeTimeEntry from './components/SomeTimeEntry';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import auth from './components/reducers'

const initialState = {};

const reducer = (state = initialState) => {
  return state;
}

const store = createStore(auth);


export default class App extends React.Component {


  render() {
    return (
      <Provider store={store}>
        <SomeTimeEntry />
      </Provider>
    )
  }

}
