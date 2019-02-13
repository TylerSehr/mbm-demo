import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import duck from './duckReducer';

const store = combineReducers({
  user,
  login,
  duck
});

export default store;
