import {TODO_ADD, TODO_LOAD, TODO_UPDATE, TODO_DELETE} from './todo';

// Action Identifiers
// ----------------------------------------------
const MESSAGE_SHOW = 'MESSAGE_SHOW';

// Action Creators (SYNC) - returns an Action object
// ----------------------------------------------
export const showMessage = (message) => ({type: MESSAGE_SHOW, data: message});

// Reducer Logic
// ----------------------------------------------
const messageReducer = (state='', action) => {
    switch(action.type){
        // Own actions
        case MESSAGE_SHOW:
            return action.data;

        // Neighbour dispatch actions
        case TODO_ADD:            
        case TODO_LOAD:
        case TODO_UPDATE:
        case TODO_DELETE:
            return '';
        default:
            return state;
    }
}

export default messageReducer;