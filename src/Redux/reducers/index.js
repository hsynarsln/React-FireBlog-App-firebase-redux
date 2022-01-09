import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  blogReducer,
  userReducer
});

export default rootReducer;
