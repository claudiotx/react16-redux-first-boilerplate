const baseUrl = process.env.REACT_APP_BASE_URL;

const getAsyncTodos = () => {
    return fetch(baseUrl)
    .then(res => res.json())
    .catch(err => [])
}

const postAsyncTodo = (name) => {
    return fetch(baseUrl,{
        method: 'POST',
        headers: {
            'Accept': ' application/json',
            'Content-Type': ' application/json'
        },
        body: JSON.stringify({name: name, isComplete:false})
    })
    .then(res => res.json())
    .catch(err => [])    
}

const putAsyncTodo = (todo) => {    
    return fetch(`${baseUrl}${todo.id}`,{
        method: 'PUT',
        headers: {
            'Accept': ' application/json',
            'Content-Type': ' application/json'
        },
        body: JSON.stringify(todo)
    })
    .then(res => res.json())
    .catch(err => [])    
}

const deleteAsyncTodo = (id) => {    
    return fetch(`${baseUrl}/todos/${id}`,{
        method: 'DELETE',
        headers: {
            'Accept': ' application/json',
            'Content-Type': ' application/json'
        }        
    })
}

export {getAsyncTodos, postAsyncTodo, putAsyncTodo, deleteAsyncTodo};