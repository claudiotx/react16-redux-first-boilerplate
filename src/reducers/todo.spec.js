import reducer from './todo';
describe('Todo Reducer', () => {

    test('add a reducer', () => {
        const initialState = {
            todos: [
                {id: 1, name: 'Static UI', isComplete: true},
                {id: 2, name: 'State UI', isComplete: false},
                {id: 3, name: 'Dyanmic UI', isComplete: false}        
            ]
        };
        const finalState = {
            todos: [
                {id: 1, name: 'Static UI', isComplete: true},
                {id: 2, name: 'State UI', isComplete: false},
                {id: 3, name: 'Dyanmic UI', isComplete: false},
                {id: 4, name: 'Test State', isComplete: false}             
            ]
        };  
        const action = {
            type: 'ADD',
            item: {id: 4, name: 'Test State', isComplete: false}
        }    
        const result = reducer(initialState,action);
        expect(result).toEqual(finalState);
    });

    test('return a state object', () => {
        const result = reducer(undefined,{type: 'ANY'});
        expect(result).toBeDefined();
    });
})