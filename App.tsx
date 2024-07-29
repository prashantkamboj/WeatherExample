/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Route from './src/Navigator/Route';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
