import {AUTHENTICATE_USER, REMOVE_USER} from '../actionTypes';

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            const user = action.payload;
            return {...state, user};
        case REMOVE_USER:
            console.log(state);
            return delete state.user;
        default:
            return state;
    }
}
