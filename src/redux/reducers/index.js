import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import duck from './duckReducer';
import chat from './messageReducer'

const store = combineReducers({
  user,
  login,
  duck,
  chat
});

export default store;
