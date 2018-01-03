import axios from 'axios';
import {FETCH_USER} from "./types";
import {FETCH_SURVEYS} from "./types";

//axios will do Ajax request into backend api
//Redux Thunk allows you to write action creators
//that return a function instead of an action

// export const fetchUser = () => {
//     return function(dispatch){
//         axios
//             .get('/api/current_user')
//             .then(res => dispatch({type: FETCH_USER, payload: res}));
//     };
// };

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: res.data});
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type:FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type:FETCH_SURVEYS, payload: res.data});
};