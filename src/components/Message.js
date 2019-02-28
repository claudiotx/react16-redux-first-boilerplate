import React from 'react';
import {connect} from 'react-redux';

// Stateless Functional Component
// Paramters are props. Instead of props.message, we destruct and do {message}
const Message = ({message}) => (
    message ? <span className='message'> {message} </span> : null
); //return jsx

export default connect(
    (state) => ({message: state.message})
)(Message);