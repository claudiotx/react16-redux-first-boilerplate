import {createStore, applyMiddleware, combineReducers} from 'redux'; // Redux Operations
import thunk from 'redux-thunk'; // Thunk allows async calls
import {composeWithDevTools} from 'redux-devtools-extension'; // chrome debug plugin only
import todoReducer from './reducers/todo';
import messageReducer  from './reducers/message';

// state.todo, state.message
const reducer = combineReducers(
    {
        todo: todoReducer,
        message: messageReducer
    }
);

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);