import { FETCH_USER } from "../actions/types";

//The reducer is a pure function that takes the previous state and an action,
//and returns the next state

export default function(state = null , action){
    console.log(action);
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        default:
            //if nothing happened, return current state
            return state;
    }
}
