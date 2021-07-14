import { combineReducers } from 'redux';

import user from './user';
import mail from './mail';
import mailThread from './mailThread';

const appReducer = combineReducers({
  user,
  mail,
  mailThread
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer