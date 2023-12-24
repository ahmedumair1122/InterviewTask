import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Reducer/UserReducer'; 

const store = createStore(
  rootReducer,
  applyMiddleware()
);

export default store;
