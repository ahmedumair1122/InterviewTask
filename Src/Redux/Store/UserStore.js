import { createStore, } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer/UserReducer'; // Import your Redux reducer

const store = createStore(
  rootReducer,
);

export default store;
