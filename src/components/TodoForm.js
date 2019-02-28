import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateCurrentTodo, postTodo} from '../reducers/todo'; //action creators

class TodoForm extends Component {
    handleInputChange = (evt) => {             
        const value = evt.target.value;        
        this.props.updateCurrentTodo(value);
    }   
    handleSubmit = (evt) => {
        evt.preventDefault();        
        this.props.postTodo(this.props.currentTodo);
    }
    render(){        
        const {currentTodo} = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                    onChange={this.handleInputChange}
                    value={currentTodo} />
            </form>
        )
    }
};

export default connect(
    (state) => ({currentTodo: state.todo.currentTodo}),
    {updateCurrentTodo, postTodo} // mapDispatchToProps
)(TodoForm);