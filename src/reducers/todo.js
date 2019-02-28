import { getAsyncTodos, postAsyncTodo, putAsyncTodo, deleteAsyncTodo } from '../lib/todoServices';
import { showMessage } from './message'; //we want to dispatch to this reducer

// Redux takes a state an an action and returns a new state and action
const initialState = {
    todos: [],
    currentTodo: ''
}

// Action Identifiers
// ----------------------------------------------
const CURRENT_UPDATE = 'CURRENT_UPDATE';
export const TODO_ADD = 'TODO_ADD';
export const TODO_LOAD = 'TODO_LOAD';
export const TODO_UPDATE = 'TODO_UPDATE';
export const TODO_DELETE= 'TODO_DELETE';

// Action Creators (SYNC)
// ----------------------------------------------
export const updateCurrentTodo = (val) => ({ type: CURRENT_UPDATE, item: val });
export const loadTodos = (todos) => ({ type: TODO_LOAD, item: todos });
export const addTodo = (todo) => ({ type: TODO_ADD, item: todo });
export const updateTodo = (todo) => ({ type: TODO_UPDATE, item: todo });
export const removeTodo = (id) => ({type: TODO_DELETE, item: id  });
export const getVisibleTodos = (todos, filter) => {
    switch (filter){
        case 'active':
            return todos.filter((t)=> !t.isComplete);        
        case 'completed':
            return todos.filter((t)=> t.isComplete); 
        default:
            return todos;                    
    }
}


// Action Creators (ASYNC VIA API)
// ----------------------------------------------
export const getTodos = () => {
    return (dispatch) => {
        dispatch(showMessage('Loading todos...'));
        getAsyncTodos()
            .then(todos => dispatch(loadTodos(todos))); //dispatch to an ActionCreator
    }
};
export const postTodo = (name) => {
    return (dispatch) => {
        dispatch(showMessage('saving to db...'));
        postAsyncTodo(name)
            .then(todo => dispatch(addTodo(todo))); //dispatch to an ActionCreator
    }
};
export const putTodo = (id) => {
    return (dispatch, getState) => {
        dispatch(showMessage('updating to db...'));
        // Update State first
        const {todos} = getState().todo;
        const todo = todos.find((t)=> t.id === id);
        console.log('saving')
        const toggledTodo = {...todo, isComplete: !todo.isComplete};
        putAsyncTodo(toggledTodo)
            .then(todo => dispatch(updateTodo(todo))); //dispatch to an ActionCreator
    }
};
export const deleteTodo = (id) => {
    return (dispatch, getState) => {
        dispatch(showMessage('deleting from db...'));
        deleteAsyncTodo(id)
            .then(() => dispatch(removeTodo(id))); //dispatch to an ActionCreator

    }
}

// Reducer Logic
// ----------------------------------------------
export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_UPDATE:
            return { ...state, currentTodo: action.item };
        case TODO_ADD:
            return { ...state, currentTodo: '', todos: state.todos.concat(action.item) };
        case TODO_LOAD:
            return { ...state, todos: action.item };
        case TODO_UPDATE:            
            return { ...state, todos: state.todos.map(todo => (todo.id === action.item.id) ? action.item : todo )};
        case TODO_DELETE:            
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.item)};                    
        default:
            return state;
    }
}