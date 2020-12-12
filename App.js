import React from 'react';
import {View} from 'react-native';
import Home from './src/Screens.js/Home';
import {Provider} from 'react-redux';
import store, {peristedStore} from './src/Redux/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import MainNavigation from './src/Screens.js/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={peristedStore} loading={null}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
