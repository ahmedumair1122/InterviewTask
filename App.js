import React from 'react';
import Navigation from './Src/Navigation/MainNavigator/NavigationContainer';

import { Provider } from 'react-redux';
import store from './Src/Redux/Store/UserStore';
const App = () => {
  return (     
    <Provider store={store}>
    <Navigation></Navigation>
  </Provider>
  
  );
};

export default App;