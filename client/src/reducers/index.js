//Combine all reducer using combineReducers from redux

import { combineReducers } from 'redux';
import authReducer from './authReducer';

//Assign name depending on reducer, auth : authReducer
export default combineReducers({
    auth: authReducer
});