import React from 'react';
import {View} from 'react-native';
import Home from './src/Screens.js/Home';
import {Provider} from 'react-redux';
import store, {peristedStore} from './src/Redux/store';
import {PersistGate} from 'redux-persist/es/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={peristedStore} loading={null}>
        <View>
          <Home />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
