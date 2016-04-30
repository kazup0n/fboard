import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { routerReducer} from 'react-router-redux'

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);