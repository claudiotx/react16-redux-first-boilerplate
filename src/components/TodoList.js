import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTodos, putTodo, deleteTodo, getVisibleTodos} from '../reducers/todo'; // action creators (added to this.props)

// TodoItem component with destructuring on parameters
const TodoItem = ({id, name, isComplete, updateTodo, deleteTodo}) => (
    <li>
        <span className="delete-item"> 
            <button onClick={() => deleteTodo(id)}> X </button>    
        </span>
        <input type="checkbox" onChange={()=> updateTodo(id)} checked={isComplete}/> {name}
    </li>
);

// Implicit multiline return
class TodoList extends Component{
    // LifeCycle Hooks
    componentDidMount(){
        this.props.getTodos(); // async call
    }
    render(){
        return (<div className="Todo-List">
            <ul>
                {this.props.todos.map(todo => <TodoItem deleteTodo={this.props.deleteTodo} updateTodo={this.props.putTodo} key={todo.id} {...todo}/>)}
            </ul>
        </div>);          
    }
}

// Connect to redux *connect(output, input)
export default connect(
    (state, ownProps) => ({todos: getVisibleTodos(state.todo.todos, ownProps.filter)}), //mapStateToProps()
    {getTodos, putTodo, deleteTodo} //mapDispatchToProps()
)(TodoList);