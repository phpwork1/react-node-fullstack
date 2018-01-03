//Combine all reducer using combineReducers from redux

import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

//Assign name depending on reducer, auth : authReducer
export default combineReducers({
    auth: authReducer,
    surveys: surveysReducer,
    form: reduxForm,
});